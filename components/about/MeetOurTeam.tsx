"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const TEAM = [
  {
    name: "Christian Williams",
    role: "Chief Executive Officer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    iconClass:
      "text-amber-400 hover:text-amber-300 dark:text-amber-400 dark:hover:text-amber-300",
  },
  {
    name: "Isabella Rossi",
    role: "Chief Executive Officer",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    iconClass:
      "text-emerald-500 hover:text-emerald-400 dark:text-emerald-400 dark:hover:text-emerald-300",
  },
  {
    name: "Daniel Whitmore",
    role: "Chief Executive Officer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    iconClass:
      "text-violet-500 hover:text-violet-400 dark:text-violet-400 dark:hover:text-violet-300",
  },
  {
    name: "Sophia Laurent",
    role: "Chief Executive Officer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    iconClass:
      "text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300",
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function MeetOurTeam() {
  return (
    <section
      className="border-t border-neutral-200/90 bg-neutral-100 py-16 sm:py-24 dark:border-white/10 dark:bg-[#121212]"
      aria-labelledby="meet-team-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="meet-team-heading"
            className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.5rem]"
          >
            <span className="text-neutral-900 dark:text-white">Meet our </span>
            <span className="relative inline-block text-[#DC4437] dark:text-[#f97316]">
              Team
              <motion.span
                className="absolute -bottom-1 left-1/2 block h-0.5 w-full max-w-12 -translate-x-1/2 rounded-full bg-[#DC4437] dark:bg-[#f97316] sm:-bottom-1.5 sm:h-1"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "center" }}
                aria-hidden
              />
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400">
            Meet the leaders shaping our direction through strategy, creativity, and
            meaningful impact.
          </p>
        </motion.div>

        <motion.ul
          className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {TEAM.map((member) => (
            <motion.li
              key={member.name}
              variants={cardVariants}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                className="relative mx-auto mb-5"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="h-36 w-36 overflow-hidden rounded-full border-2 border-neutral-200/90 bg-neutral-200 shadow-lg ring-4 ring-white/50 dark:border-white/10 dark:bg-neutral-800 dark:ring-neutral-900/50 sm:h-40 sm:w-40">
                  <img
                    src={member.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
              <p className="text-lg font-semibold text-neutral-950 dark:text-white">
                {member.name}
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {member.role}
              </p>
              <motion.div
                className="mt-4 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "rounded-md p-1.5 transition-transform hover:scale-110",
                    member.iconClass,
                  )}
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Linkedin className="h-5 w-5" strokeWidth={1.75} />
                </Link>
                <Link
                  href={member.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "rounded-md p-1.5 transition-transform hover:scale-110",
                    member.iconClass,
                  )}
                  aria-label={`${member.name} on X`}
                >
                  <XIcon />
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-14 flex justify-center sm:mt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <Link
            href="/about#meet-team-heading"
            className="rounded-md border border-violet-900/40 bg-transparent px-8 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:border-violet-700 hover:bg-neutral-200/50 dark:border-violet-400/35 dark:text-white dark:hover:border-violet-300/50 dark:hover:bg-white/5"
          >
            View the team
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
