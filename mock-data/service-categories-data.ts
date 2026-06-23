export const categories = [
  {
    title: "Branding & Visual Identity",
    slug: "branding-visual-identity",
    tagline: "Identity systems that make your brand unmistakable.",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/88507498df3c2047a804f53ff310c763d35a7228%20(1).jpg",
  },
  {
    title: "Content Creation",
    slug: "content-creation",
    tagline: "Copy, visuals, and media that keep you publishing with purpose.",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/b72df1311aae253c6a82830d1df7b54ccf567fe0.jpg",
  },
  {
    title: "Web & Mobile Development",
    slug: "web-mobile-development",
    tagline: "Fast, modern sites and apps built to convert.",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/0598bb08693b596f79436327c0a4cdc9d8d5061a.jpg",
  },
  {
    title: "Social Media Management",
    slug: "social-media-management",
    tagline: "A consistent, on-brand presence your audience keeps coming back to.",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/ffbe39adb7cb65e2198621ca9fc8fab7974e0543%20(1).jpg",
  },
  {
    title: "Performance Marketing (Paid Ads)",
    slug: "performance-marketing",
    tagline: "Paid media structured to turn spend into measurable outcomes.",
    image:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/b95cb84d4fa291af30f0b5bea6a32196543a63b5.jpg",
  },
  {
    title: "Illustrated Art & Motion",
    slug: "illustrated-art-motion",
    tagline: "Illustration and animation that bring your story to life.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Videography & Photography",
    slug: "videography-photography",
    tagline: "Cinematic video and photography, from concept to final cut.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export type CategoryItem = (typeof categories)[number];

export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return categories.find((category) => category.slug === slug);
}

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
      "We build cohesive brand identities that make your brand recognizable, credible, and consistent across every touchpoint. Whether you're a startup starting from scratch or an established business planning a rebrand, we turn your positioning into a clear visual system.",
      "From logos and color palettes to typography and practical brand guidelines, every element aligns look, tone, and application with your goals, so your team can apply the brand with confidence and build long-term recall.",
    ],
    included: [
      "Logo design & brand marks",
      "Color palette & typography systems",
      "Brand guidelines & usage standards",
      "Social, web, and print-ready templates",
      "Brand strategy & positioning support",
      "Visual identity for e-commerce & digital platforms",
      "Rebranding & brand refresh packages",
      "Brand naming support (where needed)",
    ],
  },
  "Content Creation": {
    paragraphs: [
      "We deliver strategic copy, visuals, and media assets that support launches, campaigns, and a steady publishing rhythm. We shape messaging around your voice and objectives, whether engagement, education, or conversion, and format it for each channel.",
      "From concepts through production-ready deliverables, we organize content so your team can ship consistently. Ideal for brands that need reliable creative, social graphics, motion assets, and editorial frameworks.",
    ],
    included: [
      "Copywriting & narrative messaging",
      "Creative direction for photo & video",
      "Channel-specific formats (web, social, ads, email)",
      "Editorial frameworks & reusable content structures",
      "Social media content calendars & batch creation",
      "Motion graphics & short-form video assets",
      "Content repurposing strategies",
    ],
  },
  "Web & Mobile Development": {
    paragraphs: [
      "We design and build custom websites and high-converting landing pages that load fast, feel intuitive, and drive action. Our UI/UX and development process focuses on performance, clarity, accessibility, and measurable growth.",
      "From full redesigns to SEO-ready content structures, we align engineering and design so your digital presence works harder, whether you need a startup site, an e-commerce experience, or a conversion-focused landing page.",
    ],
    included: [
      "Custom website design & development",
      "High-converting landing pages",
      "UX/UI design & user research",
      "SEO-ready content structure & on-page optimization",
      "Mobile-first responsive experiences",
      "Website redesign services",
      "Conversion-focused web design",
      "Ongoing support & optimization",
    ],
  },
  "Social Media Management": {
    paragraphs: [
      "We build a consistent, on-brand social presence that keeps your audience engaged and reinforces your positioning over time. We plan calendars, adapt creative for each platform, and balance evergreen content with timely moments so feeds feel native and professional.",
      "Reporting and iteration highlight what resonates, so we can refine creative and cadence and help your social efforts compound, giving you reliable social design, content, and growth without the internal overhead.",
    ],
    included: [
      "Account setup, optimization & strategy",
      "Content calendars & scheduling",
      "Platform-native creative (graphics, Reels, carousels)",
      "Community engagement support",
      "Performance summaries & optimization recommendations",
      "Influencer partnership coordination (as needed)",
      "Monthly social media design packages",
    ],
  },
  "Performance Marketing (Paid Ads)": {
    paragraphs: [
      "We create ad creative and manage paid campaigns built to reach the right audiences, validate creative, and improve efficiency. We align account structure, targeting, and bidding with clear goals like leads, revenue, or awareness, so your budget maps to outcomes.",
      "Ongoing testing, conversion optimization, and transparent reporting keep budgets accountable and decisions data-led. Ideal for e-commerce brands, startups, and businesses running Facebook, Instagram, and Google campaigns.",
    ],
    included: [
      "Campaign strategy & account setup",
      "Audience targeting & funnel mapping",
      "High-converting ad creative design & production",
      "Creative testing & iteration",
      "Conversion tracking, measurement & reporting",
      "Facebook & Instagram ad creative packages",
      "Performance marketing retainer options",
    ],
  },
  "Illustrated Art & Motion": {
    paragraphs: [
      "We create custom illustrations, motion graphics, and animated videos that bring stories to life. As an illustration and motion studio, we produce visuals for short films, music videos, entertainment projects, PSAs, brand campaigns, and digital content.",
      "From concept art and storyboarding to full 2D animation and polished motion design, our work adds emotional depth and visual polish that helps brands and creators stand out.",
    ],
    included: [
      "Custom illustrations & character design",
      "Storyboarding & concept art",
      "2D animation & motion graphics",
      "Animated title sequences & explainers",
      "Motion design for music videos & short films",
      "PSA & entertainment visual assets",
      "Brand motion systems & animated logos",
      "Social-first motion graphics packages",
    ],
  },
  "Videography & Photography": {
    paragraphs: [
      "We're a video production team delivering end-to-end videography and photography. From brand and corporate videos to short films, podcasts, YouTube content, vlogs, event coverage, and commercial shoots, we handle every stage with cinematic quality and a storytelling focus.",
      "Our team manages pre-production, shooting, directing, editing, color grading, and post-production, so you receive polished, platform-ready video and photo assets that elevate your brand.",
    ],
    included: [
      "Pre-production planning, scripting & storyboarding",
      "On-location & studio videography",
      "Video editing, color grading & sound design",
      "Motion graphics & animation integration",
      "Commercial photography & brand photo shoots",
      "Event videography & photography packages",
      "YouTube, vlog & podcast video production",
      "Short film & music video support",
      "Explainer video & brand video packages",
    ],
  },
};
