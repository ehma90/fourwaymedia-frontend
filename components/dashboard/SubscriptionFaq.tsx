import { ChevronDown } from "lucide-react";

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What's the difference between Free and Premium?",
    answer:
      "Free includes handpicked templates and community support. Premium unlocks the full library, lighter project files, regular updates, and priority support when you're stuck.",
  },
  {
    question: "What does Premium unlock in the dashboard?",
    answer:
      "When your subscription is active, you'll get access to billing and download features from the dashboard. Checkout and account linking are not wired up yet—this page shows plans ahead of that work.",
  },
  {
    question: "How does billing work?",
    answer:
      "Plans are priced monthly (see Premium above). Stripe or another checkout provider will handle payment and invoices once connected; until then, CTAs are placeholders.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. When billing is live, you’ll be able to cancel from your account or billing portal. You’ll keep access until the end of the paid period unless your provider’s policy says otherwise.",
  },
  {
    question: "Do subscriptions renew automatically?",
    answer:
      "Monthly plans typically renew each billing cycle until you cancel. Exact behavior will match whatever we configure with the payment provider at launch.",
  },
  {
    question: "Who do I contact for help?",
    answer:
      "Premium members get priority support. Everyone can reach us through the contact page if something’s unclear or broken.",
  },
];

const cardClass =
  "rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-6";

export function SubscriptionFaq() {
  return (
    <section aria-labelledby="subscription-faq-heading" className={cardClass}>
      <h2
        id="subscription-faq-heading"
        className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
      >
        Subscription FAQ
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Common questions about plans and billing—some steps depend on checkout being connected.
      </p>
      <div className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
        {FAQ_ITEMS.map(({ question, answer }) => (
          <details
            key={question}
            className="group py-4 first:pt-0 last:pb-0 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-50">
              <span>{question}</span>
              <ChevronDown
                className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-180 dark:text-zinc-500"
                strokeWidth={2}
                aria-hidden
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
