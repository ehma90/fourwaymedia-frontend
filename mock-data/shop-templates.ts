// Top tabs: All + three verticals
export const shopTopCategories = [
  { id: "all", label: "All" },
  { id: "social", label: "Social" },
  { id: "promo", label: "Promo" },
  { id: "corporate", label: "Corporate" },
] as const;

export type ShopTopCategoryId = (typeof shopTopCategories)[number]["id"];

export type FilterOption = { value: string; label: string };

export type FilterGroup = {
  id: string;
  label: string;
  options: readonly FilterOption[];
};

export const shopFilterGroups: readonly FilterGroup[] = [
  {
    id: "format",
    label: "Format",
    options: [
      { value: "mp4", label: "MP4" },
      { value: "mov", label: "MOV" },
      { value: "aep", label: "After Effects" },
    ],
  },
  {
    id: "aspectRatio",
    label: "Aspect ratio",
    options: [
      { value: "16-9", label: "16:9" },
      { value: "9-16", label: "9:16" },
      { value: "1-1", label: "1:1" },
    ],
  },
  {
    id: "duration",
    label: "Duration",
    options: [
      { value: "15s", label: "Up to 15s" },
      { value: "30s", label: "Up to 30s" },
      { value: "60s", label: "Up to 60s" },
    ],
  },
] as const;

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
};

export const shopTemplates: readonly ShopTemplate[] = [
  {
    id: "neon-stories",
    title: "Neon Stories Pack",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Shop-page/59faa901a225424a491828f46193a9659a19495c.jpg",
    categoryId: "social",
    format: "mp4",
    aspectRatio: "9-16",
    duration: "15s",
    cardBlurb: "Bold vertical stories with neon accents and kinetic type.",
    paragraphs: [
      "A punchy vertical set built for Reels, Shorts, and Stories—neon gradients, quick cuts, and readable supers that stay on brand.",
      "Layers are organized for fast swaps: swap logo, palette, and end card without rebuilding the whole timeline.",
    ],
    included: [
      "9:16 master timeline",
      "Logo & text placeholders",
      "Color control layers",
      "Export presets (H.264)",
    ],
    priceLabel: "$29",
  },
  {
    id: "minimal-feed",
    title: "Minimal Feed Carousel",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Shop-page/03fc695abce42d5d29bb0f3c8d7420cebd6a706e.jpg",
    categoryId: "social",
    format: "mov",
    aspectRatio: "1-1",
    duration: "30s",
    cardBlurb: "Clean square posts with soft motion and editorial rhythm.",
    paragraphs: [
      "Square-first layouts that feel editorial—great for product drops, quotes, and carousel-style campaigns.",
      "Motion is restrained so photography and typography lead; swap assets and ship the same day.",
    ],
    included: [
      "1:1 compositions",
      "Modular scene blocks",
      "Safe-area guides",
      "Sound design stems (optional)",
    ],
    priceLabel: "$24",
  },
  {
    id: "launch-teaser",
    title: "Launch Teaser",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Shop-page/c1b75c31ebd04bf0665dda25b2e694624d078d52.jpg",
    categoryId: "promo",
    format: "mp4",
    aspectRatio: "16-9",
    duration: "60s",
    cardBlurb: "Cinematic widescreen build for product and event launches.",
    paragraphs: [
      "Hero pacing with impact beats for landing pages, paid social placements, and homepage heroes.",
      "Designed to scale from 15s cutdowns to full 60s narrative without losing clarity.",
    ],
    included: [
      "16:9 hero timeline",
      "Title toolkit",
      "LUT-friendly grade slots",
      "Cutdown markers",
    ],
    priceLabel: "$39",
  },
  {
    id: "brand-manifesto",
    title: "Brand Manifesto",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Shop-page/dba68237e2bc9efee7397709f1c844f30f8dc529.jpg",
    categoryId: "corporate",
    format: "aep",
    aspectRatio: "16-9",
    duration: "30s",
    cardBlurb: "Calm corporate motion with confident typography and space.",
    paragraphs: [
      "Board-ready tone: clear structure, generous whitespace, and messaging that reads in both meeting rooms and LinkedIn feeds.",
      "After Effects project with linked comps so brand teams can update copy in one place.",
    ],
    included: [
      "AE project file",
      "Font pairing notes",
      "Brand-safe lower thirds",
      "PDF quick-start",
    ],
    priceLabel: "$49",
  },
  {
    id: "sale-countdown",
    title: "Sale Countdown",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Shop-page/417ad27e01b494d669b6715568ab10f1974603a1.jpg",
    categoryId: "promo",
    format: "mp4",
    aspectRatio: "9-16",
    duration: "30s",
    cardBlurb: "High-energy promo blocks tuned for urgency and clarity.",
    paragraphs: [
      "Built for flash sales and seasonal pushes—countdown hooks, offer lines, and CTA frames that scan fast on mobile.",
      "Editable offer text and price slots with contrast-checked backgrounds.",
    ],
    included: [
      "9:16 + 1:1 variants",
      "Countdown module",
      "CTA end cards",
      "SFX hits (royalty-free)",
    ],
    priceLabel: "Free",
  },
  {
    id: "annual-report",
    title: "Annual Report Motion",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Shop-page/dbc4c811b023a4b014f6986c834f5cf515857cac.jpg",
    categoryId: "corporate",
    format: "mov",
    aspectRatio: "16-9",
    duration: "15s",
    cardBlurb: "Data-forward chapter opens with subtle chart motion.",
    paragraphs: [
      "Translate dry metrics into motion that still feels trustworthy—ideal for investor updates and internal town halls.",
      "Chart placeholders hook to simple value drivers; swap labels and re-time in minutes.",
    ],
    included: [
      "Data placeholder comps",
      "Chapter title cards",
      "Subtle grid motion",
      "VO-safe pacing",
    ],
    priceLabel: "$34",
  },
];

/** Selected values per filter group; empty array = no constraint for that group. */
export type AppliedFilters = Record<string, string[]>;

export function emptyAppliedFilters(): AppliedFilters {
  const out: AppliedFilters = {};
  for (const g of shopFilterGroups) {
    out[g.id] = [];
  }
  return out;
}

export function cloneAppliedFilters(source: AppliedFilters): AppliedFilters {
  const out = emptyAppliedFilters();
  for (const g of shopFilterGroups) {
    out[g.id] = [...(source[g.id] ?? [])];
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
): ShopTemplate[] {
  return templates.filter((t) => {
    if (activeCategoryId !== "all" && t.categoryId !== activeCategoryId) {
      return false;
    }

    for (const group of shopFilterGroups) {
      const selected = applied[group.id];
      if (!selected?.length) continue;

      const templateValue = templateFacetValue(t, group.id);
      if (templateValue === undefined) return false;
      const matches = selected.some((v) => v === templateValue);
      if (!matches) return false;
    }

    return true;
  });
}
