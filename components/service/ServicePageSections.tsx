"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

import { ServiceCategoryModal } from "@/components/Home/ServiceCategoryModal";
import { categories, type CategoryItem } from "@/mock-data/service-categories-data";
import {
  servicePageSections,
  type ServicePageSection,
} from "@/mock-data/service-page-sections";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

function categoryByTitle(title: string): CategoryItem | undefined {
  return categories.find((c) => c.title === title);
}

function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src) || /\/video\//i.test(src);
}

function getAspectClass(count: number): string {
  if (count === 3) return "aspect-square w-full overflow-hidden";
  if (count === 2) return "aspect-video w-full overflow-hidden md:aspect-4/3";
  return "aspect-video w-full overflow-hidden md:aspect-21/9";
}

function ServiceMediaButton({
  src,
  sectionTitle,
  aspectClass,
  onOpen,
  className,
}: {
  src: string;
  sectionTitle: string;
  aspectClass: string;
  onOpen: () => void;
  className?: string;
}) {
  const mediaClassName =
    "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]";

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-black/10 bg-white text-left shadow-sm outline-none transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] focus-visible:ring-2 focus-visible:ring-[#FEC107]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-neutral-900/50 dark:shadow-none dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)] sm:rounded-2xl",
        className,
      )}
      aria-label={`${sectionTitle}. View details.`}
    >
      <div className={aspectClass}>
        {isVideoSrc(src) ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={mediaClassName}
            aria-hidden
          />
        ) : (
          <img src={src} alt="" className={mediaClassName} />
        )}
      </div>
    </button>
  );
}

function ServiceSectionGallery({
  section,
  onOpenSection,
}: {
  section: ServicePageSection;
  onOpenSection: (title: string) => void;
}) {
  const imageCount = section.images.length;
  const aspectClass = getAspectClass(imageCount);
  const openSection = () => onOpenSection(section.title);

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  if (imageCount === 1) {
    return (
      <div className="mt-8">
        <ServiceMediaButton
          src={section.images[0]}
          sectionTitle={section.title}
          aspectClass={aspectClass}
          onOpen={openSection}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <>
      <div className="relative mt-8 md:hidden">
        <div
          className="overflow-hidden [mask-image:linear-gradient(to_right,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,black_92%,transparent)]"
          ref={emblaRef}
        >
          <div className="flex gap-4">
            {section.images.map((src, index) => (
              <div
                key={`${section.title}-mobile-${index}`}
                className="min-w-0 shrink-0 basis-[85vw] max-w-[320px]"
              >
                <ServiceMediaButton
                  src={src}
                  sectionTitle={section.title}
                  aspectClass="aspect-video w-full overflow-hidden"
                  onOpen={openSection}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mt-8 hidden gap-4 md:grid md:gap-5",
          imageCount === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
        )}
      >
        {section.images.map((src, index) => (
          <ServiceMediaButton
            key={`${section.title}-desktop-${index}`}
            src={src}
            sectionTitle={section.title}
            aspectClass={aspectClass}
            onOpen={openSection}
            className="w-full"
          />
        ))}
      </div>
    </>
  );
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
      className="border-t border-black/10 bg-background py-16 dark:border-white/10 sm:py-24"
      aria-labelledby="service-offerings-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="service-offerings-heading" className="sr-only">
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
              transition={{
                duration: 0.5,
                delay: 0.05 * sectionIndex,
                ease: easeOut,
              }}
            >
              <h3
                onClick={() => openModalForTitle(section.title)}
                className="cursor-pointer text-2xl font-bold tracking-tight text-copy-primary underline sm:text-3xl md:text-[2rem]"
              >
                {section.title}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-copy-body sm:text-base">
                {section.bullets}
              </p>

              <ServiceSectionGallery
                section={section}
                onOpenSection={openModalForTitle}
              />
            </motion.article>
          ))}
        </div>
      </div>

      <ServiceCategoryModal item={modalItem} onClose={closeModal} />
    </section>
  );
}
