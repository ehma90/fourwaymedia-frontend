"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { faqItems, type FaqBlock } from "@/mock-data/faq";

const easeOut = [0.22, 1, 0.36, 1] as const;

const CALENDLY_URL = "https://calendly.com/4waydesign/30min";

function FaqAnswer({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <div className="space-y-4 pb-6 pr-10">
      {blocks.map((block, index) => {
        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={index}
              className={cn(
                "space-y-2.5 pl-1",
                block.ordered ? "list-none" : "list-none",
              )}
            >
              {block.items.map((item, itemIndex) => (
                <li key={item} className="flex gap-3">
                  {block.ordered ? (
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dc4437]/12 text-xs font-bold text-[#dc4437]">
                      {itemIndex + 1}
                    </span>
                  ) : (
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#dc4437]"
                      aria-hidden
                    />
                  )}
                  <span className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {item}
                  </span>
                </li>
              ))}
            </ListTag>
          );
        }

        return (
          <p
            key={index}
            className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function FaqRow({
  question,
  blocks,
}: {
  question: string;
  blocks: FaqBlock[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-neutral-200/90 dark:border-white/10">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left outline-none transition-colors focus-visible:text-[#dc4437]"
        >
          <span className="text-lg font-semibold text-neutral-950 dark:text-white">
            {question}
          </span>
          <motion.span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 dark:border-white/15 dark:text-neutral-200"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            aria-hidden
          >
            <Plus className="h-5 w-5" strokeWidth={2} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="overflow-hidden"
          >
            <FaqAnswer blocks={blocks} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FaqAccordion() {
  return (
    <section
      className="border-t border-neutral-200/80 bg-background py-16 sm:py-24 dark:border-white/10"
      aria-labelledby="faq-list-heading"
    >
      <div className="mx-auto max-w-3xl px-6 font-[family-name:var(--font-lexend),system-ui,sans-serif]">
        <h2 id="faq-list-heading" className="sr-only">
          Frequently asked questions
        </h2>

        <div>
          {faqItems.map((item) => (
            <FaqRow
              key={item.question}
              question={item.question}
              blocks={item.blocks}
            />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-neutral-200/90 bg-neutral-100 p-8 text-center dark:border-white/10 dark:bg-[#161616]">
          <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Still have questions?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            Tell us about your project and we&apos;ll guide you through the next
            steps.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "mt-6 min-w-[160px]",
            )}
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
