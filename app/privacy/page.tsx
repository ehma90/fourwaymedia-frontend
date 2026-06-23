import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Privacy Policy | Fourwaymedia",
  description:
    "How Fourwaymedia collects, uses, stores, protects, and shares your personal information when you use our platform.",
};

const EFFECTIVE_DATE = "June 10, 2026";
const LAST_UPDATED = "June 11, 2026";
const PRIVACY_EMAIL = "privacy@fourwaymedia.com";
const CONTACT_ADDRESS = "12 Platform Street, Lagos, Nigeria";
const CONTACT_PHONE = "+234 816 021 5890";

const DATA_PROTECTION_ROWS = [
  {
    label: "Name",
    description:
      "Stored securely in our database with access limited to authorised personnel only. Never shared with advertisers.",
  },
  {
    label: "Email",
    description:
      "Encrypted in transit via TLS. Used only for account-related communications. Never visible to other users unless you choose to share it.",
  },
  {
    label: "Password",
    description:
      "Passwords are hashed using industry-standard bcrypt encryption before storage. We never store plain-text passwords and our team cannot view them.",
  },
  {
    label: "Profile Picture",
    description:
      "Stored on secure cloud infrastructure with access controls. You may update or delete your picture at any time from account settings.",
  },
] as const;

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-base font-bold text-neutral-950 sm:text-lg dark:text-white">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 font-[family-name:var(--font-lexend),system-ui,sans-serif] text-sm font-bold text-neutral-950 sm:text-base dark:text-white">
      {children}
    </h3>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="border-t border-neutral-200/80 dark:border-white/10">
        <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <header className="text-center">
            <h1 className="font-[family-name:var(--font-lexend),system-ui,sans-serif] text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl dark:text-white">
              PRIVACY POLICY
            </h1>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Effective Date: {EFFECTIVE_DATE} | Last Updated: {LAST_UPDATED}
            </p>
          </header>

          <p className="mt-10 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
            Your privacy matters to us. This Privacy Policy explains how we
            collect, use, store, protect, and share your personal information
            when you use our platform. By accessing or using our services, you
            agree to the terms outlined in this document.
          </p>

          <ol className="mt-12 space-y-10">
            <li>
              <SectionHeading>1. Information We Collect</SectionHeading>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                We collect the following categories of personal information to
                provide and improve our services:
              </p>

              <SubHeading>1.1 Account Information</SubHeading>
              <BulletList
                items={[
                  "Full name: used to personalise your experience and identify your account",
                  "Email address: used for account login, notifications, and communication",
                  "Password: stored in an encrypted, hashed format; never readable by our staff",
                  "Profile picture: used to personalise your public or internal profile display",
                ]}
              />

              <SubHeading>1.2 Usage Information</SubHeading>
              <BulletList
                items={[
                  "Log data including IP address, browser type, and pages visited",
                  "Device information such as operating system and screen resolution",
                  "Interaction data including clicks, session duration, and feature usage",
                ]}
              />

              <SubHeading>1.3 Communications</SubHeading>
              <BulletList
                items={[
                  "Messages sent through our support channels or feedback forms",
                  "Responses to surveys or research participation",
                ]}
              />
            </li>

            <li>
              <SectionHeading>2. How We Use Your Information</SectionHeading>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                Your data is used strictly for the following purposes:
              </p>
              <BulletList
                items={[
                  "To create and manage your account",
                  "To authenticate your identity during login",
                  "To send you transactional emails (e.g., password resets, confirmations)",
                  "To personalise your in-platform experience",
                  "To improve our product features through aggregated, anonymised analysis",
                  "To respond to your support requests",
                  "To comply with applicable legal obligations",
                ]}
              />
              <p className="mt-4 text-sm font-semibold leading-relaxed text-neutral-950 sm:text-base dark:text-white">
                We do not sell, rent, or trade your personal information to
                third parties for marketing purposes.
              </p>
            </li>

            <li>
              <SectionHeading>3. Protection of Your Personal Data</SectionHeading>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                We take the security of your personal information seriously.
                Below is how we protect each category of sensitive data:
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 dark:border-white/10">
                {DATA_PROTECTION_ROWS.map((row, index) => (
                  <div
                    key={row.label}
                    className={
                      index > 0
                        ? "border-t border-neutral-200 dark:border-white/10"
                        : undefined
                    }
                  >
                    <div className="grid sm:grid-cols-[9rem_1fr]">
                      <div className="bg-neutral-900 px-4 py-3 text-sm font-semibold text-white dark:bg-neutral-950">
                        {row.label}
                      </div>
                      <div className="bg-sky-50 px-4 py-3 text-sm leading-relaxed text-neutral-800 dark:bg-sky-950/30 dark:text-neutral-200">
                        {row.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </li>

            <li>
              <SectionHeading>4. Data Retention</SectionHeading>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                We retain your personal data for as long as your account is
                active or as needed to provide our services. You may request
                deletion of your account and all associated data at any time by
                contacting us at the address listed below.
              </p>
              <BulletList
                items={[
                  "Active account data is retained for the duration of your subscription or usage",
                  "Inactive accounts are flagged for deletion after 24 months of no activity",
                  "Backup copies may persist for up to 90 days after deletion for recovery purposes",
                ]}
              />
            </li>

            <li>
              <SectionHeading>5. Sharing of Information</SectionHeading>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                We do not share your personal information except in the following
                limited circumstances:
              </p>
              <BulletList
                items={[
                  "Service providers who assist us in operating our platform (e.g., cloud hosting, email delivery), bound by confidentiality agreements",
                  "Legal compliance: when required by law, court order, or to protect our rights",
                  "Business transfers: in the event of a merger or acquisition, users will be notified",
                ]}
              />
              <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                All third-party partners are vetted to ensure they meet our data
                protection standards.
              </p>
            </li>

            <li>
              <SectionHeading>6. Your Rights</SectionHeading>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                Depending on your location, you may have the following rights
                regarding your personal data:
              </p>
              <BulletList
                items={[
                  "Right to access: request a copy of the data we hold on you",
                  "Right to correction: update inaccurate or incomplete information",
                  "Right to deletion: request that we erase your personal data",
                  "Right to data portability: receive your data in a structured, machine-readable format",
                  "Right to withdraw consent: opt out of non-essential data processing at any time",
                ]}
              />
              <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                To exercise any of these rights, contact us at{" "}
                <a
                  href={`mailto:${PRIVACY_EMAIL}`}
                  className="text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
                >
                  {PRIVACY_EMAIL}
                </a>
                . We will respond within 30 days.
              </p>
            </li>

            <li>
              <SectionHeading>7. Cookies &amp; Tracking</SectionHeading>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                We use cookies and similar technologies to maintain session
                integrity, remember your preferences, and analyse platform
                performance. You may manage cookie preferences through your
                browser settings at any time.
              </p>
            </li>

            <li>
              <SectionHeading>8. Children&apos;s Privacy</SectionHeading>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                Our platform is not intended for users under the age of 13. We
                do not knowingly collect personal information from children. If
                we become aware that a minor has provided us with personal data,
                we will delete it promptly.
              </p>
            </li>

            <li>
              <SectionHeading>9. Changes to This Policy</SectionHeading>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                We may update this Privacy Policy from time to time. When we
                do, we will revise the &apos;Last Updated&apos; date at the top
                of this document and, where appropriate, notify you via email or
                an in-platform notice. Your continued use of our services after
                any changes constitutes your acceptance of the updated policy.
              </p>
            </li>

            <li>
              <SectionHeading>10. Contact Us</SectionHeading>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or your personal data, please reach out to us:
              </p>
              <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
                <p className="font-semibold text-neutral-950 dark:text-white">
                  Privacy Officer
                </p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${PRIVACY_EMAIL}`}
                    className="text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
                  >
                    {PRIVACY_EMAIL}
                  </a>
                </p>
                <p>Address: {CONTACT_ADDRESS}</p>
                <p>
                  Phone:{" "}
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                    className="text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
                  >
                    {CONTACT_PHONE}
                  </a>
                </p>
              </address>
            </li>
          </ol>

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
