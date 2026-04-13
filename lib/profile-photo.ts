/**
 * Profile photo upload: Cloudinary via `/api/upload/profile-photo`, then persist URL when your API exists.
 *
 * Server env (see route): `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_UPLOAD_PRESET` (unsigned preset).
 */

export type UploadProfilePhotoResult = {
  url: string;
  publicId?: string;
};

export type UploadProfilePhotoErrorBody = {
  error: string;
};

const MAX_CLIENT_BYTES = 5 * 1024 * 1024;
const ACCEPT_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function validateProfilePhotoFile(file: File): string | null {
  if (!ACCEPT_TYPES.includes(file.type)) {
    return "Please choose a JPEG, PNG, WebP, or GIF image.";
  }
  if (file.size > MAX_CLIENT_BYTES) {
    return "Image must be 5 MB or smaller.";
  }
  return null;
}

/**
 * Uploads an image to Cloudinary through the app API route. Returns the `secure_url`.
 */
export async function uploadProfilePhotoToCloudinary(
  file: File,
): Promise<UploadProfilePhotoResult> {
  const clientErr = validateProfilePhotoFile(file);
  if (clientErr) {
    throw new Error(clientErr);
  }

  const body = new FormData();
  body.set("file", file);

  const res = await fetch("/api/upload/profile-photo", {
    method: "POST",
    body,
  });

  const data = (await res.json().catch(() => ({}))) as
    | UploadProfilePhotoResult
    | UploadProfilePhotoErrorBody;

  if (!res.ok) {
    const message =
      "error" in data && typeof data.error === "string"
        ? data.error
        : `Upload failed (${res.status})`;
    throw new Error(message);
  }

  if (!("url" in data) || typeof data.url !== "string") {
    throw new Error("Invalid response from upload.");
  }

  return {
    url: data.url,
    publicId: "publicId" in data && typeof data.publicId === "string" ? data.publicId : undefined,
  };
}

/**
 * Send the Cloudinary URL to your backend when the profile API is ready.
 */
export async function persistProfilePhotoUrl(url: string): Promise<void> {
  void url;
  // TODO: PATCH /api/me — body: { avatarUrl: url } (or your schema)
}
