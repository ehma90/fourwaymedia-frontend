export type ShopTopCategoryId = "all" | "social" | "promo" | "corporate";

export type FilterOption = { value: string; label: string };

export type FilterGroup = {
  id: string;
  label: string;
  options: readonly FilterOption[];
};

export type ShopTemplate = {
  id: string;
  title: string;
  image: string;
  categoryId: Exclude<ShopTopCategoryId, "all">;
  format: "mp4" | "mov" | "aep";
  aspectRatio: "16-9" | "9-16" | "1-1";
  duration: "15s" | "30s" | "60s";
  cardBlurb: string;
  paragraphs: string[];
  included: string[];
  priceLabel: string;
  priceCents?: number;
  currency?: string;
};

export type ShopTopCategory = { id: ShopTopCategoryId; label: string };

export type ShopCatalogResponse = {
  topCategories: ShopTopCategory[];
  filterGroups: FilterGroup[];
  templates: ShopTemplate[];
};

export type AppliedFilters = Record<string, string[]>;
