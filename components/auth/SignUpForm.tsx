"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { SocialAuthSection } from "@/components/auth/SocialAuthSection";
import { inputFieldClassName } from "@/lib/input-classes";
import { useMockAuth } from "@/lib/mock-auth-context";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const logoFontClass =
  "font-[family-name:var(--font-sign-up-logo),cursive] text-3xl sm:text-[2rem]";

export function SignUpForm() {
  const router = useRouter();
  const { signIn } = useMockAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn();
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-[520px] rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-[0_4px_40px_rgba(0,0,0,0.06)] sm:p-10 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_4px_40px_rgba(0,0,0,0.4)]">
      <div className="text-center">
       
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Join thousands of teams building better products
        </p>
      </div>

      <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
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
            className={inputFieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-300"
            >
              Email address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            className={inputFieldClassName}
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
              className={cn(inputFieldClassName, "pr-12")}
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

        <Button
            type="submit"
            variant="primary"
            className="h-12 w-full rounded-xl text-base font-semibold shadow-[0_10px_22px_rgba(220,68,55,0.35)]"
        >
          Create account
        </Button>
      </form>

      <SocialAuthSection />

      <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
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
