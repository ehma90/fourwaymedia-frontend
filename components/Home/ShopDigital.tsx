"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";

/** Placeholder marketplace visuals — swap URLs when final assets are ready */
const MARKETPLACE_SLIDES = [
  {
    src: "https://ik.imagekit.io/vp72mg6kz/Homepage/ff3db51ebb7041f19386395e394515c9299a8b3a.png",
    alt: "Template with warm tones and typography",
  },
  {
    src: "https://ik.imagekit.io/vp72mg6kz/Homepage/72e6f08be6a6c56b05def63096110a3dd1c66bf8.jpg",
    alt: "Creative layout mockup",
  },
  {
    src: "https://ik.imagekit.io/vp72mg6kz/Homepage/0a1850f1617c2e0d083a0a6ae9643a1a8f7c563a.jpg",
    alt: "Social Media Post",
  },

] as const;

export function ShopDigital() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      dragFree: false,
      skipSnaps: false,
    },
    [],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setSnapCount(emblaApi.scrollSnapList().length);
    };

    emblaApi.on("reInit", sync);
    emblaApi.on("select", sync);

    const frame = requestAnimationFrame(sync);

    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("reInit", sync);
      emblaApi.off("select", sync);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <section
      className="relative overflow-x-hidden py-16 sm:py-24"
      aria-labelledby="shop-digital-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* Copy + CTA */}
          <div className="max-w-xl">
            <h2
              id="shop-digital-heading"
              className="text-3xl font-semibold tracking-tight text-copy-primary sm:text-4xl"
            >
              Shop Digital Assets
            </h2>
            <p className="mt-4 text-base leading-relaxed text-copy-body sm:text-lg">
              Production-ready templates and creative assets, built for
              real-world use.
            </p>
            <Link href="/shop">
              <Button
                variant="primary"
                className="mt-8 inline-flex h-11 min-w-[140px] bg-[linear-gradient(160deg,#DC4437_15%,#FEC107_100%)] px-5 py-2 text-sm font-medium text-white shadow-[0_10px_22px_rgba(220,68,55,0.35)] md:h-14 md:min-w-[180px] md:px-8 md:py-3 md:text-base"
              >
                Shop Now
              </Button>
            </Link>
          </div>

          {/* Carousel — gradient frame, glow from top-left */}
          <div className="relative min-w-0">
            <div
              className="rounded-2xl p-px shadow-[0_0_0_1px_rgba(220,68,55,0.12)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(220,68,55,0.85) 0%, rgba(254,193,7,0.35) 18%, rgba(40,30,27,0) 55%, rgba(40,30,27,0) 100%)",
              }}
            >
              <div className="relative overflow-hidden rounded-[0.9375rem] bg-[#1a1a1a] px-3 pb-10 pt-4 sm:px-5 sm:pb-11 sm:pt-5">
                <button
                  type="button"
                  onClick={scrollPrev}
                  className="absolute left-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC107]/50 sm:left-2"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  className="absolute right-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC107]/50 sm:right-2"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={2} />
                </button>

                <div ref={emblaRef} className="overflow-hidden pl-9 pr-9 sm:pl-11 sm:pr-11">

                  <div className="flex touch-pan-y">
                    {MARKETPLACE_SLIDES.map((slide) => (
                      <div
                        key={slide.src}
                        className="min-w-0 shrink-0 grow-0 basis-[78%] max-w-80 w-full px-4"
                      >
                        <div className="overflow-hidden rounded-2xl bg-zinc-900/50 ring-1 ring-white/10">
                          <img
                            src={slide.src}
                            alt={slide.alt}
                            className="aspect-3/4 w-full object-cover sm:aspect-4/5 min-h-72 lg:min-h-96 "
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 sm:bottom-4"
                  role="tablist"
                  aria-label="Carousel slides"
                >
                  {Array.from({ length: Math.max(snapCount, 1) }).map(
                    (_, index) => {
                      const isActive = index === selectedIndex;
                      return (
                        <button
                          key={index}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-label={`Go to slide ${index + 1}`}
                          onClick={() => scrollTo(index)}
                          className={
                            isActive
                              ? "h-2.5 w-2.5 rounded-full bg-[#E65141] transition-transform"
                              : "h-2.5 w-2.5 rounded-full border border-white/80 bg-transparent transition-colors hover:border-white"
                          }
                        />
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
