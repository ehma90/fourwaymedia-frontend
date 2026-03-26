/**
 * Service page: vertical sections with one or more images per category.
 * Titles must match `categories` in service-categories-data for modal details.
 */
export const servicePageSections = [
  {
    title: "Branding & Visual Identity",
    bullets:
      "Logo design • Color systems • Typography • Brand guidelines • Creative direction • Rebranding / brand refresh • Visual systems",
    images: [
      "https://ik.imagekit.io/vp72mg6kz/service-page/f3c144330654faa0c8034e190c5ac3bb28c29cbe.jpg",
    ],
  },
  {
    title: "Web & Mobile Development",
    bullets:
      "Website design & development • Landing pages • UX/UI design • SEO-ready content structure",
    images: [
      "https://ik.imagekit.io/vp72mg6kz/service-page/3c526306e85104386467b4f8d18f5cb094436d5b.jpg?updatedAt=1774543640143",
      "https://ik.imagekit.io/vp72mg6kz/service-page/0598bb08693b596f79436327c0a4cdc9d8d5061a.jpg?updatedAt=1774543639902",
    ],
  },
  {
    title: "Content Creation",
    bullets:
      "Social media posts • Reels, TikToks, carousels • Graphic design • Motion graphics • Video production & editing",
    images: [
      "https://ik.imagekit.io/vp72mg6kz/Homepage/b72df1311aae253c6a82830d1df7b54ccf567fe0.jpg",
      "https://ik.imagekit.io/vp72mg6kz/service-page/f6bee7d2728a6eba1e19d448568d65e9c145335e.jpg?updatedAt=1774543696452",
      "https://ik.imagekit.io/vp72mg6kz/service-page/detail-co-L7KDJlvf_A0-unsplash.jpg",
    ],
  },
  {
    title: "Social Media Management",
    bullets:
      "Account setup & optimization • Content calendars • Scheduling • Community management • Growth strategies • Influencer partnerships",
    images: [
      "https://ik.imagekit.io/vp72mg6kz/Homepage/ffbe39adb7cb65e2198621ca9fc8fab7974e0543%20(1).jpg",
    ],
  },
  {
    title: "Performance Marketing (Paid Ads)",
    bullets:
      "Ad creatives • Campaign setup • Conversion optimization • Analytics-driven iteration",
    images: [
      "https://ik.imagekit.io/vp72mg6kz/Homepage/b95cb84d4fa291af30f0b5bea6a32196543a63b5.jpg",
    ],
  },
] as const;

export type ServicePageSection = (typeof servicePageSections)[number];
