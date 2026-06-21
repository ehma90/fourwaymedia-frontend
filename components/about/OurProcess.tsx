"use client";

import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    title: "Discovery",
    body: [
      "Every project begins with listening.",
      "We learn about your goals, your audience, your challenges, and the vision you want to bring to life.",
    ],
    badge:
      "border border-amber-500/25 bg-amber-500/15 text-amber-600 dark:border-amber-500/20 dark:bg-amber-950/40 dark:text-amber-400",
  },
  {
    title: "Research & Strategy",
    body: [
      "Before we create, we think.",
      "We study your industry, identify opportunities, and develop a creative direction designed to achieve real results.",
    ],
    badge:
      "border border-emerald-500/25 bg-emerald-500/15 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  {
    title: "Creation",
    body: [
      "This is where ideas become reality.",
      "Through design, motion, sound, and digital solutions, we craft experiences that communicate your message and connect with your audience.",
    ],
    badge:
      "border border-violet-500/25 bg-violet-500/15 text-violet-600 dark:border-violet-500/20 dark:bg-violet-950/40 dark:text-violet-400",
  },
  {
    title: "Delivery",
    body: ["We present polished work that is ready to perform in the real world."],
    badge:
      "border border-red-500/25 bg-red-500/15 text-red-600 dark:border-red-500/20 dark:bg-red-950/40 dark:text-red-400",
  },
  {
    title: "Revision",
    body: [
      "Great work is collaborative.",
      "We refine, improve, and ensure the final product aligns with your vision.",
    ],
    badge:
      "border border-[#fec107]/35 bg-[#fec107]/15 text-[#b88600] dark:border-[#fec107]/25 dark:bg-[#fec107]/10 dark:text-[#fec107]",
  },
  {
    title: "Growth",
    body: [
      "Our goal isn't simply to finish projects.",
      "Our goal is to help brands, businesses, creators, and ideas continue to grow long after the work is delivered.",
    ],
    badge:
      "border border-[#dc4437]/30 bg-[#dc4437]/12 text-[#dc4437] dark:border-[#dc4437]/25 dark:bg-[#dc4437]/15 dark:text-[#f0857a]",
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export function OurProcess() {
  return (
    <section
      className="border-t border-neutral-200/90 bg-[#f4f4f2] py-16 sm:py-24 dark:border-white/10 dark:bg-[#1a1a1a]"
      aria-labelledby="our-process-heading"
    >
      <div className="mx-auto max-w-5xl px-6 font-[family-name:var(--font-lexend),system-ui,sans-serif]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dc4437]">
            How We Work
          </p>
          <h2
            id="our-process-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl md:text-[2.5rem] dark:text-white"
          >
            Our Process
          </h2>
        </motion.div>

        <motion.ol
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {STEPS.map((step, index) => (
            <motion.li
              key={step.title}
              variants={itemVariants}
              className="relative flex flex-col rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-base font-bold ${step.badge}`}
              >
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-neutral-950 dark:text-white">
                {step.title}
              </h3>
              <div className="mt-2 space-y-2">
                {step.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
