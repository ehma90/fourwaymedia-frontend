"use client";

import Link from "next/link";
import { Download, FolderOpen } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useDashboardSubscription } from "@/hooks/use-dashboard-subscription";
import { cn } from "@/lib/utils";

/** TODO: replace with API — number of assets the user has downloaded */
const MOCK_DOWNLOADS_COUNT = 0;

export function DashboardDownloadsContent() {
  const { isSubscribed } = useDashboardSubscription();

  if (!isSubscribed) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 p-8 text-center dark:border-zinc-600 dark:bg-zinc-900/40">
        <FolderOpen
          className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-500"
          aria-hidden
        />
        <h2 className="mt-4 font-[family-name:var(--font-bitter)] text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          My downloads
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Subscribe to Premium to access your personal download library and unlimited assets.
        </p>
        <Link
          href="/dashboard/subscription"
          className={cn(
            buttonVariants({ variant: "primary" }),
            "mt-6 inline-flex w-full justify-center sm:w-auto",
          )}
        >
          View plans
        </Link>
      </div>
    );
  }

  if (MOCK_DOWNLOADS_COUNT > 0) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Your downloaded files will appear here. (List UI when API is connected.)
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex flex-col items-center rounded-2xl border border-zinc-200/90 bg-white px-6 py-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 md:px-10 md:py-14">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <Download
            className="h-7 w-7 text-zinc-600 dark:text-zinc-300"
            strokeWidth={1.75}
            aria-hidden
          />
        </span>
        <h2 className="mt-6 font-[family-name:var(--font-bitter)] text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          You haven&apos;t downloaded anything yet.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Subscribe to get unlimited downloads, or discover the latest assets across our
          most-loved categories.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/subscription"
            className={cn(
              buttonVariants({ variant: "primary" }),
              "inline-flex h-11 w-full justify-center px-6 sm:w-auto",
            )}
          >
            Get unlimited downloads
          </Link>
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "inline-flex h-11 w-full justify-center border-2 px-6 text-zinc-800 dark:border-zinc-600 dark:text-zinc-100 sm:w-auto",
            )}
          >
            Explore top categories
          </Link>
        </div>
      </div>
    </div>
  );
}
