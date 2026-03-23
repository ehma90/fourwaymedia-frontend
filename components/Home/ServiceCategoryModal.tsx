"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

import type { CategoryItem } from "@/mock-data/service-categories-data";
import { serviceCategoryDetails } from "@/mock-data/service-categories-data";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ServiceCategoryModalProps = {
  item: CategoryItem | null;
  onClose: () => void;
};

export function ServiceCategoryModal({ item, onClose }: ServiceCategoryModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!item) return;
    document.addEventListener("keydown", handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [item, handleKeyDown]);

  if (typeof document === "undefined" || !item) return null;

  const detail = serviceCategoryDetails[item.title];

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
        className="relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-black/6 bg-[#f7f3eb] text-neutral-800 shadow-[0_24px_80px_rgba(0,0,0,0.2)] dark:border-white/10 dark:bg-[#252525] dark:text-neutral-200 dark:shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#c4c0b8] bg-[#f7f3eb] text-[#4b5563] transition-colors hover:bg-[#efe9df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEC107] dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </button>

        <div className="grid max-h-[inherit] flex-1 gap-6 overflow-y-auto p-6 pt-14 sm:p-8 sm:pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8">
          <div className="flex min-h-0 flex-col gap-4 rounded-2xl bg-[#e8e4dc] p-4 sm:p-5 dark:bg-neutral-800/70">
            <div className="overflow-hidden rounded-xl border border-[#d6d1c7] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:border-neutral-600 dark:bg-neutral-950 dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              <img
                src={item.image}
                alt=""
                className="aspect-4/3 w-full object-cover"
              />
            </div>
            <div className="hidden flex-1 gap-3 sm:flex">
              <div className="flex-1 rounded-lg border border-[#d6d1c7] bg-linear-to-b from-[#6366f1]/25 via-white to-[#a855f7]/20 shadow-inner dark:border-neutral-600 dark:from-[#6366f1]/15 dark:via-neutral-900/40 dark:to-[#a855f7]/15" />
              <div className="flex-1 rounded-lg border border-[#d6d1c7] bg-linear-to-b from-[#3b82f6]/20 via-white to-[#8b5cf6]/15 shadow-inner dark:border-neutral-600 dark:from-[#3b82f6]/12 dark:via-neutral-900/40 dark:to-[#8b5cf6]/12" />
            </div>
          </div>

          <div className="flex min-h-0 flex-col gap-5 font-[family-name:var(--font-lexend),system-ui,sans-serif]">
            <div className="space-y-3 text-sm leading-relaxed text-neutral-700 sm:text-[15px] dark:text-neutral-300">
              {detail.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                What&apos;s Included
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-neutral-700 sm:text-[15px] dark:text-neutral-300">
                {detail.included.map((line) => (
                  <li key={line} className="flex gap-2.5 leading-snug">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-500 dark:bg-neutral-400" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <footer className="flex flex-col gap-4 border-t border-[#e0dcd4] bg-[#f2ede4] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-neutral-700 dark:bg-[#1f1f1f]">
          <p
            id={titleId}
            className="text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl font-[family-name:var(--font-lexend),system-ui,sans-serif] dark:text-white"
          >
            {item.title}
          </p>
          <Link
            href="/contact"
            onClick={onClose}
            className={cn(
              buttonVariants({ variant: "primary" }),
              "h-10 min-w-[120px] justify-center px-8 text-base font-medium shadow-[0_10px_22px_rgba(220,68,55,0.35)] dark:shadow-[0_10px_26px_rgba(220,68,55,0.45)]",
            )}
          >
            Contact us
          </Link>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
