"use client";

import { Maximize2, Minimize2, Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { ShopCategoryTabs } from "@/components/shop/ShopCategoryTabs";
import { ShopFilterPanel } from "@/components/shop/ShopFilterPanel";
import { ShopTemplateCard } from "@/components/shop/ShopTemplateCard";
import { ShopTemplateModal } from "@/components/shop/ShopTemplateModal";
import { buttonVariants } from "@/components/ui/button";
import {
  cloneAppliedFilters,
  emptyAppliedFilters,
  filterShopTemplates,
  shopTemplates,
  type AppliedFilters,
  type ShopTemplate,
  type ShopTopCategoryId,
} from "@/mock-data/shop-templates";
import { inputFieldClassName } from "@/lib/input-classes";
import { cn } from "@/lib/utils";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [browseExpanded, setBrowseExpanded] = useState(false);

  const baseFiltered = useMemo(
    () =>
      filterShopTemplates(shopTemplates, activeCategory, appliedFilters),
    [activeCategory, appliedFilters],
  );

  const displayTemplates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return baseFiltered;
    return baseFiltered.filter((t) => {
      const haystack = `${t.title} ${t.cardBlurb}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [baseFiltered, searchQuery]);

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
      <div
        className={cn(
          "mx-auto w-full px-6",
          browseExpanded ? "max-w-none" : "max-w-7xl",
        )}
      >
        <div className="flex flex-row items-start justify-between gap-4">
          <div className="min-w-0 max-w-2xl">
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

          <button
            type="button"
            onClick={() => setBrowseExpanded((v) => !v)}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200/90 bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 md:inline-flex dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            aria-label={
              browseExpanded ? "Use normal browse width" : "Expand browse width"
            }
            aria-pressed={browseExpanded}
            title={
              browseExpanded ? "Return to standard width" : "Use full width"
            }
          >
            {browseExpanded ? (
              <Minimize2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            ) : (
              <Maximize2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            )}
          </button>
        </div>

        {/* Toolbar: categories | search + mobile filters (right) */}
        <div className="mt-8 flex min-w-0 flex-wrap items-center gap-3 lg:mt-10">
          <ShopCategoryTabs
            activeId={activeCategory}
            onChange={setActiveCategory}
            className="min-w-0 flex-1 basis-full sm:basis-auto lg:max-w-none"
          />
          <div className="flex w-full min-w-0 basis-full items-center gap-3 sm:ml-auto sm:w-auto sm:flex-initial sm:basis-auto sm:justify-end">
            <div className="relative min-w-0 flex-1 sm:max-w-sm sm:min-w-[220px] sm:shrink-0">
              <label htmlFor="shop-search" className="sr-only">
                Search templates
              </label>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
                aria-hidden
              />
              <input
                id="shop-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates…"
                autoComplete="off"
                className={cn(
                  inputFieldClassName,
                  "h-10 w-full pl-9 pr-3 text-sm",
                )}
              />
            </div>
            <button
              type="button"
              onClick={openMobileFilters}
              className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-200/90 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm lg:hidden dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-100"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              Filters
            </button>
          </div>
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
            {baseFiltered.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-neutral-300/90 bg-neutral-50/80 px-6 py-12 text-center text-sm text-neutral-600 dark:border-white/15 dark:bg-neutral-900/30 dark:text-neutral-400">
                No templates match these filters. Try clearing filters or
                choosing another category.
              </p>
            ) : displayTemplates.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-neutral-300/90 bg-neutral-50/80 px-6 py-12 text-center text-sm text-neutral-600 dark:border-white/15 dark:bg-neutral-900/30 dark:text-neutral-400">
                No templates match &ldquo;{searchQuery.trim()}&rdquo;. Try a
                different search.
              </p>
            ) : (
              <ul
                className={cn(
                  "grid grid-cols-1 gap-6 sm:grid-cols-2",
                  browseExpanded ? "xl:grid-cols-4" : "xl:grid-cols-3",
                )}
              >
                {displayTemplates.map((t) => (
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
                className={cn(
                  buttonVariants({ variant: "primary" }),
                  "h-11 w-full justify-center text-sm",
                )}
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
