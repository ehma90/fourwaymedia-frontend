"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5000;

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    title: "Curated templates",
    body: "Browse video and motion templates by format, style, and use case so you can find a strong starting point without digging through clutter.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    title: "Built for brands & creators",
    body: "Professional layouts and assets tuned for campaigns, social, and product launches consistent quality you can rely on.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    title: "Download-ready projects",
    body: "Get structured project files you can copy and paste, and export—without rebuilding everything from scratch.",
  },
] as const;

export function SignInShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      skipSnaps: false,
    },
    [],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [emblaApi]);

  return (
    <div
      className="relative flex w-full flex-1 flex-col items-center justify-center p-6 sm:p-8 lg:p-12"
      role="region"
      aria-roledescription="carousel"
      aria-label="Product highlights"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/40 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {SLIDES.map((slide) => (
              <div
                key={slide.title}
                className="min-w-0 shrink-0 grow-0 basis-full"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={slide.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-3 px-6 py-8 text-center sm:px-8">
                  <h2 className="text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl dark:text-white">
                    {slide.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-600 sm:text-[15px] dark:text-neutral-400">
                    {slide.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex items-center justify-center gap-2 px-6 pb-8"
          role="tablist"
          aria-label="Slide"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={selectedIndex === i}
              tabIndex={selectedIndex === i ? 0 : -1}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "transition-[width,background-color] duration-300",
                selectedIndex === i
                  ? "h-1.5 w-8 rounded-full bg-[#7c3aed]"
                  : "h-1.5 w-1.5 rounded-full bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
