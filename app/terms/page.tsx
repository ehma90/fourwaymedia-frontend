import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Terms & Conditions | Fourwaymedia",
  description:
    "Terms and conditions for engaging Forway Media creative services, including scope, payment, revisions, and intellectual property.",
};

const SECTIONS = [
  {
    title: "The Agreement",
    body: "Forway Media provides professional creative services under a defined scope agreed in writing before commencement.",
  },
  {
    title: "Scope & Direction",
    body: "All project deliverables are strictly based on agreed scope. Any additional request will be billed separately and may affect timelines.",
  },
  {
    title: "Payment Terms",
    body: "A minimum 50% non-refundable deposit is required before commencement. Final files are released only after full payment is received.",
  },
  {
    title: "Revisions",
    body: "Each project includes up to 3 revision rounds within scope. Additional revisions incur extra charges.",
  },
  {
    title: "Timelines",
    body: "Delivery timelines depend on timely client feedback and material provision. Delays from the client extend deadlines accordingly.",
  },
  {
    title: "Client Responsibilities",
    body: "Clients must provide accurate content, assets, and timely approvals. We are not liable for delays caused by missing information.",
  },
  {
    title: "Intellectual Property",
    body: "Ownership transfers only after full payment. Forway Media retains the right to showcase completed work unless an NDA is signed.",
  },
  {
    title: "Cancellation",
    body: "Deposits are non-refundable once work begins. Clients are billed for all completed work upon cancellation.",
  },
  {
    title: "Confidentiality",
    body: "We maintain strict confidentiality over all client information unless legally required to disclose.",
  },
  {
    title: "Liability",
    body: "We are not liable for indirect losses, business interruptions, or misuse of delivered work after approval.",
  },
  {
    title: "Third Parties",
    body: "We may use third-party tools and are not responsible for their performance or limitations.",
  },
  {
    title: "Approval",
    body: "Final delivery is considered approved once confirmed or if no revisions are requested within a reasonable time.",
  },
  {
    title: "Governing Law",
    body: "This agreement is governed by the laws of the Federal Republic of Nigeria.",
  },
  {
    title: "Updates",
    body: "We reserve the right to update these terms at any time. Continued engagement implies acceptance.",
  },
] as const;

const EFFECTIVE_DATE = "June 6, 2026";
const CONTACT_EMAIL = "Contact@fourwaymedia.com";
const CONTACT_PHONE = "+6 62783849302";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="border-t border-neutral-200/80 dark:border-white/10">
        <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <header className="text-center">
            <h1 className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl dark:text-white">
              FORWAY MEDIA — TERMS &amp; CONDITIONS
            </h1>
            <p className="mt-6 text-left text-sm text-neutral-600 dark:text-neutral-400">
              Effective Date: {EFFECTIVE_DATE}
            </p>
          </header>

          <div className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
            <p>
              Welcome to Forway Media. We operate as a premium creative agency
              specializing in high-impact brand design, digital storytelling,
              UI/UX systems, content direction, motion design, and strategic
              creative execution.
            </p>
            <p>By engaging our services, you agree to the following terms:</p>
          </div>

          <ol className="mt-12 space-y-10">
            {SECTIONS.map((section, index) => (
              <li key={section.title}>
                <h2 className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-base font-bold text-neutral-950 sm:text-lg dark:text-white">
                  {index + 1}. {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                  {section.body}
                </p>
              </li>
            ))}
          </ol>

          <section className="mt-14 border-t border-neutral-200/80 pt-10 dark:border-white/10">
            <h2 className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-base font-bold text-neutral-950 sm:text-lg dark:text-white">
              Contact
            </h2>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
              <p className="font-medium text-neutral-950 dark:text-white">
                Forway Media
              </p>
              <p>Lagos, Nigeria</p>
              <p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
                >
                  {CONTACT_EMAIL}
                </a>
                {" | "}
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
                >
                  {CONTACT_PHONE}
                </a>
              </p>
            </address>
          </section>

          <Link
            href="/sign-up"
            className="mt-12 inline-block text-sm font-medium text-[#DC4437] hover:underline dark:text-[#FEC107]"
          >
            ← Back to sign up
          </Link>
        </article>
      </main>

      <Footer />
    </div>
  );
}
