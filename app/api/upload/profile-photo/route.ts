import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
/** Used only when CLOUDINARY_PROFILE_UPLOAD_PRESET is set (dedicated profile preset). */
const PROFILE_PHOTO_FOLDER = "fourwaymedia/profile-photos";

type CloudinaryUploadResponse = {
  secure_url?: string;
  public_id?: string;
  error?: { message?: string };
};

function getProfileUploadConfig(): { cloudName: string; uploadPreset: string; folder?: string } | null {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const profilePreset = process.env.CLOUDINARY_PROFILE_UPLOAD_PRESET?.trim();
  const catalogPreset = process.env.CLOUDINARY_UPLOAD_PRESET?.trim();

  if (!cloudName) return null;

  if (profilePreset) {
    return { cloudName, uploadPreset: profilePreset, folder: PROFILE_PHOTO_FOLDER };
  }

  if (catalogPreset) {
    // Shared catalog preset (often locked to fourwaymedia/templates/previews) — do not override folder.
    return { cloudName, uploadPreset: catalogPreset };
  }

  return null;
}

function formatCloudinaryError(message: string, preset: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("whitelisted") && lower.includes("unsigned")) {
    return (
      `Cloudinary preset "${preset}" must allow unsigned uploads. ` +
      `In Console → Upload presets → Edit → set Signing mode to Unsigned.`
    );
  }
  if (lower.includes("folder") || lower.includes("not allowed")) {
    return (
      `${message} Create a dedicated profile preset (asset folder: ${PROFILE_PHOTO_FOLDER}, unsigned) ` +
      `and set CLOUDINARY_PROFILE_UPLOAD_PRESET in .env, or enable "Allow folder parameter" on your catalog preset.`
    );
  }
  return message;
}

export async function POST(request: Request) {
  const config = getProfileUploadConfig();

  if (!config) {
    return NextResponse.json(
      {
        error:
          "Upload is not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET (or CLOUDINARY_PROFILE_UPLOAD_PRESET).",
      },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Use JPEG, PNG, or WebP." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 2 MB." },
      { status: 400 },
    );
  }

  const upstream = new FormData();
  upstream.set("file", file);
  upstream.set("upload_preset", config.uploadPreset);
  if (config.folder) {
    upstream.set("folder", config.folder);
  }

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`;

  let raw: CloudinaryUploadResponse;
  try {
    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: upstream,
    });
    raw = (await res.json()) as CloudinaryUploadResponse;
    if (!res.ok) {
      const msg = formatCloudinaryError(
        raw.error?.message ?? "Cloudinary rejected the upload.",
        config.uploadPreset,
      );
      return NextResponse.json({ error: msg }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Upload service unavailable." }, { status: 502 });
  }

  const url = raw.secure_url;
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Invalid Cloudinary response." }, { status: 502 });
  }

  return NextResponse.json({
    url,
    publicId: typeof raw.public_id === "string" ? raw.public_id : undefined,
  });
}
