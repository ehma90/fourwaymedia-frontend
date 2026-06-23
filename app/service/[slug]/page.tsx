import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { CategoryCTA } from "@/components/service/CategoryCTA";
import { CategoryGallery } from "@/components/service/CategoryGallery";
import { CategoryOverview } from "@/components/service/CategoryOverview";
import { RelatedServices } from "@/components/service/RelatedServices";
import { ShopHero } from "@/components/shop/ShopHero";
import {
  categories,
  getCategoryBySlug,
  serviceCategoryDetails,
} from "@/mock-data/service-categories-data";
import { getSectionByTitle } from "@/mock-data/service-page-sections";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Service not found | Fourway Media" };
  }

  return {
    title: `${category.title} | Fourway Media`,
    description: category.tagline,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const detail = serviceCategoryDetails[category.title];
  if (!detail) notFound();

  const section = getSectionByTitle(category.title);
  const galleryImages = section?.images ?? [category.image];
  const related = categories.filter((item) => item.slug !== category.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ShopHero
        eyebrow="Service"
        title={category.title}
        description={category.tagline}
        image={category.image}
        imageAlt={category.title}
      />
      <CategoryOverview
        paragraphs={detail.paragraphs}
        included={detail.included}
      />
      <CategoryGallery title={category.title} images={galleryImages} />
      <RelatedServices items={related} />
      <CategoryCTA title={category.title} />
      <Footer />
    </div>
  );
}
