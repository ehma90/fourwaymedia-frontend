"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const easeOut = [0.22, 1, 0.36, 1] as const;

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-[#DC4437]/50 focus:ring-2 focus:ring-[#FEC107]/25 dark:border-neutral-600 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500";

export function ContactFormSection() {
  return (
    <section
      className="border-t border-neutral-200/90 bg-[#f4f4f2] py-16 sm:py-20 dark:border-white/10 dark:bg-[#141414]"
      aria-labelledby="contact-form-heading"
    >
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <h2
            id="contact-form-heading"
            className="text-center text-2xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-3xl"
          >
            Send a message
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            We typically reply within one business day.
          </p>

          <form className="mt-10 space-y-5" noValidate>
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="How can we help?"
                className={`${inputClass} resize-y min-h-[120px]`}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="h-12 w-full rounded-xl text-base font-semibold shadow-[0_10px_22px_rgba(220,68,55,0.35)]"
            >
              Send message
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
