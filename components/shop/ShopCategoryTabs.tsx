"use client";

import { cn } from "@/lib/utils";
import {
  shopTopCategories,
  type ShopTopCategoryId,
} from "@/mock-data/shop-templates";

type ShopCategoryTabsProps = {
  activeId: ShopTopCategoryId;
  onChange: (id: ShopTopCategoryId) => void;
  className?: string;
};

export function ShopCategoryTabs({
  activeId,
  onChange,
  className,
}: ShopCategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Template categories"
      className={cn(
        "flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {shopTopCategories.map((cat) => {
        const selected = activeId === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(cat.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              selected
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950"
                : "border border-neutral-200/90 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-200 dark:hover:bg-neutral-800",
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
