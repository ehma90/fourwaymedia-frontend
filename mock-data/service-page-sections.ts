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
      "https://res.cloudinary.com/drrluhcad/image/upload/v1782339518/img1_mf93wi.png",
      "https://res.cloudinary.com/drrluhcad/image/upload/v1782339516/img3_d2t3nf.png",
      "https://res.cloudinary.com/drrluhcad/image/upload/v1782339514/img2_msh9bs.png"
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
      "https://ik.imagekit.io/szglholrw/Social%20Media/SA4.jpg?updatedAt=1769031668996",
      "https://ik.imagekit.io/szglholrw/Social%20Media/Costa%202.jpg?updatedAt=1769031709581",
      "https://ik.imagekit.io/szglholrw/Social%20Media/M5.jpg?updatedAt=1769031710953",
      "https://ik.imagekit.io/szglholrw/Social%20Media/Hos%203.jpg?updatedAt=1769031701932",
      "https://ik.imagekit.io/szglholrw/Social%20Media/Hos%205.jpg?updatedAt=1769031708413",
      "https://ik.imagekit.io/szglholrw/Social%20Media/Hos%202.jpg?updatedAt=1769031695833"
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
  {
    title: "Illustrated Art & Motion",
    bullets:
      "Custom illustration • Concept art • Storyboarding • 2D animation • Motion graphics • Animated logos • Explainer videos",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "Videography & Photography",
    bullets:
      "Brand & corporate video • Short films • Event coverage • Commercial photography • Editing & color grading • Podcast & YouTube production",
    images: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    ],
  },
] as const;

export type ServicePageSection = (typeof servicePageSections)[number];

export function getSectionByTitle(
  title: string,
): ServicePageSection | undefined {
  return servicePageSections.find((section) => section.title === title);
}
