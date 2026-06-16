"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { SocialAuthSection } from "@/components/auth/SocialAuthSection";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { safeInternalPath } from "@/lib/shop-purchase-flow";
import { inputFieldClassName } from "@/lib/input-classes";
import { cn } from "@/lib/utils";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(email, password);
      const next = safeInternalPath(searchParams.get("next"));
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Sign in failed. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = searchParams.get("next");
  const signUpHref = next
    ? `/sign-up?next=${encodeURIComponent(next)}`
    : "/sign-up";

  return (
    <div className="w-full max-w-[440px] rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-[0_4px_40px_rgba(0,0,0,0.06)] sm:p-10 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_4px_40px_rgba(0,0,0,0.4)]">
      <div className="text-center">
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Sign in to your account to continue
        </p>
      </div>

      <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
        {error ? (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div>
          <label
            htmlFor="sign-in-email"
            className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
          >
            Email address
          </label>
          <input
            id="sign-in-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            className={inputFieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="sign-in-password"
            className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="sign-in-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className={cn(inputFieldClassName, "pr-12")}
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

        <div className="mt-10 flex flex-col gap-5">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl text-base font-semibold shadow-[0_10px_22px_rgba(220,68,55,0.35)]"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <LoadingSpinner className="h-5 w-5" label="Signing in" />
                Signing in…
              </span>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>
      </form>

      <SocialAuthSection />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <Link
          href={signUpHref}
          className="font-semibold text-neutral-950 underline-offset-4 hover:underline dark:text-white"
        >
          Create account
        </Link>
        <Link
          href="/forgot-password"
          className="font-medium text-[#DC4437] underline-offset-4 hover:underline dark:text-[#FEC107]"
        >
          Forgot Password?
        </Link>
      </div>

      <p className="mt-8 text-center text-xs leading-relaxed text-neutral-500 dark:text-neutral-500">
        By signing in, you agree to our Terms of Service and Privacy Policy.
        Your data is encrypted and secure.
      </p>
    </div>
  );
}
