"use client";

import { motion } from "framer-motion";

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

export function CategoryGallery({ title, images }: CategoryGalleryProps) {
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
            isSingle
              ? "mt-10"
              : "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          }
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {images.map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              variants={gridItem}
              className="group overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
