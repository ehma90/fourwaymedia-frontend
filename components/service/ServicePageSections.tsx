"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";

import { ServiceCategoryModal } from "@/components/Home/ServiceCategoryModal";
import { categories, type CategoryItem } from "@/mock-data/service-categories-data";
import { servicePageSections } from "@/mock-data/service-page-sections";

const easeOut = [0.22, 1, 0.36, 1] as const;

function categoryByTitle(title: string): CategoryItem | undefined {
  return categories.find((c) => c.title === title);
}

export function ServicePageSections() {
  const [modalItem, setModalItem] = useState<CategoryItem | null>(null);
  const closeModal = useCallback(() => setModalItem(null), []);

  const openModalForTitle = (title: string) => {
    const item = categoryByTitle(title);
    if (item) setModalItem(item);
  };

  return (
    <section
      className="border-t border-white/10 bg-[#0D0D0D] py-16 sm:py-24"
      aria-labelledby="service-offerings-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="service-offerings-heading"
          className="sr-only"
        >
          Services
        </h2>

        <div className="flex flex-col gap-20 sm:gap-24">
          {servicePageSections.map((section, sectionIndex) => (
            <motion.article
              key={section.title}
              className="scroll-mt-28"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.05 * sectionIndex, ease: easeOut }}
            >
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-[2rem]">
                {section.title}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#A0A0A0] sm:text-base">
                {section.bullets}
              </p>

              <div
                className={
                  section.images.length === 1
                    ? "mt-8"
                    : section.images.length === 2
                      ? "mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
                      : "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4"
                }
              >
                {section.images.map((src, i) => {
                  const n = section.images.length;
                  const imgWrapClass =
                    n === 3
                      ? "aspect-square w-full overflow-hidden"
                      : n === 2
                        ? "aspect-video w-full overflow-hidden md:aspect-4/3"
                        : "aspect-video w-full overflow-hidden md:aspect-21/9";
                  return (
                  <button
                    key={`${section.title}-${i}`}
                    type="button"
                    onClick={() => openModalForTitle(section.title)}
                    className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 text-left outline-none transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-[#FEC107]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] sm:rounded-2xl"
                    aria-label={`${section.title}. View details.`}
                  >
                    <div className={imgWrapClass}>
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </button>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ServiceCategoryModal item={modalItem} onClose={closeModal} />
    </section>
  );
}
