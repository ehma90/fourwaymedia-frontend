"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const easeOut = [0.22, 1, 0.36, 1] as const;

const gridContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

type RelatedService = {
  title: string;
  slug: string;
  image: string;
};

type RelatedServicesProps = {
  items: readonly RelatedService[];
};

export function RelatedServices({ items }: RelatedServicesProps) {
  if (items.length === 0) return null;

  return (
    <section
      className="border-t border-neutral-200/80 bg-background py-16 sm:py-24 dark:border-white/10"
      aria-labelledby="related-services-heading"
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
            Keep exploring
          </p>
          <h2
            id="related-services-heading"
            className="mt-3 text-2xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-3xl md:text-[2rem] dark:text-white"
          >
            Other services
          </h2>
        </motion.div>

        <motion.ul
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {items.map((item) => (
            <motion.li key={item.slug} variants={gridItem}>
              <Link
                href={`/service/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC107]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
              >
                <div className="aspect-16/10 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-5 font-[family-name:var(--font-lexend),system-ui,sans-serif]">
                  <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                    {item.title}
                  </h3>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-neutral-400 transition-colors group-hover:text-[#dc4437] dark:text-neutral-500"
                    strokeWidth={1.75}
                  />
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
