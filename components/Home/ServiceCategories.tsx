"use client";

import { useCallback, useState } from "react";

import { categories, type CategoryItem } from "@/mock-data/service-categories-data";
import { ServiceCategoryModal } from "@/components/Home/ServiceCategoryModal";

function CategoryCard({
  item,
  instanceId,
  onSelect,
  decorative,
}: {
  item: CategoryItem;
  instanceId: string;
  onSelect?: (item: CategoryItem) => void;
  /** Second copy in the infinite loop: still hoverable / clickable visually, hidden from AT */
  decorative?: boolean;
}) {
  return (
    <button
      type="button"
      id={decorative ? undefined : instanceId}
      tabIndex={decorative ? -1 : undefined}
      aria-hidden={decorative ? true : undefined}
      onClick={() => onSelect?.(item)}
      className="service-category-card group relative flex h-full w-[min(85vw,300px)] shrink-0 flex-col overflow-hidden rounded-2xl text-left shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] outline-none transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-[#FEC107]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-[420px] cursor-pointer"
      aria-label={
        decorative ? undefined : `${item.title}. Open details.`
      }
    >
      <div className="relative aspect-4/3 min-h-96 overflow-hidden">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 to-transparent"
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <span className="text-lg font-semibold leading-snug text-copy-primary sm:text-xl">
          {item.title}
        </span>

      </div>
    </button>
  );
}

type ServiceCategoriesProps = {
  /** Optional hook e.g. analytics; modal still opens on card click */
  onCategoryClick?: (item: CategoryItem) => void;
};

export function ServiceCategories({ onCategoryClick }: ServiceCategoriesProps) {
  const [modalItem, setModalItem] = useState<CategoryItem | null>(null);

  const handleCategoryClick = useCallback(
    (item: CategoryItem) => {
      onCategoryClick?.(item);
      setModalItem(item);
    },
    [onCategoryClick],
  );

  const closeModal = useCallback(() => setModalItem(null), []);

  return (
    <section
      className="relative overflow-x-hidden border-t border-copy-body/15 py-16 sm:py-24"
      aria-labelledby="service-categories-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="service-categories-heading"
            className="text-3xl font-semibold tracking-tight text-copy-primary sm:text-4xl"
          >
            Service categories
          </h2>
          <p className="mt-3 text-base leading-relaxed text-copy-body sm:text-lg">
            Strategy through production—pick what you need or bundle for full
            creative support.
          </p>
        </div>
      </div>

      {/* Full-bleed marquee (avoids clipping inside max-w container) */}
      <div
        className="service-marquee-viewport relative mt-12 w-screen max-w-[100vw] -translate-x-1/2 left-1/2 overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
        role="region"
        aria-label="Service categories"
      >
        <div className="service-marquee-track gap-6 py-1">
          {categories.map((item, index) => (
            <CategoryCard
              key={`${item.title}-a`}
              item={item}
              instanceId={`service-category-${index}`}
              onSelect={handleCategoryClick}
            />
          ))}
          {categories.map((item, index) => (
            <CategoryCard
              key={`${item.title}-b`}
              item={item}
              instanceId={`service-category-clone-${index}`}
              onSelect={handleCategoryClick}
              decorative
            />
          ))}
        </div>
      </div>

      <ServiceCategoryModal item={modalItem} onClose={closeModal} />
    </section>
  );
}
