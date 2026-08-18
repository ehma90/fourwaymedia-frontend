import { Suspense } from "react";

import VerifyEmailContent from "./verify-email-content";

function VerifyEmailFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-6 dark:bg-neutral-950">
      <section className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="text-2xl font-bold text-neutral-950 dark:text-white">
          Verify your email
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Loading verification link...
        </p>
      </section>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
