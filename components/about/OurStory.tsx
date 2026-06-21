"use client";

import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const PARAGRAPHS = [
  "Fourway Media was born from a simple belief: every dream deserves a chance.",
  "Too often, great ideas never leave people's minds. Not because they lack passion or potential, but because they lack access. Access to the right people. Access to creative expertise. Access to opportunities that help bring ideas to life.",
  "For a long time, professional creative services were out of reach for many startups, young founders, dreamers, and visionaries. The ability to tell your story, build your brand, or launch your idea often depended on how much money you had.",
  "We didn't think that was right.",
  "We believe the world moves forward because of people who dare to dream beyond their circumstances. Every business, movement, invention, community, and legacy began as an idea in someone's mind. A world without dreams is a world without progress.",
  "That is why Fourway Media exists.",
  "We exist to help people take what lives in their imagination and bring it into reality. We exist to give ideas a voice, a face, a story, and a chance to be seen.",
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export function OurStory() {
  return (
    <section
      className="border-t border-neutral-200/90 bg-background py-16 sm:py-24 dark:border-white/10"
      aria-labelledby="our-story-heading"
    >
      <div className="mx-auto max-w-3xl px-6 font-[family-name:var(--font-lexend),system-ui,sans-serif]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dc4437]">
            The Fourway Media Story
          </p>
          <h2
            id="our-story-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl md:text-[2.5rem] dark:text-white"
          >
            Why Fourway Media Exists
          </h2>
        </motion.div>

        <motion.div
          className="mt-8 space-y-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {PARAGRAPHS.map((paragraph) => (
            <motion.p
              key={paragraph}
              variants={itemVariants}
              className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
