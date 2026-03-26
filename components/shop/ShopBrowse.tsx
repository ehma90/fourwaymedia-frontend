"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { ShopCategoryTabs } from "@/components/shop/ShopCategoryTabs";
import { ShopFilterPanel } from "@/components/shop/ShopFilterPanel";
import { ShopTemplateCard } from "@/components/shop/ShopTemplateCard";
import { ShopTemplateModal } from "@/components/shop/ShopTemplateModal";
import {
  cloneAppliedFilters,
  emptyAppliedFilters,
  filterShopTemplates,
  shopTemplates,
  type AppliedFilters,
  type ShopTemplate,
  type ShopTopCategoryId,
} from "@/mock-data/shop-templates";

export function ShopBrowse() {
  const [activeCategory, setActiveCategory] =
    useState<ShopTopCategoryId>("all");
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(() =>
    emptyAppliedFilters(),
  );
  const [draftFilters, setDraftFilters] = useState<AppliedFilters>(() =>
    emptyAppliedFilters(),
  );
  const [selectedTemplate, setSelectedTemplate] =
    useState<ShopTemplate | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredTemplates = useMemo(
    () =>
      filterShopTemplates(shopTemplates, activeCategory, appliedFilters),
    [activeCategory, appliedFilters],
  );

  const applyDraft = useCallback(() => {
    const next = cloneAppliedFilters(draftFilters);
    setAppliedFilters(next);
    setDraftFilters(next);
    setMobileFiltersOpen(false);
  }, [draftFilters]);

  const clearDraft = useCallback(() => {
    setDraftFilters(emptyAppliedFilters());
  }, []);

  const openMobileFilters = useCallback(() => {
    setDraftFilters(cloneAppliedFilters(appliedFilters));
    setMobileFiltersOpen(true);
  }, [appliedFilters]);

  const closeMobileFilters = useCallback(() => {
    setDraftFilters(cloneAppliedFilters(appliedFilters));
    setMobileFiltersOpen(false);
  }, [appliedFilters]);

  return (
    <section
      className=" py-14 sm:py-16 dark:border-white/10"
      aria-labelledby="shop-browse-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2
            id="shop-browse-heading"
            className="text-2xl font-semibold tracking-tight text-copy-primary sm:text-3xl"
          >
            Browse templates
          </h2>
          <p className="mt-2 text-base leading-relaxed text-copy-body sm:text-lg">
            Filter by format and specs, then open a template for details and
            purchase options.
          </p>
        </div>

        {/* Toolbar: categories + mobile filters */}
        <div className="mt-8 flex items-center gap-3 lg:mt-10">
          <ShopCategoryTabs
            activeId={activeCategory}
            onChange={setActiveCategory}
            className="lg:max-w-none"
          />
          <button
            type="button"
            onClick={openMobileFilters}
            className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-200/90 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm lg:hidden dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filters
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden w-[272px] shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900/50">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Filters
              </h3>
              <ShopFilterPanel
                className="mt-4"
                draft={draftFilters}
                onDraftChange={setDraftFilters}
                onClear={clearDraft}
                onApply={applyDraft}
              />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {filteredTemplates.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-neutral-300/90 bg-neutral-50/80 px-6 py-12 text-center text-sm text-neutral-600 dark:border-white/15 dark:bg-neutral-900/30 dark:text-neutral-400">
                No templates match these filters. Try clearing filters or
                choosing another category.
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTemplates.map((t) => (
                  <li key={t.id}>
                    <ShopTemplateCard
                      template={t}
                      onOpen={() => setSelectedTemplate(t)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen ? (
        <div
          className="fixed inset-0 z-150 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filters-title"
        >
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/40 backdrop-blur-[6px]"
            onClick={closeMobileFilters}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-neutral-200/90 bg-[#f7f3eb] shadow-2xl dark:border-white/10 dark:bg-[#252525]">
            <div className="flex items-center justify-between border-b border-[#e0dcd4] px-4 py-4 dark:border-neutral-700">
              <h3
                id="mobile-filters-title"
                className="text-lg font-semibold text-neutral-900 dark:text-white"
              >
                Filters
              </h3>
              <button
                type="button"
                onClick={closeMobileFilters}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c4c0b8] bg-[#f7f3eb] text-neutral-700 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <ShopFilterPanel
                draft={draftFilters}
                onDraftChange={setDraftFilters}
                onClear={clearDraft}
                onApply={applyDraft}
                showActions={false}
              />
            </div>
            <div className="flex flex-col gap-2 border-t border-[#e0dcd4] bg-[#f2ede4] p-4 dark:border-neutral-700 dark:bg-[#1f1f1f]">
              <button
                type="button"
                onClick={applyDraft}
                className="h-11 w-full rounded-xl bg-linear-to-r from-[#DC4437] to-[#FEC107] text-sm font-medium text-white shadow-[0_8px_18px_rgba(220,68,55,0.25)]"
              >
                Apply filters
              </button>
              <button
                type="button"
                onClick={clearDraft}
                className="h-10 w-full rounded-xl border border-neutral-300 text-sm font-medium text-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <ShopTemplateModal
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
    </section>
  );
}
