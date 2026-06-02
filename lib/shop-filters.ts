import type {
  AppliedFilters,
  FilterGroup,
  ShopTemplate,
  ShopTopCategoryId,
} from "@/lib/types/shop";

export function emptyAppliedFilters(groups: readonly FilterGroup[]): AppliedFilters {
  const out: AppliedFilters = {};
  for (const g of groups) {
    out[g.id] = [];
  }
  return out;
}

export function cloneAppliedFilters(source: AppliedFilters): AppliedFilters {
  const out: AppliedFilters = {};
  for (const key of Object.keys(source)) {
    out[key] = [...(source[key] ?? [])];
  }
  return out;
}

function templateFacetValue(
  template: ShopTemplate,
  groupId: string,
): string | undefined {
  switch (groupId) {
    case "format":
      return template.format;
    case "aspectRatio":
      return template.aspectRatio;
    case "duration":
      return template.duration;
    default:
      return undefined;
  }
}

export function filterShopTemplates(
  templates: readonly ShopTemplate[],
  activeCategoryId: ShopTopCategoryId,
  applied: AppliedFilters,
  filterGroups: readonly FilterGroup[],
): ShopTemplate[] {
  return templates.filter((t) => {
    if (activeCategoryId !== "all" && t.categoryId !== activeCategoryId) {
      return false;
    }

    for (const group of filterGroups) {
      const selected = applied[group.id];
      if (!selected?.length) continue;

      const templateValue = templateFacetValue(t, group.id);
      if (templateValue === undefined) return false;
      if (!selected.some((v) => v === templateValue)) return false;
    }

    return true;
  });
}
