"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2, Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ShopCategoryTabs } from "@/components/shop/ShopCategoryTabs";
import { ShopFilterPanel } from "@/components/shop/ShopFilterPanel";
import { ShopTemplateCard } from "@/components/shop/ShopTemplateCard";
import { ShopTemplateModal } from "@/components/shop/ShopTemplateModal";
import { buttonVariants } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  ShopCategoryTabsSkeleton,
  ShopFilterSkeleton,
  ShopGridSkeleton,
} from "@/components/ui/skeleton";
import { useShopCatalog } from "@/hooks/use-shop-catalog";
import { inputFieldClassName } from "@/lib/input-classes";
import {
  cloneAppliedFilters,
  emptyAppliedFilters,
  filterShopTemplates,
} from "@/lib/shop-filters";
import type { AppliedFilters, ShopTemplate, ShopTopCategoryId } from "@/lib/types/shop";
import { cn } from "@/lib/utils";

export function ShopBrowse() {
  const { data, isLoading, error } = useShopCatalog();

  const categories = data?.topCategories ?? [];
  const templates = data?.templates ?? [];
  const filterGroups = data?.filterGroups ?? [];

  const [activeCategory, setActiveCategory] =
    useState<ShopTopCategoryId>("all");
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});
  const [draftFilters, setDraftFilters] = useState<AppliedFilters>({});
  const [selectedTemplate, setSelectedTemplate] =
    useState<ShopTemplate | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [browseExpanded, setBrowseExpanded] = useState(false);

  const emptyFilters = useMemo(
    () =>
      filterGroups.length ? emptyAppliedFilters(filterGroups) : ({} as AppliedFilters),
    [filterGroups],
  );

  const catalogAppliedFilters = useMemo(
    () => ({ ...emptyFilters, ...appliedFilters }),
    [emptyFilters, appliedFilters],
  );

  const catalogDraftFilters = useMemo(
    () => ({ ...emptyFilters, ...draftFilters }),
    [emptyFilters, draftFilters],
  );

  const baseFiltered = useMemo(
    () =>
      filterShopTemplates(
        templates,
        activeCategory,
        catalogAppliedFilters,
        filterGroups,
      ),
    [templates, activeCategory, catalogAppliedFilters, filterGroups],
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
    const next = cloneAppliedFilters(catalogDraftFilters);
    setAppliedFilters(next);
    setDraftFilters(next);
    setMobileFiltersOpen(false);
  }, [catalogDraftFilters]);

  const clearDraft = useCallback(() => {
    setDraftFilters(emptyFilters);
  }, [emptyFilters]);

  const openMobileFilters = useCallback(() => {
    setDraftFilters(cloneAppliedFilters(catalogAppliedFilters));
    setMobileFiltersOpen(true);
  }, [catalogAppliedFilters]);

  const closeMobileFilters = useCallback(() => {
    setDraftFilters(cloneAppliedFilters(catalogAppliedFilters));
    setMobileFiltersOpen(false);
  }, [catalogAppliedFilters]);

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

  const gridSkeleton = (
    <ShopGridSkeleton
      count={browseExpanded ? 8 : 6}
    />
  );

  return (
    <section
      className="pt-5 pb-14 sm:py-16 dark:border-white/10"
      aria-labelledby="shop-browse-heading"
      aria-busy={isLoading}
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

        <div
          className={cn(
            "sticky z-40 -mx-6 mt-8 border-b border-neutral-200/90 bg-background/95 px-6 py-3 backdrop-blur-md supports-backdrop-filter:bg-background/80 lg:mt-10 lg:mx-0 lg:px-0 dark:border-white/10",
            "top-20",
          )}
        >
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            {isLoading ? (
              <ShopCategoryTabsSkeleton />
            ) : (
              <ShopCategoryTabs
                categories={categories}
                activeId={activeCategory}
                onChange={setActiveCategory}
                className="min-w-0 flex-1 basis-full sm:basis-auto lg:max-w-none"
              />
            )}
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
                  disabled={isLoading}
                  className={cn(
                    inputFieldClassName,
                    "h-10 w-full pl-9 pr-3 text-sm",
                    isLoading && "opacity-60",
                  )}
                />
              </div>
              <button
                type="button"
                onClick={openMobileFilters}
                disabled={isLoading}
                className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-200/90 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm lg:hidden disabled:opacity-50 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-100"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:gap-10">
          <aside className="hidden min-h-0 w-[272px] shrink-0 lg:block">
            <div
              className={cn(
                "sticky rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900/50",
                "top-38",
              )}
            >
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Filters
              </h3>
              {isLoading ? (
                <div className="mt-4">
                  <ShopFilterSkeleton />
                </div>
              ) : (
                <ShopFilterPanel
                  className="mt-4"
                  filterGroups={filterGroups}
                  draft={catalogDraftFilters}
                  onDraftChange={setDraftFilters}
                  onClear={clearDraft}
                  onApply={applyDraft}
                />
              )}
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {error ? (
              <div
                className="rounded-2xl border border-red-200/90 bg-red-50/80 px-6 py-12 text-center dark:border-red-900/50 dark:bg-red-950/30"
                role="alert"
              >
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Could not load templates
                </p>
                <p className="mt-2 text-sm text-red-700/90 dark:text-red-300/90">
                  {error}
                </p>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center gap-6">
                <LoadingSpinner label="Loading templates" />
                <div className="w-full">{gridSkeleton}</div>
              </div>
            ) : baseFiltered.length === 0 ? (
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
                  filterGroups={filterGroups}
                  draft={catalogDraftFilters}
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
