"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ApiError } from "@/lib/api";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error",
  );
  const [message, setMessage] = useState(
    token
      ? "Verifying your email..."
      : "This verification link is missing a token.",
  );

  useEffect(() => {
    if (!token) return;

    void fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as {
          message?: string;
          error?: string;
        };
        if (!res.ok) {
          throw new ApiError(
            data.error ?? "This link is invalid or expired.",
            res.status,
          );
        }
        setState("success");
        setMessage(data.message ?? "Your email has been verified.");
      })
      .catch((error: unknown) => {
        setState("error");
        setMessage(
          error instanceof ApiError
            ? error.message
            : "Could not verify your email. Please try again.",
        );
      });
  }, [token]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-6 dark:bg-neutral-950">
      <section className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="text-2xl font-bold text-neutral-950 dark:text-white">
          {state === "success" ? "Email verified" : "Verify your email"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {message}
        </p>
        {state === "success" ? (
          <Link
            href="/sign-in"
            className="mt-6 inline-flex rounded-xl bg-[#DC4437] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c93d31]"
          >
            Continue to sign in
          </Link>
        ) : null}
      </section>
    </main>
  );
}
