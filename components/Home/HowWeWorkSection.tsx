"use client";

import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    title: "Discovery",
    description:
      "We start by understanding your brand, goals, audience, and challenges. This ensures every decision is aligned with what you want to achieve.",
  },
  {
    title: "Strategy & Direction",
    description:
      "Before design begins, we define the creative direction. This includes concept development, mood direction, and a clear execution plan.",
  },
  {
    title: "Execution",
    description:
      "We bring ideas to life across branding, design, content, motion, UI/UX, and digital campaigns—focused on quality and purpose.",
  },
  {
    title: "Review & Refinement",
    description:
      "You review the work, and we refine it based on structured feedback within the agreed scope.",
  },
  {
    title: "Final Delivery",
    description:
      "Once approved, we deliver fully prepared assets ready for real-world use across your platforms and channels.",
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOut },
  },
};

export function HowWeWorkSection() {
  return (
    <section
      className="border-t border-neutral-200/90 bg-[#f4f4f2] py-16 sm:py-24 dark:border-white/10 dark:bg-[#1a1a1a]"
      aria-labelledby="how-we-work-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16 xl:gap-20">
          <motion.div
            className="min-w-0 lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            
            <h2
              id="how-we-work-heading"
              className="mt-3 font-[family-name:var(--font-lexend),system-ui,sans-serif] text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl dark:text-white"
            >
              How We Work
            </h2>
            <p className="mt-6 text-base leading-relaxed text-copy-body">
              At Fourway Media, we don&apos;t just create—we build clarity,
              direction, and impact across every brand we touch.
            </p>
            <p className="mt-4 text-base leading-relaxed text-copy-body ">
              Our process is simple, structured, and intentional:
            </p>
          </motion.div>

          <motion.ol
            className="relative min-w-0 space-y-4 sm:space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            <div
              className="pointer-events-none absolute bottom-3 left-[1.35rem] top-3 hidden w-px bg-linear-to-b from-[#DC4437]/35 via-[#FEC107]/25 to-transparent sm:block"
              aria-hidden
            />

            {STEPS.map((step, index) => {
             
              return (
                <motion.li
                  key={step.title}
                  variants={stepVariants}
                  className="relative rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-6 dark:border-white/10 dark:bg-neutral-900/60 dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex gap-4 sm:gap-5">
                    <div className="relative shrink-0">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(160deg,#DC4437,#FEC107)] text-sm font-bold text-white shadow-sm">
                        {index + 1}
                      </span>
                     
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-base font-bold text-neutral-950 sm:text-lg dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-[15px] dark:text-neutral-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
