"use client";

const categories = [
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

type CategoryItem = (typeof categories)[number];

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
      className="service-category-card group relative flex h-full w-[min(85vw,300px)] shrink-0 flex-col overflow-hidden rounded-2xl border border-copy-body/15 bg-background/60 text-left shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] outline-none transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-[#FEC107]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-white/3 dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:w-[420px]"
      aria-label={
        decorative ? undefined : `${item.title}. Open details.`
      }
    >
      <div className="relative aspect-4/3 h-96 overflow-hidden">
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
        <span
          className="mt-auto h-px w-12 bg-linear-to-r from-[#DC4437] to-[#FEC107] opacity-90"
          aria-hidden
        />
      </div>
    </button>
  );
}

type ServiceCategoriesProps = {
  /** Wire this up when routes or modals are ready */
  onCategoryClick?: (item: CategoryItem) => void;
};

export function ServiceCategories({ onCategoryClick }: ServiceCategoriesProps) {
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
              onSelect={onCategoryClick}
            />
          ))}
          {categories.map((item, index) => (
            <CategoryCard
              key={`${item.title}-b`}
              item={item}
              instanceId={`service-category-clone-${index}`}
              onSelect={onCategoryClick}
              decorative
            />
          ))}
        </div>
      </div>
    </section>
  );
}
