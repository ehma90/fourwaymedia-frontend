"use client";

import { motion } from "framer-motion";
import { Building2, Megaphone, Rocket, Sparkles, Users } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const STORIES = [
  {
    icon: Rocket,
    text: "They exist in startups trying to change the future.",
    iconWrap:
      "border border-amber-500/25 bg-amber-500/15 text-amber-500 dark:border-amber-500/20 dark:bg-amber-950/40",
  },
  {
    icon: Megaphone,
    text: "They exist in businesses trying to reach new customers.",
    iconWrap:
      "border border-emerald-500/25 bg-emerald-500/15 text-emerald-500 dark:border-emerald-500/20 dark:bg-emerald-950/40",
  },
  {
    icon: Users,
    text: "They exist in creators building communities.",
    iconWrap:
      "border border-violet-500/25 bg-violet-500/15 text-violet-500 dark:border-violet-500/20 dark:bg-violet-950/40",
  },
  {
    icon: Building2,
    text: "They exist in organizations creating impact.",
    iconWrap:
      "border border-red-500/25 bg-red-500/15 text-red-500 dark:border-red-500/20 dark:bg-red-950/40",
  },
  {
    icon: Sparkles,
    text: "They exist in events, products, services, movements, and ideas.",
    iconWrap:
      "border border-[#fec107]/35 bg-[#fec107]/15 text-[#d99e00] dark:border-[#fec107]/25 dark:bg-[#fec107]/10 dark:text-[#fec107]",
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export function IndustriesWeServe() {
  return (
    <section
      className="border-t border-neutral-200/90 bg-[#f4f4f2] py-16 sm:py-24 dark:border-white/10 dark:bg-[#1a1a1a]"
      aria-labelledby="industries-heading"
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
            The Industries We Serve
          </p>
          <h2
            id="industries-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl md:text-[2.5rem] dark:text-white"
          >
            Stories exist everywhere
          </h2>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {STORIES.map(({ icon: Icon, text, iconWrap }) => (
            <motion.li
              key={text}
              variants={cardVariants}
              className="flex items-start gap-4 rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconWrap}`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                {text}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mx-auto mt-12 max-w-3xl space-y-5 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            That is why we don&apos;t limit ourselves to one industry.
          </p>
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            If you have a story to tell, a vision to share, a product to launch, or a
            dream to bring to life, Fourway Media is built to help you do it.
          </p>
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            Whether you&apos;re just getting started or already established, we meet you
            where you are and help move your vision forward.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
