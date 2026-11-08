"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { inputFieldClassName } from "@/lib/input-classes";
import { cn } from "@/lib/utils";

// Matches the backend's password policy (fourwaymedia-backend/src/lib/password-policy.ts).
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    token ? null : "This reset link is missing its token. Request a new one.",
  );
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    setError(null);

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password.length > MAX_PASSWORD_LENGTH) {
      setError("Password is too long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords don't match.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not reset your password. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Something went wrong. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-[0_4px_40px_rgba(0,0,0,0.06)] sm:p-10 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_4px_40px_rgba(0,0,0,0.4)]">
      <div className="text-center">
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
          {success ? "Password updated" : "Choose a new password"}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {success
            ? "You can now sign in with your new password."
            : "Enter a new password for your account."}
        </p>
      </div>

      {success ? (
        <div className="mt-8 space-y-6" role="status" aria-live="polite">
          <div
            className={cn(
              "rounded-xl border border-neutral-200/90 bg-neutral-50 px-4 py-3 text-sm leading-relaxed text-neutral-700",
              "dark:border-white/10 dark:bg-neutral-800/50 dark:text-neutral-300",
            )}
          >
            For your security, you&apos;ve been signed out on all devices.
          </div>
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "primary" }),
              "h-12 w-full rounded-xl text-base font-semibold shadow-[0_10px_22px_rgba(220,68,55,0.35)]",
            )}
          >
            Continue to sign in
          </Link>
        </div>
      ) : (
        <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
          {error ? (
            <div
              id="reset-password-error"
              className={cn(
                "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800",
                "dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200",
              )}
              role="alert"
            >
              {error}
              {!token ? (
                <>
                  {" "}
                  <Link href="/forgot-password" className="font-semibold underline">
                    Request a new link
                  </Link>
                </>
              ) : null}
            </div>
          ) : null}

          <div>
            <label
              htmlFor="reset-password-new"
              className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
            >
              New password
            </label>
            <div className="relative">
              <input
                id="reset-password-new"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                className={cn(inputFieldClassName, "pr-12")}
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                disabled={isLoading || !token}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "reset-password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" strokeWidth={1.75} />
                ) : (
                  <Eye className="h-5 w-5" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="reset-password-confirm"
              className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
            >
              Confirm new password
            </label>
            <input
              id="reset-password-confirm"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Type it again"
              className={inputFieldClassName}
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              disabled={isLoading || !token}
            />
          </div>

          <div className="mt-10 flex flex-col gap-5">
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || !token}
              className="h-12 w-full rounded-xl text-base font-semibold shadow-[0_10px_22px_rgba(220,68,55,0.35)]"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Saving…
                </span>
              ) : (
                "Update password"
              )}
            </Button>
          </div>
        </form>
      )}

      {!success ? (
        <p className="mt-8 text-center text-sm">
          <Link
            href="/sign-in"
            className="font-semibold text-[#DC4437] underline-offset-4 hover:underline dark:text-[#FEC107]"
          >
            Back to sign in
          </Link>
        </p>
      ) : null}
    </div>
  );
}
