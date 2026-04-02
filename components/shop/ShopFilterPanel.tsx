"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  shopFilterGroups,
  type AppliedFilters,
} from "@/mock-data/shop-templates";

type ShopFilterPanelProps = {
  draft: AppliedFilters;
  onDraftChange: (next: AppliedFilters) => void;
  onClear: () => void;
  onApply: () => void;
  className?: string;
  /** When false, hide the action row (e.g. parent supplies footer buttons). */
  showActions?: boolean;
};

export function ShopFilterPanel({
  draft,
  onDraftChange,
  onClear,
  onApply,
  className,
  showActions = true,
}: ShopFilterPanelProps) {
  const toggle = (groupId: string, value: string) => {
    const current = draft[groupId] ?? [];
    const has = current.includes(value);
    const nextValues = has
      ? current.filter((v) => v !== value)
      : [...current, value];
    onDraftChange({ ...draft, [groupId]: nextValues });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {shopFilterGroups.map((group) => (
        <fieldset key={group.id} className="min-w-0 space-y-3">
          <legend className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {group.label}
          </legend>
          <ul className="flex flex-col gap-2.5">
            {group.options.map((opt) => {
              const inputId = `filter-${group.id}-${opt.value}`;
              const checked = (draft[group.id] ?? []).includes(opt.value);
              return (
                <li key={opt.value}>
                  <label
                    htmlFor={inputId}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(group.id, opt.value)}
                      className="h-4 w-4 shrink-0 rounded border-neutral-300 bg-white text-[#DC4437] focus:ring-2 focus:ring-[#FEC107]/40 dark:border-neutral-600 dark:bg-neutral-900"
                    />
                    <span>{opt.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}

      {showActions ? (
        <div className="flex flex-col gap-2 border-t border-neutral-200/90 pt-4 dark:border-white/10 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClear}
            className="h-10 rounded-xl border border-neutral-300 bg-transparent px-4 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={onApply}
            className={cn(
              buttonVariants({ variant: "primary" }),
              "h-10 justify-center px-4 text-sm",
            )}
          >
            Apply
          </button>
        </div>
      ) : null}
    </div>
  );
}
