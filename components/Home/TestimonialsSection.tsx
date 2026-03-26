"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { testimonials } from "@/mock-data/testimonials";

const easeOut = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export function TestimonialsSection() {
  return (
    <section
      className="relative overflow-x-hidden border-t border-copy-body/15 bg-background py-16 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <h2
            id="testimonials-heading"
            className="text-3xl font-semibold tracking-tight text-copy-primary sm:text-4xl"
          >
            What clients say
          </h2>
          <p className="mt-3 text-base leading-relaxed text-copy-body sm:text-lg">
            Real feedback from teams we&apos;ve partnered with on strategy,
            creative, and campaigns.
          </p>
        </motion.div>

        <motion.ul
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {testimonials.map((t) => (
            <motion.li
              key={t.id}
              variants={cardVariants}
              className="flex h-full flex-col rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-neutral-900/60 dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)] sm:p-7"
            >
              <Quote
                className="h-9 w-9 shrink-0 text-[#DC4437]/90 dark:text-[#FEC107]/90"
                strokeWidth={1.25}
                aria-hidden
              />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 border-t border-neutral-200/80 pt-5 dark:border-white/10">
                <p className="font-semibold text-neutral-950 dark:text-white">
                  {t.name}
                </p>
                <p className="mt-0.5 text-sm text-copy-body">
                  {t.role}, {t.company}
                </p>
              </footer>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
