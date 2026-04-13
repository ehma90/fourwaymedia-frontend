"use client";

import Link from "next/link";
import {
  Bell,
  CreditCard,
  Download,
  HelpCircle,
  Settings,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useDashboardSubscription } from "@/hooks/use-dashboard-subscription";
import { MOCK_USER_DISPLAY_NAME } from "@/lib/mock-auth-context";
import { cn } from "@/lib/utils";

function firstName(displayName: string): string {
  const part = displayName.trim().split(/\s+/)[0];
  return part || "there";
}

const cardClass =
  "rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40";

export function DashboardOverview() {
  const { isSubscribed, planName, renewalDateLabel } = useDashboardSubscription();
  const name = firstName(MOCK_USER_DISPLAY_NAME);

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
          Manage your subscription and downloads in one place.
        </p>
      </section>

      <section aria-labelledby="overview-plan-heading">
        <h2 id="overview-plan-heading" className="sr-only">
          Subscription
        </h2>
        {!isSubscribed ? (
          <div className={cn(cardClass, "border-dashed border-zinc-300 dark:border-zinc-600")}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <Sparkles className="h-5 w-5 text-zinc-700 dark:text-zinc-200" aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    Subscribe to Premium
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Unlock the full template library and downloads with a Premium subscription.
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard/subscription"
                className={cn(
                  buttonVariants({ variant: "primary" }),
                  "shrink-0 self-start sm:self-center",
                )}
              >
                View plans
              </Link>
            </div>
          </div>
        ) : (
          <div className={cardClass}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Current plan</p>
                <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {planName ?? "Premium"}
                </p>
                {renewalDateLabel ? (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Renews on <span className="font-medium">{renewalDateLabel}</span>
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/dashboard/billing"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "inline-flex h-10 items-center gap-2 border-2 px-4 text-sm text-zinc-800 dark:border-zinc-600 dark:text-zinc-100",
                  )}
                >
                  <CreditCard className="h-4 w-4" aria-hidden />
                  Manage billing
                </Link>
                <Link
                  href="/dashboard/downloads"
                  className={cn(buttonVariants({ variant: "primary" }), "inline-flex h-10 items-center gap-2 px-4 text-sm")}
                >
                  <Download className="h-4 w-4" aria-hidden />
                  My downloads
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <section aria-labelledby="overview-quick-heading">
        <h2
          id="overview-quick-heading"
          className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400"
        >
          Quick actions
        </h2>
        <ul
          className={cn(
            "mt-3 grid gap-3",
            isSubscribed ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3",
          )}
        >
          {!isSubscribed ? (
            <QuickLink
              href="/dashboard/subscription"
              label="Subscription"
              icon={Sparkles}
            />
          ) : (
            <>
              <QuickLink href="/dashboard/downloads" label="My downloads" icon={Download} />
              <QuickLink href="/dashboard/billing" label="Billing" icon={CreditCard} />
            </>
          )}
          <QuickLink href="/dashboard/notifications" label="Notifications" icon={Bell} />
          <QuickLink href="/dashboard/account" label="Account" icon={Settings} />
        </ul>
      </section>

      <section
        aria-labelledby="overview-glance-heading"
        className={cn("grid gap-4", isSubscribed && "sm:grid-cols-2")}
      >
        <h2 id="overview-glance-heading" className="sr-only">
          At a glance
        </h2>
        <div className={cardClass}>
          <div className="flex items-start gap-2">
            <Bell className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Notifications</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">No notifications yet.</p>
              <Link
                href="/dashboard/notifications"
                className="mt-2 inline-block text-sm font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
              >
                Open notifications
              </Link>
            </div>
          </div>
        </div>
        {isSubscribed ? (
          <div className={cardClass}>
            <div className="flex items-start gap-2">
              <Download className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">My downloads</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  0 items available in your library.
                </p>
                <Link
                  href="/dashboard/downloads"
                  className="mt-2 inline-block text-sm font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
                >
                  Go to my downloads
                </Link>
              </div>
            </div>
          </div>
        ) : null}
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
