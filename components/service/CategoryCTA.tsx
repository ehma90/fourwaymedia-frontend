"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const CALENDLY_URL = "https://calendly.com/4waydesign/30min";

type CategoryCTAProps = {
  title: string;
};

export function CategoryCTA({ title }: CategoryCTAProps) {
  return (
    <section
      className="border-t border-neutral-200/80 bg-background py-16 sm:py-24 dark:border-white/10"
      aria-labelledby="category-cta-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#DC4437_10%,#FEC107_100%)] px-6 py-12 text-center shadow-[0_14px_30px_rgba(220,68,55,0.25)] sm:px-12 sm:py-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <div className="mx-auto max-w-2xl font-[family-name:var(--font-lexend),system-ui,sans-serif]">
            <h2
              id="category-cta-heading"
              className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-[2.25rem]"
            >
              Ready to start your {title} project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Tell us about your vision and we&apos;ll put together the right plan to
              bring it to life.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "min-w-[160px] bg-white bg-none text-[#dc4437] shadow-[0_10px_24px_rgba(0,0,0,0.18)] hover:brightness-100 hover:bg-neutral-100",
                )}
              >
                Contact us
              </a>
              <Link
                href="/service"
                className="inline-flex h-11 min-w-[160px] items-center justify-center rounded-xl border border-white/70 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                View all services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
