import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

type CloudinaryUploadResponse = {
  secure_url?: string;
  public_id?: string;
  error?: { message?: string };
};

export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return NextResponse.json(
      {
        error:
          "Upload is not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET (unsigned preset).",
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
      { error: "Invalid file type. Use JPEG, PNG, WebP, or GIF." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 5 MB." },
      { status: 400 },
    );
  }

  const upstream = new FormData();
  upstream.set("file", file);
  upstream.set("upload_preset", uploadPreset);

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  let raw: CloudinaryUploadResponse;
  try {
    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: upstream,
    });
    raw = (await res.json()) as CloudinaryUploadResponse;
    if (!res.ok) {
      const msg = raw.error?.message ?? "Cloudinary rejected the upload.";
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
