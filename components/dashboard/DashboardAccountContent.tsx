"use client";

import Link from "next/link";
import { Camera, Eye, EyeOff, HelpCircle, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { inputFieldClassName } from "@/lib/input-classes";
import {
  MOCK_USER_AVATAR_URL,
  MOCK_USER_DISPLAY_NAME,
  MOCK_USER_EMAIL,
} from "@/lib/mock-auth-context";
import {
  persistProfilePhotoUrl,
  uploadProfilePhotoToCloudinary,
} from "@/lib/profile-photo";
import { cn } from "@/lib/utils";

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const cardClass =
  "rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-6";

const labelClass =
  "mb-1.5 block text-sm font-medium text-zinc-600 dark:text-zinc-400";

export function DashboardAccountContent() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [displayName, setDisplayName] = useState(MOCK_USER_DISPLAY_NAME);
  const [email, setEmail] = useState(MOCK_USER_EMAIL);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(MOCK_USER_AVATAR_URL);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  const handleProfilePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setPhotoError(null);
    setPhotoUploading(true);
    try {
      const { url } = await uploadProfilePhotoToCloudinary(file);
      setAvatarUrl(url);
      await persistProfilePhotoUrl(url);
    } catch (err) {
      setPhotoError(err instanceof Error ? err.message : "Could not upload photo.");
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: PATCH /api/me or your profile API
    setProfileMessage("Changes saved (demo). Connect your API to persist.");
    window.setTimeout(() => setProfileMessage(null), 5000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST /api/me/password or your auth API
    setPasswordMessage("Password update requested (demo). No request was sent.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    window.setTimeout(() => setPasswordMessage(null), 5000);
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <header>
        <h1 className="font-[family-name:var(--font-bitter)] text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Account
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Profile and security for your Fourwaymedia account.
        </p>
      </header>

      <section aria-labelledby="account-profile-heading" className={cardClass}>
        <h2
          id="account-profile-heading"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Profile
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Update how your name and email appear on your account.
        </p>
        <form className="mt-6 space-y-5" noValidate onSubmit={handleProfileSubmit}>
          <div>
            <label htmlFor="account-profile-photo" className={labelClass}>
              Profile photo
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <div
                className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-200/90 bg-zinc-100 text-lg font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                aria-hidden={!!avatarUrl}
              >
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- user-uploaded dynamic URL from Cloudinary
                  <img
                    src={avatarUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span aria-hidden>{initialsFromName(displayName)}</span>
                )}
                {photoUploading ? (
                  <span className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
                    <Loader2
                      className="h-8 w-8 animate-spin text-white"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="sr-only">Uploading photo</span>
                  </span>
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <input
                  ref={fileInputRef}
                  id="account-profile-photo"
                  name="profilePhoto"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={handleProfilePhotoChange}
                  disabled={photoUploading}
                  aria-describedby={
                    photoError ? "account-photo-hint account-photo-error" : "account-photo-hint"
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 px-4"
                  disabled={photoUploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="mr-2 h-4 w-4" strokeWidth={1.75} aria-hidden />
                  {photoUploading ? "Uploading…" : "Change photo"}
                </Button>
                <p
                  id="account-photo-hint"
                  className="mt-2 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  JPEG, PNG, or WebP up to 2 MB.
                </p>
                {photoError ? (
                  <p
                    id="account-photo-error"
                    className="mt-2 text-sm font-medium text-red-600 dark:text-red-400"
                    role="alert"
                  >
                    {photoError}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="account-display-name" className={labelClass}>
              Display name
            </label>
            <input
              id="account-display-name"
              name="displayName"
              type="text"
              autoComplete="name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={inputFieldClassName}
            />
          </div>
         
          {profileMessage ? (
            <p
              id="account-profile-feedback"
              className="text-sm font-medium text-emerald-700 dark:text-emerald-400"
              role="status"
            >
              {profileMessage}
            </p>
          ) : null}
          <Button type="submit" variant="primary" className="h-11 px-6">
            Save changes
          </Button>
        </form>
      </section>

      <section aria-labelledby="account-security-heading" className={cardClass}>
        <h2
          id="account-security-heading"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Security
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Change your password. Use at least 8 characters with a mix of letters and numbers.
        </p>
        <form className="mt-6 space-y-5" noValidate onSubmit={handlePasswordSubmit}>
          <div>
            <label htmlFor="account-current-password" className={labelClass}>
              Current password
            </label>
            <div className="relative">
              <input
                id="account-current-password"
                name="currentPassword"
                type={showCurrent ? "text" : "password"}
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={cn(inputFieldClassName, "pr-12")}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                aria-label={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? (
                  <EyeOff className="h-5 w-5" strokeWidth={1.75} />
                ) : (
                  <Eye className="h-5 w-5" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="account-new-password" className={labelClass}>
              New password
            </label>
            <div className="relative">
              <input
                id="account-new-password"
                name="newPassword"
                type={showNew ? "text" : "password"}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={cn(inputFieldClassName, "pr-12")}
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                aria-label={showNew ? "Hide new password" : "Show new password"}
              >
                {showNew ? (
                  <EyeOff className="h-5 w-5" strokeWidth={1.75} />
                ) : (
                  <Eye className="h-5 w-5" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="account-confirm-password" className={labelClass}>
              Confirm new password
            </label>
            <div className="relative">
              <input
                id="account-confirm-password"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={cn(inputFieldClassName, "pr-12")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? (
                  <EyeOff className="h-5 w-5" strokeWidth={1.75} />
                ) : (
                  <Eye className="h-5 w-5" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>
          {passwordMessage ? (
            <p
              id="account-password-feedback"
              className="text-sm font-medium text-emerald-700 dark:text-emerald-400"
              role="status"
            >
              {passwordMessage}
            </p>
          ) : null}
          <Button type="submit" variant="primary" className="h-11 px-6">
            Update password
          </Button>
        </form>
      </section>

      <p className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
        <HelpCircle className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
        <span>Questions?</span>
        <Link
          href="/contact"
          className="font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
        >
          Contact us
        </Link>
      </p>
    </div>
  );
}
