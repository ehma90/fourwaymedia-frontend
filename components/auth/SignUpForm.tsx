"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const logoFontClass =
  "font-[family-name:var(--font-sign-up-logo),cursive] text-3xl sm:text-[2rem]";

const USE_CASE_OPTIONS = ["Tasks", "Portals", "Meetings"] as const;

const inputClassName =
  "h-11 w-full rounded-lg border border-neutral-200 bg-white px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-[#f27121]/50 focus:ring-2 focus:ring-[#e94057]/20 dark:border-neutral-600 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [useCases, setUseCases] = useState<Set<string>>(new Set());

  const toggleUseCase = (label: string) => {
    setUseCases((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <div className="w-full max-w-[520px] rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-[0_4px_40px_rgba(0,0,0,0.06)] sm:p-10 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_4px_40px_rgba(0,0,0,0.4)]">
      <div className="text-center">
        <p
          className={cn(
            logoFontClass,
            "bg-linear-to-r from-[#f27121] via-[#e94057] to-[#f27121] bg-clip-text text-transparent",
          )}
        >
          FourWayMedia
        </p>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Join thousands of teams building better products
        </p>
      </div>

      <form className="mt-8 space-y-5" noValidate>
        <div>
          <label
            htmlFor="signup-name"
            className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
          >
            Full name
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
          >
            Work email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a strong password"
              className={`${inputClassName} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
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
            htmlFor="signup-workspace"
            className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
          >
            Workspace name
          </label>
          <input
            id="signup-workspace"
            name="workspace"
            type="text"
            autoComplete="organization"
            placeholder="Your Company Name"
            className={inputClassName}
          />
        </div>

        <div>
          <span
            id="signup-subdomain-label"
            className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
          >
            Subdomain
          </span>
          <div className="flex overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-950">
            <input
              id="signup-subdomain"
              name="subdomain"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="yourspace"
              aria-labelledby="signup-subdomain-label"
              className="min-w-0 flex-1 border-0 bg-transparent px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-0 dark:text-white"
            />
            <span className="flex shrink-0 items-center border-l border-neutral-200 bg-neutral-100 px-3 text-sm text-neutral-600 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
              .4waymedia.app
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-team-size"
            className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
          >
            Team size
          </label>
          <select
            id="signup-team-size"
            name="teamSize"
            defaultValue=""
            className={`${inputClassName} cursor-pointer appearance-none bg-size-[1.25rem] bg-position-[right_0.75rem_center] bg-no-repeat pr-10 dark:bg-neutral-950`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            }}
          >
            <option value="" disabled>
              Select team size
            </option>
            <option value="1-5">1–5 people</option>
            <option value="6-20">6–20 people</option>
            <option value="21-50">21–50 people</option>
            <option value="51-200">51–200 people</option>
            <option value="201+">201+ people</option>
          </select>
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-neutral-600 dark:text-neutral-300">
            Primary use cases
          </span>
          <div className="flex flex-wrap gap-2">
            {USE_CASE_OPTIONS.map((label) => {
              const on = useCases.has(label);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleUseCase(label)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    on
                      ? "border-[#f27121]/80 bg-[#fff5f0] text-[#c2410c] dark:border-[#f27121]/50 dark:bg-[#f27121]/15 dark:text-[#fecaca]"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:border-neutral-500",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex cursor-pointer gap-3 pt-1">
          <input
            name="terms"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 text-[#f27121] focus:ring-[#e94057]/30 dark:border-neutral-600"
          />
          <span className="text-sm leading-snug text-neutral-600 dark:text-neutral-400">
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-[linear-gradient(to_right,#f27121,#e94057)] text-base font-semibold text-white shadow-[0_10px_28px_rgba(233,64,87,0.35)] transition-[filter] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e94057]/40"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-neutral-950 underline-offset-4 hover:underline dark:text-white"
        >
          Sign in
        </Link>
      </p>

      <p className="mt-4 text-center text-xs leading-relaxed text-neutral-500 dark:text-neutral-500">
        You can change branding later in workspace settings.
      </p>
    </div>
  );
}
