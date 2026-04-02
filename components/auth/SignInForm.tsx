"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { inputFieldClassName } from "@/lib/input-classes";
import { cn } from "@/lib/utils";

const logoFontClass =
  "font-[family-name:var(--font-sign-in-logo),cursive] text-3xl sm:text-[2rem]";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

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

      <form className="mt-8 space-y-5" noValidate>
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
            className="h-12 w-full rounded-xl text-base font-semibold shadow-[0_10px_22px_rgba(220,68,55,0.35)]"
          >
            Sign in
          </Button>

        </div>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200 dark:border-neutral-700" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <SocialButton label="Google" ariaLabel="Continue with Google">
          <GoogleIcon />
        </SocialButton>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <Link
          href="/sign-up"
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

function SocialButton({
  children,
  label,
  ariaLabel,
}: {
  children: React.ReactNode;
  label: string;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-800"
    >
      <span className="sr-only">{label}</span>
      {children}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="h-5 w-5 text-neutral-900 dark:text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" />
      <path fill="#FFB900" d="M13 13h10v10H13z" />
    </svg>
  );
}
