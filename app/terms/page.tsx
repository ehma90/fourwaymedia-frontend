import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-950 dark:text-white">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Placeholder page. Replace with your legal copy when ready.
      </p>
      <Link
        href="/sign-up"
        className="mt-8 inline-block text-sm font-medium text-[#DC4437] hover:underline dark:text-[#FEC107]"
      >
        ← Back to sign up
      </Link>
    </div>
  );
}
