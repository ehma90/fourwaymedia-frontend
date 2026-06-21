"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon, MonitorSmartphone, Play, Volume2 } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const PATHWAYS = [
  {
    icon: ImageIcon,
    title: "Imagery",
    description: "Design, photography, illustration, branding, and visual art.",
    iconWrap:
      "border border-amber-500/25 bg-amber-500/15 text-amber-500 dark:border-amber-500/20 dark:bg-amber-950/40",
  },
  {
    icon: Play,
    title: "Motion",
    description:
      "Animation, video production, motion graphics, and visual storytelling in motion.",
    iconWrap:
      "border border-emerald-500/25 bg-emerald-500/15 text-emerald-500 dark:border-emerald-500/20 dark:bg-emerald-950/40",
  },
  {
    icon: Volume2,
    title: "Sound",
    description: "Voice, music, podcasts, sound design, and audio experiences.",
    iconWrap:
      "border border-violet-500/25 bg-violet-500/15 text-violet-500 dark:border-violet-500/20 dark:bg-violet-950/40",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital Solutions",
    description:
      "Websites, applications, digital products, marketing systems, analytics, and technology-driven experiences.",
    iconWrap:
      "border border-red-500/25 bg-red-500/15 text-red-500 dark:border-red-500/20 dark:bg-red-950/40",
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export function WhyFourway() {
  return (
    <section
      className="border-t border-neutral-200/90 bg-neutral-100 py-16 sm:py-24 dark:border-white/10 dark:bg-[#121212]"
      aria-labelledby="why-fourway-heading"
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
            Our Name
          </p>
          <h2
            id="why-fourway-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl md:text-[2.5rem] dark:text-white"
          >
            Why &ldquo;Fourway&rdquo;?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            Fourway represents the four fundamental ways stories are told.
          </p>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-5 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {PATHWAYS.map(({ icon: Icon, title, description, iconWrap }) => (
            <motion.li
              key={title}
              variants={cardVariants}
              className="flex flex-col rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconWrap}`}
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-neutral-950 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mx-auto mt-12 max-w-2xl space-y-3 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            Together, these four pathways allow us to help ideas reach people through
            every meaningful touchpoint.
          </p>
          <p className="text-lg font-semibold text-neutral-900 dark:text-white">
            Because every story deserves to be heard.
          </p>
          <p className="text-lg font-semibold text-[#dc4437]">
            And every dream deserves a chance to live.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
