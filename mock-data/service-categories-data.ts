export const categories = [
  {
    title: "Branding & Visual Identity",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/88507498df3c2047a804f53ff310c763d35a7228%20(1).jpg",
  },
  {
    title: "Content Creation",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/b72df1311aae253c6a82830d1df7b54ccf567fe0.jpg",
  },
  {
    title: "Web & Mobile Development",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/0598bb08693b596f79436327c0a4cdc9d8d5061a.jpg",
  },
  {
    title: "Social Media Management",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/ffbe39adb7cb65e2198621ca9fc8fab7974e0543%20(1).jpg",
  },
  {
    title: "Performance Marketing (Paid Ads)",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/b95cb84d4fa291af30f0b5bea6a32196543a63b5.jpg",
  },
] as const;

export type CategoryItem = (typeof categories)[number];

export type ServiceCategoryDetail = {
  paragraphs: string[];
  included: string[];
};

export const serviceCategoryDetails: Record<
  CategoryItem["title"],
  ServiceCategoryDetail
> = {
  "Branding & Visual Identity": {
    paragraphs: [
      "Cohesive visual systems that make your brand recognizable, credible, and consistent across every touchpoint.",
      "We translate strategy into logos, color, typography, and practical rules your team can apply with confidence—so every execution feels unmistakably yours.",
      "From first impression to long-term recall, identity work aligns look, tone, and application with your business and growth goals.",
    ],
    included: [
      "Logo design & brand marks",
      "Color palette & typography system",
      "Brand guidelines & usage standards",
      "Social, web, and print-ready templates",
    ],
  },
  "Content Creation": {
    paragraphs: [
      "Strategic copy, visuals, and media assets that support launches, campaigns, and a steady publishing rhythm.",
      "We shape messaging for your voice and objectives—whether the goal is engagement, education, or conversion—and format work for each channel’s norms.",
      "From concepts through production-ready deliverables, content is organized so your team can ship consistently without reinventing the process every time.",
    ],
    included: [
      "Copywriting & narrative messaging",
      "Creative direction for photo and video",
      "Channel-specific formats (web, social, ads)",
      "Editorial frameworks & reusable content structures",
    ],
  },
  "Web & Mobile Development": {
    paragraphs: [
      "Professional websites and mobile experiences designed for performance, clarity, and conversion.",
      "We build clean, modern interfaces that load quickly, feel intuitive, and guide visitors toward clear actions with minimal friction.",
      "From full sites to focused landing pages, engineering and design stay aligned with usability, accessibility, and measurable growth.",
    ],
    included: [
      "Website design & development",
      "High-converting landing pages",
      "UX/UI design",
      "SEO-ready content structure",
    ],
  },
  "Social Media Management": {
    paragraphs: [
      "A consistent, on-brand presence that keeps your audience engaged and reinforces positioning over time.",
      "We plan calendars, adapt creative for each platform, and balance evergreen content with timely moments—so feeds feel native, not generic.",
      "Reporting and iteration highlight what resonates, informing creative and cadence so effort compounds instead of stalling.",
    ],
    included: [
      "Content planning & publishing workflows",
      "Platform-native creative adaptation",
      "Community engagement support (as needed)",
      "Performance summaries & optimization recommendations",
    ],
  },
  "Performance Marketing (Paid Ads)": {
    paragraphs: [
      "Paid media structured to reach the right audiences, validate creative, and improve efficiency as campaigns mature.",
      "We align account structure, targeting, and bidding with clear goals—leads, revenue, or awareness—so spend maps to outcomes, not vanity metrics.",
      "Ongoing testing, conversion hygiene, and transparent reporting keep budgets accountable and decisions data-led.",
    ],
    included: [
      "Campaign strategy & account setup",
      "Audience targeting & funnel mapping",
      "Creative testing & iteration",
      "Conversion tracking, measurement, and reporting",
    ],
  },
};
