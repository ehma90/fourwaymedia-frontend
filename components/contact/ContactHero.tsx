"use client";

import { motion } from "framer-motion";

/** Dark abstract 3D-style render — Unsplash */
const CONTACT_HERO_IMAGE =
  "https://ik.imagekit.io/vp72mg6kz/Shop-page/6c052bfd8b5aad1bfe27102ae1f53b890c20b88c.jpg";

const easeOut = [0.22, 1, 0.36, 1] as const;

const ACCENT = "#FEC107";

export function ContactHero() {
  return (
    <section
      className="relative -mt-24 overflow-hidden border-b border-white/10"
      aria-labelledby="contact-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.img
          src={CONTACT_HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover object-center"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: easeOut }}
        />
        <div
          className="absolute inset-0 bg-black/65 dark:bg-black/60"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(75vh,700px)] max-w-6xl flex-col items-center justify-center px-6 pb-20 pt-32 text-center sm:pb-28 sm:pt-36 md:pt-40">
        <motion.h1
          id="contact-hero-heading"
          className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: easeOut }}
        >
          Contact{" "}
          <span className="relative inline-block">
            us
            <motion.span
              className="absolute -bottom-1 left-0 block h-0.5 w-full rounded-full sm:-bottom-1.5 sm:h-1"
              style={{ backgroundColor: ACCENT, transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 0.45, ease: easeOut }}
              aria-hidden
            />
          </span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:mt-8 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: easeOut }}
        >
          Tell us about your project , social content, web, or shop
          templates and we'll help you plan the right next step. Share a bit
          below and our team will respond, typically within one business day.
        </motion.p>
      </div>
    </section>
  );
}
