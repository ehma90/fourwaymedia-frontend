"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ACCENT = "#06A121";

const JOBS = [
  {
    title: "Staff Accountant",
    locations:
      "San Francisco, Chicago, Los Angeles, Dallas, Sao Paulo, New York",
  },
  {
    title: "Account Manager",
    locations: "Berlin",
  },
  {
    title: "Product Designer",
    locations:
      "New York, Boston, Hong Kong, Atlanta, Chicago, San Francisco",
  },
  {
    title: "Market Director",
    locations: "Miami, California, New Jersey",
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export function WereHiring() {
  return (
    <section
      className="border-t border-neutral-200/90 bg-[#f4f4f2] py-16 sm:py-24 dark:border-white/10 dark:bg-[#1a1a1a]"
      aria-labelledby="were-hiring-heading"
    >
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <h2
            id="were-hiring-heading"
            className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.5rem]"
          >
            <span className="text-neutral-900 dark:text-white">We&apos;re </span>
            <span className="relative inline-block" style={{ color: ACCENT }}>
              Hiring!
              <motion.span
                className="absolute -bottom-1 left-1/2 block h-0.5 w-full max-w-12 -translate-x-1/2 rounded-full sm:-bottom-1.5 sm:h-0.5"
                style={{ backgroundColor: ACCENT, transformOrigin: "center" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12, ease: easeOut }}
                aria-hidden
              />
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400">
            Be part of a growing team where your skills are valued and your ideas
            make a difference.
          </p>
        </motion.div>

        <motion.ul
          className="mt-12 divide-y divide-neutral-200/90 dark:divide-white/10"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {JOBS.map((job) => (
            <motion.li
              key={job.title}
              variants={listItem}
              className="flex flex-col gap-4 py-7 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-8"
            >
              <div className="min-w-0 text-left">
                <h3 className="text-lg font-semibold text-neutral-950 dark:text-white">
                  {job.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  <span className="font-medium text-neutral-500 dark:text-neutral-500">
                    Locations:
                  </span>{" "}
                  {job.locations}
                </p>
              </div>
              <motion.div className="shrink-0 sm:ml-4" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border-2 border-[#06A121] bg-transparent px-6 py-2.5 text-sm font-semibold text-[#06A121] transition-colors hover:bg-[#06A121] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06A121]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f4f2] dark:focus-visible:ring-offset-[#1a1a1a]"
                >
                  Apply
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
