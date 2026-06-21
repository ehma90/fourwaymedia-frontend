"use client";

import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const VALUES = [
  "Our clients trust us because we listen.",
  "We research before we create.",
  "We communicate clearly.",
  "We deliver professionally.",
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export function WhyTrustUs() {
  return (
    <section
      className="border-t border-neutral-200/90 bg-neutral-100 py-16 sm:py-24 dark:border-white/10 dark:bg-[#121212]"
      aria-labelledby="why-trust-heading"
    >
      <div className="mx-auto max-w-3xl px-6 font-[family-name:var(--font-lexend),system-ui,sans-serif]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dc4437]">
            Why Trust Us
          </p>
          <h2
            id="why-trust-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl md:text-[2.5rem] dark:text-white"
          >
            Because we care about your vision as much as the final deliverable
          </h2>
        </motion.div>

        <motion.div
          className="mt-8 space-y-5"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
        >
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            Anyone can create content.
          </p>
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            But great creative work begins with understanding people and their pain,
            understanding stories, and understanding why something matters.
          </p>
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            We combine creativity, strategy, communication, reliability, and
            craftsmanship to ensure every project receives the attention it deserves.
          </p>
        </motion.div>

        <motion.ul
          className="mt-8 space-y-3 border-l-2 border-[#dc4437]/30 pl-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {VALUES.map((value) => (
            <motion.li
              key={value}
              variants={itemVariants}
              className="text-base font-medium leading-relaxed text-neutral-800 sm:text-lg dark:text-neutral-200"
            >
              {value}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-8 space-y-5"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
        >
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            And we treat every project, whether large or small, as an opportunity to
            create something meaningful.
          </p>
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            Most importantly, we understand what it feels like to start with nothing but
            an idea.
          </p>
          <p className="text-base font-semibold leading-relaxed text-neutral-900 sm:text-lg dark:text-white">
            That&apos;s why we never take your vision for granted.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
