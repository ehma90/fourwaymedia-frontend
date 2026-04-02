"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ShopTemplate } from "@/mock-data/shop-templates";

type ShopTemplateModalProps = {
  template: ShopTemplate | null;
  onClose: () => void;
};

export function ShopTemplateModal({ template, onClose }: ShopTemplateModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!template) return;
    document.addEventListener("keydown", handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [template, handleKeyDown]);

  if (typeof document === "undefined" || !template) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6"
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
                src={template.image}
                alt=""
                className="aspect-4/3 w-full object-cover"
              />
            </div>
            <p className="text-center text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {template.priceLabel}
              <span className="mx-2 text-neutral-400" aria-hidden>
                ·
              </span>
              {template.format.toUpperCase()} ·{" "}
              {template.aspectRatio.replace("-", ":")} · {template.duration}
            </p>
          </div>

          <div className="flex min-h-0 flex-col gap-5 font-[family-name:var(--font-lexend),system-ui,sans-serif]">
            <div className="space-y-3 text-sm leading-relaxed text-neutral-700 sm:text-[15px] dark:text-neutral-300">
              {template.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                What&apos;s included
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-neutral-700 sm:text-[15px] dark:text-neutral-300">
                {template.included.map((line) => (
                  <li key={line} className="flex gap-2.5 leading-snug">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-500 dark:bg-neutral-400"
                      aria-hidden
                    />
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
            {template.title}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-10 min-w-[120px] justify-center px-6 text-base font-medium",
              )}
            >
              Download
            </button>
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "primary" }),
                "h-10 min-w-[120px] justify-center px-8 text-base font-medium",
              )}
            >
              Buy now
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
