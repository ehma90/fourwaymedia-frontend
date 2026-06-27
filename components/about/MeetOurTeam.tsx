"use client";

import { motion } from "framer-motion";
import { Globe, Linkedin } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  iconClass?: string;
}

const TEAM: readonly TeamMember[] = [
  {
    name: "Emmanuel Etim",
    role: "Co-founder & Head of Operations",
    image:
      "https://ik.imagekit.io/szglholrw/My%20Pics.png?updatedAt=1769029019252",
    linkedin: "https://linkedin.com",
    iconClass:
      "text-grey-400 hover:text-grey-300 dark:text-grey-400 dark:hover:text-grey-300",
  },
  {
    name: "Emem Essang",
    role: "Co-founder & Creative Lead",
    image:
      "https://res.cloudinary.com/drrluhcad/image/upload/v1782030837/DP-new_zslpcw.jpg",
    linkedin: "https://www.linkedin.com/in/peace-in-motion-134729195/",
    iconClass:
      "text-emerald-500 hover:text-emerald-400 dark:text-emerald-400 dark:hover:text-emerald-300",
  },
  {
    name: "Emmanuel Essien",
    role: "Chief Technical Officer",
    image:
      "https://res.cloudinary.com/drrluhcad/image/upload/v1782033321/StKh9_ad9d9s.jpg",
    linkedin: "https://www.linkedin.com/in/ehmaessien/",
    iconClass:
      "text-violet-500 hover:text-violet-400 dark:text-violet-400 dark:hover:text-violet-300",
  },
  {
    name: "Rosemary Effiong",
    role: "Marketing Lead",
    image:
      "https://res.cloudinary.com/drrluhcad/image/upload/v1782030849/_MG_2523_yvpot2.png",
    linkedin: "https://www.linkedin.com/in/rosemaryeffiong",
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
            <span className="text-neutral-900 dark:text-white">Meet our Team</span>
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
                className="group relative mx-auto mb-5"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="h-36 w-36 overflow-hidden rounded-full border-2 border-neutral-200/90 bg-neutral-200 shadow-lg ring-4 ring-white/50 dark:border-white/10 dark:bg-neutral-800 dark:ring-neutral-900/50 sm:h-40 sm:w-40">
                  <img
                    src={member.image}
                    alt=""
                    className="h-full w-full object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
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
                
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>


      </div>
    </section>
  );
}
