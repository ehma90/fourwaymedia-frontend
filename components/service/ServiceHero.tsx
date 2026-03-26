"use client";

import { motion } from "framer-motion";

const SERVICE_HERO_IMAGE =
  "https://ik.imagekit.io/vp72mg6kz/service-page/lukas-muller-ONZG-HRGKNQ-unsplash.jpg";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function ServiceHero() {
  return (
    <section
      className="relative -mt-24 overflow-hidden border-b border-white/10"
      aria-labelledby="service-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.img
          src={SERVICE_HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover object-center"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: easeOut }}
        />
        <div
          className="absolute inset-0 bg-black/75 dark:bg-black/75"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(75vh,700px)] max-w-6xl flex-col items-center justify-center px-6 pb-20 pt-32 text-center sm:pb-28 sm:pt-36 md:pt-40">
        <motion.h1
          id="service-hero-heading"
          className="max-w-4xl font-[family-name:var(--font-lexend),system-ui,sans-serif] text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: easeOut }}
        >
          Everything You Need to <br /> Launch and Grow
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white sm:mt-8 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: easeOut }}
        >
          Strategy, design, development, and ads built into one connected system.
        </motion.p>
      </div>
    </section>
  );
}
