"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;


const OFFICE_IMAGE =
  "https://ik.imagekit.io/vp72mg6kz/Shop-page/cd520ee99ee6b633e452c923cb2305efe463882b.jpg";

/** Ikeja, Lagos State, Nigeria — OSM embed (bbox min_lon,min_lat,max_lon,max_lat; marker=lat,lon) */
const MAP_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=3.330%2C6.575%2C3.370%2C6.620&layer=mapnik&marker=6.6018%2C3.3515";

const blockVariants = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: 0.08 * i, ease: easeOut },
  }),
};

export function GetInTouch() {
  return (
    <section
      className="border-t border-neutral-200/80 bg-neutral-100 py-16 sm:py-24 dark:border-white/10 dark:bg-[#121212]"
      aria-labelledby="get-in-touch-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
        <motion.div
          className="min-w-0 font-[family-name:var(--font-lexend),system-ui,sans-serif]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <h2
            id="get-in-touch-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem]"
          >
            <span className="text-neutral-900 dark:text-white">Get in Touch </span>
            
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400">
            We&apos;d love to hear from you. Reach out with any questions or
            feedback, and we&apos;ll get back to you shortly.
          </p>

          <ul className="mt-10 flex flex-col gap-8 sm:mt-12">
            <motion.li
              className="flex gap-4"
              custom={0}
              variants={blockVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/15 dark:border-amber-500/20 dark:bg-amber-950/40">
                <MapPin className="h-5 w-5 text-amber-500" strokeWidth={1.75} aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  Head Office
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Office location No. 9, Ikeja, Lagos State, Nigeria
                </p>
              </div>
            </motion.li>

            <motion.li
              className="flex gap-4"
              custom={1}
              variants={blockVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/15 dark:border-emerald-500/20 dark:bg-emerald-950/40">
                <Mail className="h-5 w-5 text-emerald-500" strokeWidth={1.75} aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  Email us
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  <a
                    href="mailto:support@yourdomain.xxc"
                    className="underline-offset-2 hover:text-neutral-900 hover:underline dark:hover:text-white"
                  >
                    Contact@fourwaymedia.com
                  </a>
                  <br />
                  <a
                    href="mailto:hello@yourdomain.fgl"
                    className="underline-offset-2 hover:text-neutral-900 hover:underline dark:hover:text-white"
                  >
                    info@fourwaymedia.com
                  </a>
                </p>
              </div>
            </motion.li>

            <motion.li
              className="flex gap-4"
              custom={2}
              variants={blockVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/15 dark:border-violet-500/20 dark:bg-violet-950/40">
                <Phone className="h-5 w-5 text-violet-500" strokeWidth={1.75} aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  Call us
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Phone: +6 62783849302
                  <br />
                  Fax: +6 7377282919739
                </p>
              </div>
            </motion.li>
          </ul>
        </motion.div>

        <motion.div
          className="min-w-0 lg:sticky lg:top-28"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:rounded-3xl">
            <div className="aspect-4/3 w-full overflow-hidden sm:aspect-16/10">
              <img
                src={OFFICE_IMAGE}
                alt="Modern office building exterior"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative h-[min(280px,50vh)] w-full min-h-[220px] bg-neutral-200 dark:bg-neutral-800">
              <iframe
                title="Office location in Ikeja, Lagos State, Nigeria"
                src={MAP_EMBED_SRC}
                className="h-full w-full border-0 grayscale-[0.15] dark:grayscale-[0.25]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
