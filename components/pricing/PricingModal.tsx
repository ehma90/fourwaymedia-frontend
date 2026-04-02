"use client";

import { Check, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pricingModalCopy, pricingPlans } from "@/mock-data/pricing-plans";

type PricingModalProps = {
  open: boolean;
  onClose: () => void;
};

export function PricingModal({ open, onClose }: PricingModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, handleKeyDown]);

  if (typeof document === "undefined" || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/40 backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)] dark:bg-black/55"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-black/10 bg-background text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.2)] dark:border-white/10 dark:shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-background text-copy-primary transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEC107] dark:border-white/20 dark:hover:bg-white/10"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </button>

        <div className="overflow-y-auto px-6 pb-8 pt-14 sm:px-8 sm:py-10 sm:pt-16">
          <div className="text-center">
            <h2
              id={titleId}
              className="text-2xl font-bold tracking-tight text-copy-primary sm:text-3xl"
            >
              {pricingModalCopy.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-copy-body sm:text-base">
              {pricingModalCopy.subtitle}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-5">
            {pricingPlans.map((plan) => {
              const isPremium = plan.id === "premium";
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
                  {plan.badge ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-copy-primary px-3 py-1 text-xs font-medium text-background">
                      {plan.badge}
                    </span>
                  ) : null}

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
                      href="/sign-up"
                      onClick={onClose}
                      className={cn(
                        buttonVariants({ variant: "primary" }),
                        "mt-8 inline-flex h-12 w-full items-center justify-center px-6 text-base font-medium text-white shadow-[0_10px_22px_rgba(220,68,55,0.35)]",
                      )}
                    >
                      {plan.ctaLabel}
                    </Link>
                  ) : (
                    <Link
                      href="/sign-up"
                      onClick={onClose}
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
      </div>
    </div>,
    document.body,
  );
}
