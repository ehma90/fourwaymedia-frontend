"use client";

import Link from "next/link";
import {
  Bell,
  CalendarClock,
  Download,
  HelpCircle,
  Inbox,
  Settings,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo } from "react";

import { buttonVariants } from "@/components/ui/button";
import { usePurchases } from "@/hooks/use-purchases";
import { useAuth } from "@/lib/auth-context";
import type { DownloadedAsset } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { MOCK_NOTIFICATIONS } from "@/mock-data/notifications";

function firstName(displayName: string): string {
  const part = displayName.trim().split(/\s+/)[0];
  return part || "there";
}

const cardClass =
  "rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40";

const ROLLING_30_DAYS_MS = 30 * 86_400_000;

function countDownloadsRolling30Days(
  downloads: DownloadedAsset[],
  nowMs: number = Date.now(),
): number {
  const cutoff = nowMs - ROLLING_30_DAYS_MS;
  return downloads.filter((d) => {
    const t = new Date(d.downloadedAt).getTime();
    return !Number.isNaN(t) && t >= cutoff;
  }).length;
}

function lastDownloadSummary(downloads: DownloadedAsset[]): string | null {
  let bestMs = NaN;
  for (const d of downloads) {
    const t = new Date(d.downloadedAt).getTime();
    if (Number.isNaN(t)) continue;
    if (Number.isNaN(bestMs) || t > bestMs) bestMs = t;
  }
  if (Number.isNaN(bestMs)) return null;
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(bestMs),
  );
}

export function DashboardOverview() {
  const { user, isLoading: authLoading } = useAuth();
  const { downloads, isLoading: purchasesLoading } = usePurchases();
  const name = firstName(user?.displayName ?? "there");

  const unreadNotificationCount = useMemo(
    () => MOCK_NOTIFICATIONS.filter((n) => !n.read).length,
    [],
  );
  const totalNotificationCount = MOCK_NOTIFICATIONS.length;

  const downloadsRolling30 = useMemo(
    () => countDownloadsRolling30Days(downloads),
    [downloads],
  );
  const totalLibraryCount = downloads.length;
  const lastDownloadLine = useMemo(
    () => lastDownloadSummary(downloads),
    [downloads],
  );

  const metricsLoading = authLoading || purchasesLoading;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <section aria-labelledby="overview-greeting-heading">
        <h2
          id="overview-greeting-heading"
          className="font-[family-name:var(--font-bitter)] text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Hi, {name}
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Manage your purchases and notifications in one place.
        </p>
      </section>

      <section aria-labelledby="overview-metrics-heading">
        <h2
          id="overview-metrics-heading"
          className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400"
        >
          Metrics
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricStat
            label="Unread"
            value={unreadNotificationCount}
            sublabel="Notifications"
            icon={Inbox}
          />
          <MetricStat
            label="Last 30 days"
            value={downloadsRolling30}
            sublabel="Purchases"
            icon={Download}
            isLoading={metricsLoading}
          />
          <MetricStat
            label="Library"
            value={totalLibraryCount}
            sublabel="Total templates"
            icon={Sparkles}
            isLoading={metricsLoading}
          />
          <MetricStat
            label="Last purchase"
            value={lastDownloadLine ?? "—"}
            sublabel={lastDownloadLine ? "Most recent" : "No activity yet"}
            icon={CalendarClock}
            isLoading={metricsLoading}
          />
        </div>
      </section>

      <section aria-labelledby="overview-quick-heading">
        <h2
          id="overview-quick-heading"
          className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400"
        >
          Quick actions
        </h2>
        <ul className="mt-3 grid gap-3 grid-cols-2 sm:grid-cols-4">
          <QuickLink href="/dashboard/purchases" label="Purchases" icon={Download} />
          <QuickLink href="/dashboard/notifications" label="Notifications" icon={Bell} />
          <QuickLink href="/dashboard/account" label="Account" icon={Settings} />
        </ul>
      </section>

      <section
        aria-labelledby="overview-glance-heading"
        className="grid gap-4 sm:grid-cols-2"
      >
        <h2 id="overview-glance-heading" className="sr-only">
          At a glance
        </h2>
        <div className={cardClass}>
          <div className="flex items-start gap-2">
            <Bell className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Notifications</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {totalNotificationCount === 0
                  ? "No notifications yet."
                  : unreadNotificationCount > 0
                    ? `${unreadNotificationCount} unread${
                        totalNotificationCount > unreadNotificationCount
                          ? ` · ${totalNotificationCount} total`
                          : ""
                      }.`
                    : "You’re all caught up."}
              </p>
              <Link
                href="/dashboard/notifications"
                className="mt-2 inline-block text-sm font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
              >
                Open notifications
              </Link>
            </div>
          </div>
        </div>
        <div className={cardClass}>
          <div className="flex items-start gap-2">
            <Download className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Purchases</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {totalLibraryCount === 0
                  ? "No templates in your library yet."
                  : `${totalLibraryCount} template${totalLibraryCount === 1 ? "" : "s"} in your library${
                      downloadsRolling30 > 0
                        ? ` · ${downloadsRolling30} purchased in the last 30 days`
                        : ""
                    }.`}
              </p>
              <Link
                href="/dashboard/purchases"
                className="mt-2 inline-block text-sm font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
              >
                Go to my purchases
              </Link>
            </div>
          </div>
        </div>
      </section>

      <p className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
        <HelpCircle className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
        <span>Need help?</span>
        <Link
          href="/contact"
          className="font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
        >
          Contact us
        </Link>
      </p>
    </div>
  );
}

function MetricStat({
  label,
  value,
  sublabel,
  icon: Icon,
  isLoading = false,
}: {
  label: string;
  value: string | number;
  sublabel: string;
  icon: LucideIcon;
  isLoading?: boolean;
}) {
  return (
    <div className={cn(cardClass, "flex flex-col gap-2 p-4 sm:p-5")}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <Icon className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
      </div>
      {isLoading ? (
        <Skeleton className="h-8 w-16" />
      ) : (
        <p className="text-2xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
          {value}
        </p>
      )}
      <p className="text-xs text-zinc-600 dark:text-zinc-400">{sublabel}</p>
    </div>
  );
}

function QuickLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50/80 px-3 py-4 text-center text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-200 dark:hover:bg-zinc-800/80"
      >
        <Icon className="h-5 w-5 opacity-90" aria-hidden />
        {label}
      </Link>
    </li>
  );
}
