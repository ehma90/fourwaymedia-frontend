import { Dancing_Script } from "next/font/google";

import { BackButton } from "@/components/auth/BackButton";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SignInShowcase } from "@/components/auth/SignInShowcase";


const logoFont = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-sign-up-logo",
});

export default function SignUpPage() {
  return (
    <div
      className={`${logoFont.variable} min-h-screen bg-[linear-gradient(160deg,#f3edf8_0%,#f5f9f4_45%,#eef6f0_100%)] text-foreground dark:bg-neutral-950 dark:bg-none`}
    >
      <BackButton className="absolute left-4 top-4 z-10 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white sm:left-6 sm:top-6" />

      <div className="flex min-h-screen flex-col-reverse lg:flex-row">
        <div className="relative flex flex-1 flex-col justify-center lg:min-h-screen lg:max-w-[52%] xl:max-w-none"
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

        <div className="flex flex-1 items-center justify-center px-4 pb-10 pt-16 sm:px-6 lg:min-h-screen lg:pb-12 lg:pt-12">
          <SignUpForm />
        </div>


      </div>
    </div>
  );
}
