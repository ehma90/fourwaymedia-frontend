"use client";

import { motion } from "framer-motion";

/** Unsplash — team collaboration, workspace, teamwork */
const IMAGES = {
  teamCollaboration:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  openOffice:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  handsTogether:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
} as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

export function WhyWorkWithUs() {
  return (
    <motion.section
      className="border-t border-neutral-200/90 bg-[#f4f4f2] py-16 sm:py-24 dark:border-white/10 dark:bg-[#1a1a1a]"
      aria-labelledby="why-work-heading"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <motion.div
          className="min-w-0 font-[family-name:var(--font-lexend),system-ui,sans-serif]"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
        >
          <h2
            id="why-work-heading"
            className="text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.5rem] dark:text-white"
          >
            Why{" "}
            <span className="relative inline-block">
              <span className="relative z-0">work</span>
              <span
                className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#e8a317] sm:-bottom-1.5 sm:h-0.5 dark:bg-[#f2b01e]"
                aria-hidden
              />
            </span>{" "}
            with us
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            Our mission is to design and build digital products that solve real
            problems and create meaningful impact. We focus on solutions that feel
            intuitive, stay accessible, and line up with what your users and
            stakeholders actually need—from first sketch through launch and beyond.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            We combine clear creative direction with solid execution: tight feedback
            loops, honest timelines, and attention to detail so deliverables hold up
            in the real world. That approach helps us earn trust, ship work we&apos;re
            proud of, and build partnerships that last.
          </p>
        </motion.div>

        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.div
                className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:rounded-2xl dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <img
                  src={IMAGES.teamCollaboration}
                  alt="Team collaborating around a laptop in an office"
                  className="aspect-3/4 h-full w-full object-cover"
                />
              </motion.div>
              <motion.div
                className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:rounded-2xl dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <img
                  src={IMAGES.openOffice}
                  alt="Modern open-plan office with people working"
                  className="aspect-3/4 h-full w-full object-cover"
                />
              </motion.div>
            </div>
            <motion.div
              className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:rounded-2xl dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <img
                src={IMAGES.handsTogether}
                alt="Team members joining hands together over a table"
                className="aspect-video w-full object-cover sm:aspect-21/9"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
