"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { inputFieldClassName } from "@/lib/input-classes";
import { cn } from "@/lib/utils";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email address.");
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data: unknown = await res.json().catch(() => null);
      const message =
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : null;

      if (!res.ok) {
        setError(message ?? "Something went wrong. Please try again.");
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
          Forgot password
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {success
            ? "Check your inbox for next steps."
            : "We’ll email you a link to reset your password if an account exists for that address."}
        </p>
      </div>

      {success ? (
        <div
          className="mt-8 space-y-6"
          role="status"
          aria-live="polite"
        >
          <div
            className={cn(
              "rounded-xl border border-neutral-200/90 bg-neutral-50 px-4 py-3 text-sm leading-relaxed text-neutral-700",
              "dark:border-white/10 dark:bg-neutral-800/50 dark:text-neutral-300",
            )}
          >
            If an account exists for that address, you&apos;ll get an email shortly with
            instructions to choose a new password.
          </div>
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "primary" }),
              "h-12 w-full rounded-xl text-base font-semibold shadow-[0_10px_22px_rgba(220,68,55,0.35)]",
            )}
          >
            Back to sign in
          </Link>
        </div>
      ) : (
        <form
          className="mt-8 space-y-5"
          noValidate
          onSubmit={handleSubmit}
        >
          {error ? (
            <div
              id="forgot-password-error"
              className={cn(
                "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800",
                "dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200",
              )}
              role="alert"
            >
              {error}
            </div>
          ) : null}

          <div>
            <label
              htmlFor="forgot-password-email"
              className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
            >
              Email address
            </label>
            <input
              id="forgot-password-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className={inputFieldClassName}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              disabled={isLoading}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "forgot-password-error" : undefined}
            />
          </div>

          <div className="mt-10 flex flex-col gap-5">
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="h-12 w-full rounded-xl text-base font-semibold shadow-[0_10px_22px_rgba(220,68,55,0.35)]"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Sending…
                </span>
              ) : (
                "Send reset link"
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

      <p className="mt-8 text-center text-xs leading-relaxed text-neutral-500 dark:text-neutral-500">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
