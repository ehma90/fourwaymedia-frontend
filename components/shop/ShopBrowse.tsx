"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2, Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

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

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileFilters();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [mobileFiltersOpen, closeMobileFilters]);

  return (
    <section
      className="pt-5 pb-14 sm:py-16 dark:border-white/10"
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

        {/* Toolbar: sticky below navbar; template grid scrolls underneath */}
        <div
          className={cn(
            "sticky z-40 -mx-6 mt-8 border-b border-neutral-200/90 bg-background/95 px-6 py-3 backdrop-blur-md supports-backdrop-filter:bg-background/80 lg:mt-10 lg:mx-0 lg:px-0 dark:border-white/10",
            // top-20 (5rem) clears the marketing navbar (~sticky top-0 z-50)
            "top-20",
          )}
        >
          <div className="flex min-w-0 flex-wrap items-center gap-3">
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
        </div>

        {/* Default align-items: stretch so aside is as tall as the template column — required for inner position:sticky */}
        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:gap-10">
          {/* Desktop sidebar — sticky under navbar + toolbar row */}
          <aside className="hidden min-h-0 w-[272px] shrink-0 lg:block">
            <div
              className={cn(
                "sticky rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900/50",
                // ~5rem navbar + ~4.5rem toolbar so the card sits below the stuck toolbar
                "top-38",
              )}
            >
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
      <AnimatePresence>
        {mobileFiltersOpen ? (
          <>
            <motion.button
              key="shop-mobile-filters-backdrop"
              type="button"
              aria-label="Close filters"
              className="fixed inset-0 z-150 bg-black/40 backdrop-blur-[6px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              onClick={closeMobileFilters}
            />
            <motion.div
              key="shop-mobile-filters-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-filters-title"
              className="fixed inset-y-0 right-0 z-160 flex w-full max-w-[200px] flex-col border-l border-neutral-200/90 bg-[#f7f3eb] shadow-2xl lg:hidden dark:border-white/10 dark:bg-[#252525]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 32,
                stiffness: 380,
                mass: 0.85,
              }}
            >
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
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <ShopTemplateModal
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
    </section>
  );
}
