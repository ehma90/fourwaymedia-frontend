import { Dancing_Script } from "next/font/google";

import { BackButton } from "@/components/auth/BackButton";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignInShowcase } from "@/components/auth/SignInShowcase";

const logoFont = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-sign-in-logo",
});

export default function SignInPage() {
  return (
    <div
      className={`${logoFont.variable} min-h-screen bg-neutral-100 text-foreground dark:bg-neutral-950`}
    >
      <BackButton className="absolute left-4 top-4 z-10 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white sm:left-6 sm:top-6" />

      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left: form */}
        <div className="flex flex-1 items-center justify-center px-4 pb-10 pt-16 sm:px-6 lg:min-h-screen lg:pb-12 lg:pt-12">
          <SignInForm />
        </div>

        {/* Right: gradient + showcase */}
        <div
          className="relative hidden md:flex flex-1 flex-col justify-center lg:min-h-screen lg:max-w-[52%] xl:max-w-none"
          style={{
            background:
              "linear-gradient(95deg, rgba(196, 104, 211, 0.6) 0%, rgba(6, 161, 33, 0.6) 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-neutral-50/80 dark:bg-neutral-950/40" />
          <div className="relative flex min-h-[300px] flex-1 items-center py-12 lg:min-h-0 lg:py-8">
            <SignInShowcase />
          </div>
        </div>
      </div>
    </div>
  );
}
