"use client";

import type { ShopTemplate } from "@/mock-data/shop-templates";

type ShopTemplateCardProps = {
  template: ShopTemplate;
  onOpen: () => void;
};

export function ShopTemplateCard({ template, onOpen }: ShopTemplateCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white text-left shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] outline-none transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] focus-visible:ring-2 focus-visible:ring-[#FEC107]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-neutral-900/40 dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
      aria-label={`${template.title}. View details and purchase options.`}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={template.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 to-transparent"
          aria-hidden
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-900 dark:bg-neutral-950/90 dark:text-white">
          {template.priceLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4 sm:p-5">
        <span className="text-base font-semibold leading-snug text-copy-primary sm:text-lg">
          {template.title}
        </span>
        <p className="line-clamp-2 text-sm leading-relaxed text-copy-body">
          {template.cardBlurb}
        </p>
        <span className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {template.format.toUpperCase()} · {template.aspectRatio.replace("-", ":")} ·{" "}
          {template.duration}
        </span>
      </div>
    </button>
  );
}
