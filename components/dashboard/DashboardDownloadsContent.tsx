"use client";

import Link from "next/link";
import { Download, FolderOpen, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useDashboardSubscription } from "@/hooks/use-dashboard-subscription";
import { inputFieldClassName } from "@/lib/input-classes";
import { cn } from "@/lib/utils";
import {
  DOWNLOAD_CATEGORIES,
  type DownloadedAsset,
  MOCK_DOWNLOADS,
} from "@/mock-data/downloads";

const cardClass =
  "rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-6";

function formatDownloadedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const now = Date.now();
  const diffMs = now - d.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000);
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(d);
}

function DownloadAgainButton({
  fileHref,
  productHref,
}: {
  fileHref?: string;
  productHref: string;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "navbar-outline-button inline-flex h-9 min-w-0 items-center justify-center border-2 px-2 text-sm font-medium text-white md:h-10 md:min-w-[120px] md:px-6 ",
        "w-full shrink-0 transition-opacity duration-200 md:w-auto",
        "opacity-100",
        "md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100",
      )}
      onClick={() => {
        const target = fileHref || productHref;
        if (target) window.open(target, "_blank", "noopener,noreferrer");
      }}
    >
      <Download className="h-4 w-4" strokeWidth={2} aria-hidden />
      <span className="ml-2">Download again</span>
    </Button>
  );
}

function SubscribedPageHeader() {
  return (
    <header>
      <h1 className="font-[family-name:var(--font-bitter)] text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        My downloads
      </h1>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Your template library and quick re-downloads when you need a file again.
      </p>
    </header>
  );
}

function SubscribedEmptyState() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div
        className={cn(
          cardClass,
          "flex flex-col items-center px-6 py-12 text-center md:px-10 md:py-14",
        )}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <Download
            className="h-7 w-7 text-zinc-600 dark:text-zinc-300"
            strokeWidth={1.75}
            aria-hidden
          />
        </span>
        <h2 className="mt-6 font-[family-name:var(--font-bitter)] text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          No downloads yet
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Your library is empty. Browse the shop to grab templates—everything you download will
          show up here for easy access later.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ variant: "primary" }),
              "inline-flex h-11 w-full justify-center px-6 sm:w-auto",
            )}
          >
            Browse templates
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "inline-flex h-11 w-full justify-center border-2 px-6 text-zinc-800 dark:border-zinc-600 dark:text-zinc-100 sm:w-auto",
            )}
          >
            Back to overview
          </Link>
        </div>
      </div>
    </div>
  );
}

function DownloadsLibrary({ items }: { items: DownloadedAsset[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
    });
  }, [items, query, category]);

  const hasActiveFilters = Boolean(query.trim()) || category !== "all";

  return (
    <section aria-labelledby="downloads-library-heading" className={cardClass}>
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="downloads-library-heading"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
          >
            Library
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Search or filter by category. Hover a row on desktop to download again.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <label className="relative w-full sm:w-56">
            <span className="sr-only">Search downloads</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className={cn(inputFieldClassName, "pl-9")}
              autoComplete="off"
            />
          </label>
          <label className="w-full sm:w-40">
            <span className="sr-only">Filter by category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputFieldClassName}
            >
              <option value="all">All categories</option>
              {DOWNLOAD_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400" role="status">
          {hasActiveFilters
            ? "No results match your search. Try clearing filters or a different term."
            : "No downloads to show."}
        </p>
      ) : (
        <>
          <div className="mt-6 hidden md:block overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/50">
                <tr>
                  <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                    Template
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                    Downloaded
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-zinc-700 dark:text-zinc-300">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="group border-b border-zinc-100 transition-colors last:border-b-0 hover:bg-zinc-50/80 dark:border-zinc-800/80 dark:hover:bg-zinc-800/40"
                  >
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                          {item.thumbnailUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element -- mock / CDN thumbnails
                            <img
                              src={item.thumbnailUrl}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                              —
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-zinc-900 dark:text-zinc-50">
                            {item.title}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className="inline-flex rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                              {item.category}
                            </span>
                            <Link
                              href={item.productHref}
                              className="text-xs font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
                            >
                              View in shop
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-middle text-zinc-600 dark:text-zinc-400">
                      <time dateTime={item.downloadedAt}>{formatDownloadedAt(item.downloadedAt)}</time>
                    </td>
                    <td className="px-4 py-3 align-middle text-right">
                      <div className="flex justify-end">
                        <DownloadAgainButton
                          fileHref={item.fileHref}
                          productHref={item.productHref}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-6 flex list-none flex-col gap-3 md:hidden" aria-label="Your downloads">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="group rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30"
              >
                <div className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                    {item.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.thumbnailUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                        —
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{item.title}</p>
                    <span className="mt-1 inline-flex rounded-md bg-zinc-200/80 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {item.category}
                    </span>
                    <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <time dateTime={item.downloadedAt}>
                        Downloaded {formatDownloadedAt(item.downloadedAt)}
                      </time>
                    </p>
                    <Link
                      href={item.productHref}
                      className="mt-2 inline-block text-xs font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
                    >
                      View in shop
                    </Link>
                  </div>
                </div>
                <div className="mt-4 flex justify-stretch">
                  <DownloadAgainButton
                    fileHref={item.fileHref}
                    productHref={item.productHref}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export function DashboardDownloadsContent() {
  const { isSubscribed } = useDashboardSubscription();
  const downloads = MOCK_DOWNLOADS;

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
          Premium unlocks your personal download library and unlimited assets. Subscribe to access
          everything you&apos;ve saved in one place.
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

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <SubscribedPageHeader />
      {downloads.length === 0 ? <SubscribedEmptyState /> : <DownloadsLibrary items={downloads} />}
    </div>
  );
}
