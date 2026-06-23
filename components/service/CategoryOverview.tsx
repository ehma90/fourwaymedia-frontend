"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

type CategoryOverviewProps = {
  paragraphs: readonly string[];
  included: readonly string[];
};

export function CategoryOverview({ paragraphs, included }: CategoryOverviewProps) {
  return (
    <section
      className="border-t border-neutral-200/80 bg-background py-16 sm:py-24 dark:border-white/10"
      aria-labelledby="category-overview-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
        <motion.div
          className="min-w-0 font-[family-name:var(--font-lexend),system-ui,sans-serif]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dc4437]">
            Overview
          </p>
          <h2
            id="category-overview-heading"
            className="mt-3 text-2xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-3xl md:text-[2rem] dark:text-white"
          >
            What this service is about
          </h2>
          <div className="mt-6 space-y-4">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: easeOut }}
        >
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)] sm:p-8">
            <h3 className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-lg font-semibold text-neutral-950 dark:text-white">
              What&apos;s included
            </h3>
            <motion.ul
              className="mt-5 space-y-4"
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {included.map((line) => (
                <motion.li
                  key={line}
                  variants={listItem}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {line}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
