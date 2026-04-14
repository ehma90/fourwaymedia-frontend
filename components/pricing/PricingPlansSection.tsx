"use client";

import { Check } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { useMockAuth } from "@/lib/mock-auth-context";
import { cn } from "@/lib/utils";
import { pricingModalCopy, pricingPlans } from "@/mock-data/pricing-plans";

type PricingPlansSectionProps = {
  titleId?: string;
  headingLevel?: "h2" | "h3";
  onCtaNavigate?: () => void;
  className?: string;
};

export function PricingPlansSection({
  titleId,
  headingLevel = "h2",
  onCtaNavigate,
  className,
}: PricingPlansSectionProps) {
  const HeadingTag = headingLevel;
  const { isAuthenticated } = useMockAuth();
  const visiblePlans = isAuthenticated
    ? pricingPlans.filter((p) => p.id === "premium")
    : pricingPlans;

  return (
    <div className={cn(className)}>
      <div className="text-center">
        <HeadingTag
          id={titleId}
          className="text-2xl font-bold tracking-tight text-copy-primary sm:text-3xl"
        >
          {pricingModalCopy.title}
        </HeadingTag>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-copy-body sm:text-base">
          {pricingModalCopy.subtitle}
        </p>
      </div>

      <div
        className={cn(
          "mt-10 grid gap-6 sm:gap-5",
          visiblePlans.length === 1
            ? "sm:mx-auto sm:max-w-md sm:grid-cols-1"
            : "sm:grid-cols-2",
        )}
      >
        {visiblePlans.map((plan) => {
          const isPremium = plan.id === "premium";
          const premiumHref = isAuthenticated ? "/dashboard/billing" : "/sign-up";
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-background p-6 sm:p-7",
                isPremium
                  ? "border-copy-primary/25 shadow-md dark:border-white/20"
                  : "border-black/10 dark:border-white/10",
              )}
            >
             

              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-copy-primary">{plan.name}</h3>
                <div className="mt-4 flex flex-wrap items-baseline justify-center gap-1 sm:justify-start">
                  <span
                    className={cn(
                      "text-4xl font-bold tabular-nums tracking-tight sm:text-[2.75rem]",
                      isPremium
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-copy-primary",
                    )}
                  >
                    {plan.price}
                  </span>
                  {plan.pricePeriod ? (
                    <span className="text-sm font-medium text-copy-body">{plan.pricePeriod}</span>
                  ) : null}
                </div>
                {plan.priceNote ? (
                  <p className="mt-2 text-xs leading-relaxed text-copy-body sm:text-sm">
                    {plan.priceNote}
                  </p>
                ) : null}
                <p className="mt-3 text-sm text-copy-body">{plan.tagline}</p>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3 text-left text-sm text-copy-primary sm:text-[15px]">
                {plan.bullets.map((line) => (
                  <li key={line} className="flex gap-2.5 leading-snug">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-copy-body"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="text-copy-body">{line}</span>
                  </li>
                ))}
              </ul>

              {isPremium ? (
                // TODO: Stripe Checkout — replace href when subscription checkout is ready
                <Link
                  href={premiumHref}
                  onClick={() => onCtaNavigate?.()}
                  className={cn(
                    buttonVariants({ variant: "primary" }),
                    "mt-8 inline-flex h-12 w-full items-center justify-center px-6 text-base font-medium",
                  )}
                >
                  {plan.ctaLabel}
                </Link>
              ) : (
                <Link
                  href="/sign-up"
                  onClick={() => onCtaNavigate?.()}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "navbar-outline-button mt-8 inline-flex h-12 w-full items-center justify-center border-2 px-6 text-base font-medium text-white",
                  )}
                >
                  {plan.ctaLabel}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
