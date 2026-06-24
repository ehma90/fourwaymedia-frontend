"use client";

import { motion } from "framer-motion";

const FAQ_HERO_IMAGE =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function FaqHero() {
  return (
    <section
      className="relative -mt-24 overflow-hidden"
      aria-labelledby="faq-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.img
          src={FAQ_HERO_IMAGE}
          alt="FAQ Hero Image"
          className="h-full w-full object-cover object-center"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: easeOut }}
        />
        <div className="absolute inset-0 bg-black/70 dark:bg-black/70" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-6 pb-20 pt-32 text-center sm:pb-28 sm:pt-36 md:pt-40">
        <motion.p
          className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#FEC107]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          Got questions?
        </motion.p>
        <motion.h1
          id="faq-hero-heading"
          className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: easeOut }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-8 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: easeOut }}
        >
          Everything you need to know about working with Fourway Media, from our
          process and pricing to timelines and getting started.
        </motion.p>
      </div>
    </section>
  );
}
