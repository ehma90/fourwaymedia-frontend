"use client";

import Link from "next/link";
import { Bell, CreditCard, Megaphone, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MOCK_NOTIFICATIONS,
  type NotificationItem,
  type NotificationKind,
} from "@/mock-data/notifications";

const cardClass =
  "rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-zinc-800 dark:bg-zinc-900/40 dark:shadow-none ";

const kindIconWell: Record<NotificationKind, string> = {
  billing:
    "border-blue-200/80 bg-gradient-to-br from-blue-50 to-blue-100/80 text-blue-700 dark:border-blue-800/60 dark:from-blue-950/60 dark:to-blue-900/30 dark:text-blue-300",
  subscription:
    "border-amber-200/80 bg-gradient-to-br from-amber-50 to-[#FEC107]/15 text-amber-900 dark:border-amber-800/50 dark:from-amber-950/50 dark:to-[#FEC107]/10 dark:text-amber-200",
  product:
    "border-violet-200/80 bg-gradient-to-br from-violet-50 to-violet-100/70 text-violet-800 dark:border-violet-800/60 dark:from-violet-950/50 dark:to-violet-900/30 dark:text-violet-200",
};

function formatRelativeTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const now = Date.now();
  const diffMs = now - d.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(d);
}

const KIND_ICONS: Record<
  NotificationKind,
  React.ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>
> = {
  billing: CreditCard,
  subscription: Sparkles,
  product: Megaphone,
};

export function DashboardNotificationsContent() {
  const [items, setItems] = useState<NotificationItem[]>(() => [...MOCK_NOTIFICATIONS]);

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);
  const hasUnread = unreadCount > 0;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header>
        <h1 className="font-[family-name:var(--font-bitter)] text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Notifications
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Subscription updates, billing events, and product news in one place.
        </p>
      </header>

      <section aria-labelledby="notifications-feed-heading" className={cardClass}>
        <div className="flex flex-col gap-4 border-b border-zinc-200/90 pb-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h2
              id="notifications-feed-heading"
              className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Inbox
            </h2>
            {hasUnread ? (
              <span className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                {unreadCount} new
              </span>
            ) : (
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">All caught up</span>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!hasUnread}
            className="h-9 shrink-0 border-2 border-zinc-300 bg-zinc-50/80 text-zinc-800 shadow-none hover:bg-white hover:brightness-100 disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:bg-zinc-800"
            onClick={markAllRead}
          >
            Mark all as read
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-zinc-50 to-zinc-100/80 shadow-inner dark:border-zinc-700 dark:from-zinc-800/80 dark:to-zinc-900">
              <Bell
                className="h-8 w-8 text-zinc-500 dark:text-zinc-400"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
            <p className="mt-5 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              No notifications yet
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              When something changes with your subscription, billing, or new drops, it will show up
              here.
            </p>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
              <Link
                href="/dashboard"
                className="font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
              >
                Back to overview
              </Link>
              <Link
                href="/shop"
                className="font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
              >
                Browse shop
              </Link>
            </p>
          </div>
        ) : (
          <ul className="mt-1 space-y-3" role="list">
            {items.map((n) => {
              const Icon = KIND_ICONS[n.kind];
              return (
                <li
                  key={n.id}
                  className={cn(
                    "flex gap-3.5 rounded-xl border p-4 transition-colors sm:gap-4 sm:p-4",
                    n.read
                      ? "border-zinc-200/90 bg-zinc-50/40 hover:border-zinc-300/90 hover:bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950/20 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
                      : "border-[#DC4437]/20 bg-gradient-to-br from-white to-zinc-50/90 shadow-[0_0_0_1px_rgba(220,68,55,0.08)] dark:border-[#FEC107]/25 dark:from-zinc-900/80 dark:to-zinc-950/40 dark:shadow-[0_0_0_1px_rgba(254,193,7,0.12)]",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-sm",
                      kindIconWell[n.kind],
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-2">
                        {!n.read ? (
                          <span
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[linear-gradient(160deg,#DC4437,#FEC107)]"
                            aria-hidden
                          />
                        ) : null}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
                            {n.title}
                            {!n.read ? (
                              <span className="sr-only"> (unread)</span>
                            ) : null}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {n.body}
                          </p>
                        </div>
                      </div>
                      <time
                        className="shrink-0 rounded-md bg-zinc-100/90 px-2 py-0.5 text-[11px] font-medium tabular-nums text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        dateTime={n.createdAt}
                      >
                        {formatRelativeTime(n.createdAt)}
                      </time>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
