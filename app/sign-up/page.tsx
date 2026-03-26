import Link from "next/link";
import { Dancing_Script } from "next/font/google";

import { SignUpForm } from "@/components/auth/SignUpForm";


const logoFont = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-sign-up-logo",
});

export default function SignUpPage() {
  return (
    <div
      className={`${logoFont.variable} min-h-screen bg-[linear-gradient(160deg,#f3edf8_0%,#f5f9f4_45%,#eef6f0_100%)] text-foreground dark:bg-neutral-950 dark:bg-none`}
    >
      <Link
        href="/"
        className="absolute left-4 top-4 z-10 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white sm:left-6 sm:top-6"
      >
        ← Back to home
      </Link>

      <div className="mx-auto grid min-h-screen w-full max-w-[1240px] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_min(28rem,100%)] lg:items-stretch">
        
        <div className="flex min-h-0 flex-col items-center justify-center px-4 pb-12 pt-16 sm:px-6 lg:min-h-screen lg:items-end lg:justify-center lg:pr-4 xl:pr-6">
          <SignUpForm />
        </div>

        <ThemeToggle className="h-9 w-9 shrink-0 border border-neutral-200 bg-neutral-50 p-0 text-neutral-700 shadow-none hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800" />
      </div>
    </div>
  );
}
