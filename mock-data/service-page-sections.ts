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
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    title: "Web & Mobile Development",
    bullets:
      "Website design & development • Landing pages • UX/UI design • SEO-ready content structure",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    title: "Content Creation",
    bullets:
      "Social media posts • Reels, TikToks, carousels • Graphic design • Motion graphics • Video production & editing",
    images: [
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7f119?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    title: "Social Media Management",
    bullets:
      "Account setup & optimization • Content calendars • Scheduling • Community management • Growth strategies • Influencer partnerships",
    images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e79e326f?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    title: "Performance Marketing (Paid Ads)",
    bullets:
      "Ad creatives • Campaign setup • Conversion optimization • Analytics-driven iteration",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    ],
  },
] as const;

export type ServicePageSection = (typeof servicePageSections)[number];
