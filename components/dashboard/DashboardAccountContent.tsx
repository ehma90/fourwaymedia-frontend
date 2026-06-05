"use client";

import Link from "next/link";
import {
  Calendar,
  Camera,
  Eye,
  EyeOff,
  HelpCircle,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { inputFieldClassName } from "@/lib/input-classes";
import { ApiError, apiPatch, apiPost } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
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

function formatMemberSince(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(
      new Date(iso),
    );
  } catch {
    return iso;
  }
}

const cardClass =
  "rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-6";

const labelClass =
  "mb-1.5 block text-sm font-medium text-zinc-600 dark:text-zinc-400";

type Feedback = { type: "success" | "error"; message: string } | null;

export function DashboardAccountContent() {
  const { user, isLoading, refreshSession } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoFeedback, setPhotoFeedback] = useState<Feedback>(null);

  const [profileSaving, setProfileSaving] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState<Feedback>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<Feedback>(null);

  useEffect(() => {
    if (!user) return;
    setDisplayName(user.displayName.trim());
    setAvatarUrl(user.avatarUrl ?? null);
  }, [user]);

  const profileDirty = useMemo(() => {
    if (!user) return false;
    return displayName.trim() !== user.displayName.trim();
  }, [displayName, user]);

  const handleProfilePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setPhotoFeedback(null);
    setPhotoUploading(true);
    try {
      const { url } = await uploadProfilePhotoToCloudinary(file);
      await persistProfilePhotoUrl(url);
      setAvatarUrl(url);
      await refreshSession();
      setPhotoFeedback({ type: "success", message: "Profile photo updated." });
    } catch (err) {
      setPhotoFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Could not upload photo.",
      });
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileDirty) return;

    setProfileFeedback(null);
    setProfileSaving(true);
    try {
      await apiPatch<{ user: { displayName: string } }>("/api/me", {
        displayName: displayName.trim(),
      });
      await refreshSession();
      setProfileFeedback({ type: "success", message: "Profile saved." });
    } catch (err) {
      setProfileFeedback({
        type: "error",
        message: err instanceof ApiError ? err.message : "Could not save profile.",
      });
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);

    if (newPassword.length < 8) {
      setPasswordFeedback({
        type: "error",
        message: "New password must be at least 8 characters.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ type: "error", message: "New passwords do not match." });
      return;
    }

    setPasswordSaving(true);
    try {
      await apiPost("/api/me/password", {
        currentPassword,
        newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordFeedback({ type: "success", message: "Password updated successfully." });
    } catch (err) {
      setPasswordFeedback({
        type: "error",
        message: err instanceof ApiError ? err.message : "Could not update password.",
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-8" aria-busy="true">
        <header>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-2 h-4 w-64" />
        </header>
        <div className={cn(cardClass, "flex flex-col items-center gap-4 py-12")}>
          <LoadingSpinner label="Loading account" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Sign in to manage your account.
        </p>
        <Link
          href="/sign-in"
          className="mt-4 inline-block text-sm font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <header>
        <h1 className="font-[family-name:var(--font-bitter)] text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Account
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Manage your profile photo, display name, and password.
        </p>
      </header>

      <section className={cn(cardClass, "flex flex-col gap-4 sm:flex-row sm:items-center")}>
        <div
          className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-200/90 bg-zinc-100 text-lg font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          aria-hidden={!!avatarUrl}
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- user-uploaded Cloudinary URL
            <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            initialsFromName(displayName || user.displayName)
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {user.displayName}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-zinc-600 dark:text-zinc-400">
            <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {user.email}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500">
            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Member since {formatMemberSince(user.createdAt)}
          </p>
        </div>
      </section>

      <section aria-labelledby="account-profile-heading" className={cardClass}>
        <h2
          id="account-profile-heading"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Profile
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Your email is fixed to this account. Update your photo and how your name appears in the
          dashboard.
        </p>
        <form className="mt-6 space-y-5" noValidate onSubmit={(e) => void handleProfileSubmit(e)}>
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
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span aria-hidden>{initialsFromName(displayName)}</span>
                )}
                {photoUploading ? (
                  <span className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
                    <Loader2 className="h-8 w-8 animate-spin text-white" aria-hidden />
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
                  onChange={(e) => void handleProfilePhotoChange(e)}
                  disabled={photoUploading}
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
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  JPEG, PNG, or WebP up to 2 MB. Saves automatically after upload.
                </p>
                {photoFeedback ? (
                  <p
                    className={cn(
                      "mt-2 text-sm font-medium",
                      photoFeedback.type === "success"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400",
                    )}
                    role={photoFeedback.type === "error" ? "alert" : "status"}
                  >
                    {photoFeedback.message}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="account-email" className={labelClass}>
              Email
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
                aria-hidden
              />
              <input
                id="account-email"
                type="email"
                value={user.email}
                readOnly
                disabled
                className={cn(
                  inputFieldClassName,
                  "cursor-not-allowed bg-zinc-50 pl-10 text-zinc-500 dark:bg-zinc-950/60 dark:text-zinc-400",
                )}
              />
              <Lock
                className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
                aria-hidden
              />
            </div>
           
          </div>

          <div>
            <label htmlFor="account-display-name" className={labelClass}>
              Display name
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
                aria-hidden
              />
              <input
                id="account-display-name"
                name="displayName"
                type="text"
                autoComplete="name"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setProfileFeedback(null);
                }}
                className={cn(inputFieldClassName, "pl-10")}
              />
            </div>
          </div>

          {profileFeedback ? (
            <p
              className={cn(
                "text-sm font-medium",
                profileFeedback.type === "success"
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400",
              )}
              role={profileFeedback.type === "error" ? "alert" : "status"}
            >
              {profileFeedback.message}
            </p>
          ) : null}

          <Button
            type="submit"
            variant="primary"
            className="h-11 px-6"
            disabled={!profileDirty || profileSaving}
          >
            {profileSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                Saving…
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </section>

      <section aria-labelledby="account-security-heading" className={cardClass}>
        <h2
          id="account-security-heading"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Password
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Choose a strong password you do not use on other sites.
        </p>
        <form className="mt-6 space-y-5" noValidate onSubmit={(e) => void handlePasswordSubmit(e)}>
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
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setPasswordFeedback(null);
                }}
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
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordFeedback(null);
                }}
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
            <p className="mt-1.5 text-xs text-zinc-500">At least 8 characters.</p>
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
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordFeedback(null);
                }}
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

          {passwordFeedback ? (
            <p
              className={cn(
                "text-sm font-medium",
                passwordFeedback.type === "success"
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400",
              )}
              role={passwordFeedback.type === "error" ? "alert" : "status"}
            >
              {passwordFeedback.message}
            </p>
          ) : null}

          <Button
            type="submit"
            variant="primary"
            className="h-11 px-6"
            disabled={
              passwordSaving ||
              !currentPassword ||
              !newPassword ||
              !confirmPassword
            }
          >
            {passwordSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                Updating…
              </>
            ) : (
              "Update password"
            )}
          </Button>
        </form>
      </section>

      <p className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
        <HelpCircle className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
        <span>Need help with your account?</span>
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
