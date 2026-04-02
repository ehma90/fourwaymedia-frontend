"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { formFieldClassName } from "@/lib/input-classes";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const easeOut = [0.22, 1, 0.36, 1] as const;

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-900 dark:text-white";

const SOCIAL = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: InstagramIcon,
  },
  {
    name: "X",
    href: "https://x.com",
    icon: XIcon,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: YoutubeIcon,
  },
] as const;

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 7.07 0 12 0 12s0 4.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 16.93 24 12 24 12s0-4.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function ContactFormSection() {
  return (
    <section
      className="border-t border-neutral-200/80 bg-neutral-100 py-16 sm:py-24 dark:border-white/10 dark:bg-[#0a0a0a]"
      aria-labelledby="contact-form-heading"
    >
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <h2
            id="contact-form-heading"
            className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
          >
            <span className="text-neutral-900 dark:text-white">Send us a Message

            </span>

          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
            Send us a message using the form below and we&apos;ll be happy to assist
            you.
          </p>

          <motion.div
            className="mt-10 rounded-2xl "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
          >
            <div className="rounded-2xl bg-neutral-100 p-6 sm:p-8 dark:bg-neutral-900/95">
              <form className="space-y-6" noValidate>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className={formFieldClassName}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className={labelClass}>
                      Company
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Company name"
                      className={formFieldClassName}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="contact-phone" className={labelClass}>
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Phone number"
                      className={formFieldClassName}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={formFieldClassName}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className={labelClass}>
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What is this about?"
                    className={formFieldClassName}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Your message"
                    className={cn(formFieldClassName, "min-h-[140px] resize-y")}
                  />
                </div>
                <div className="flex justify-center pt-1">
                  <Button
                    variant="primary"
                    className="inline-flex h-10 min-w-[120px] px-8 text-[16px] font-medium"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: easeOut }}
          >
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              Follow our social media
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {SOCIAL.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-200/80 text-neutral-700 transition-colors hover:bg-neutral-300 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white"
                    aria-label={name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
