export type PricingPlanId = "free" | "premium";

export type PricingPlan = {
  id: PricingPlanId;
  name: string;
  price: string;
  pricePeriod: string;
  tagline: string;
  bullets: string[];
  ctaLabel: string;
  badge?: string;
  priceNote?: string;
};

export const pricingModalCopy = {
  title: "Simple plans, serious templates",
  subtitle:
    "Lightweight templates built for speed, easier to use than bloated motion and video packs, without sacrificing quality.",
} as const;

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    pricePeriod: "",
    tagline: "Start creating with our free essentials",
    bullets: [
      "Handpicked free templates across Motion, Design & Video",
      "Clean structure - No maze of precomps",
      "Community support",
      "New free drops over time",
    ],
    ctaLabel: "Start free",
  },
  {
    id: "premium",
    name: "Premium",
    price: "$6.99",
    pricePeriod: "/month",
    tagline: "The full library, Light files, Zero busywork",
    bullets: [
      "Lighter projects than typical marketplace templates, Open faster, Edit faster",
      "Premium only motion, design & video templates",
      "Streamlined setups so you're not fighting the file",
      "Regular updates as we ship improvements.",
      "Priority support when you're stuck.",
    ],
    ctaLabel: "Go Premium",
    badge: "Most popular",
    priceNote: "Built to feel effortless compared to heavy template packs.",
  },
];
