"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

const easeOut = [0.22, 1, 0.36, 1] as const;

function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src) || /\/video\//i.test(src);
}

const gridContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

type CategoryGalleryProps = {
  title: string;
  images: readonly string[];
};

function GalleryLightbox({
  images,
  title,
  index,
  onClose,
  onNavigate,
}: {
  images: readonly string[];
  title: string;
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const hasMultiple = images.length > 1;
  const src = images[index];

  const goPrev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate],
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasMultiple) goPrev();
      else if (e.key === "ArrowRight" && hasMultiple) goNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, goPrev, goNext, hasMultiple]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} preview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        aria-label="Close preview"
        className="absolute inset-0 bg-black/80 backdrop-blur-[6px] [-webkit-backdrop-filter:blur(6px)]"
        onClick={onClose}
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </button>

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-5"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-5"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </button>
        </>
      ) : null}

      <motion.div
        key={src}
        className="relative z-[1] flex max-h-[88vh] w-full max-w-5xl items-center justify-center"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: easeOut }}
        onClick={(e) => e.stopPropagation()}
      >
        {isVideoSrc(src) ? (
          <video
            src={src}
            controls
            autoPlay
            loop
            playsInline
            className="max-h-[88vh] w-auto max-w-full rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          />
        ) : (
          <img
            src={src}
            alt={`${title} preview`}
            className="max-h-[88vh] w-auto max-w-full rounded-xl object-contain shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          />
        )}
      </motion.div>

      {hasMultiple ? (
        <p className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
          {index + 1} / {images.length}
        </p>
      ) : null}
    </motion.div>,
    document.body,
  );
}

export function CategoryGallery({ title, images }: CategoryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  if (images.length === 0) return null;

  const isSingle = images.length === 1;

  return (
    <section
      className="border-t border-neutral-200/80 bg-neutral-100 py-16 sm:py-24 dark:border-white/10 dark:bg-[#121212]"
      aria-labelledby="category-gallery-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="font-[family-name:var(--font-lexend),system-ui,sans-serif]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dc4437]">
            Selected work
          </p>
          <h2
            id="category-gallery-heading"
            className="mt-3 text-2xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-3xl md:text-[2rem] dark:text-white"
          >
            {title} in action
          </h2>
        </motion.div>

        <motion.div
          className={
            isSingle ? "mt-10" : "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          }
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {images.map((src, index) => (
            <motion.button
              key={`${src}-${index}`}
              type="button"
              variants={gridItem}
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${title} preview ${index + 1}`}
              className="group relative block cursor-zoom-in overflow-hidden rounded-2xl border border-neutral-200/90 bg-white text-left shadow-[0_8px_30px_rgba(0,0,0,0.05)] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#FEC107]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)] dark:focus-visible:ring-offset-[#121212]"
            >
              <div
                className={
                  isSingle
                    ? "aspect-video w-full overflow-hidden lg:aspect-21/9"
                    : "aspect-4/3 w-full overflow-hidden"
                }
              >
                {isVideoSrc(src) ? (
                  <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    aria-hidden
                  />
                ) : (
                  <img
                    src={src}
                    alt={`${title} in action`}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                )}
              </div>

              <span
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100"
                aria-hidden
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg">
                  <Maximize2 className="h-5 w-5" strokeWidth={1.75} />
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <GalleryLightbox
            images={images}
            title={title}
            index={activeIndex}
            onClose={closeLightbox}
            onNavigate={setActiveIndex}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
