import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 px-6 dark:bg-neutral-950">
      <p className="text-lg font-semibold text-neutral-900 dark:text-white">
        Create account
      </p>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        This flow is not wired yet.
      </p>
      <Link
        href="/sign-in"
        className="mt-6 text-sm font-medium text-[#DC4437] underline-offset-4 hover:underline dark:text-[#FEC107]"
      >
        Back to sign in
      </Link>
    </div>
  );
}
