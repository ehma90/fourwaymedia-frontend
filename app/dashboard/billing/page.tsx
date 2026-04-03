export default function DashboardBillingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Invoices, next renewal or expiry date, and payment details will appear here for users with an
        active paid subscription. Stripe Customer Portal integration can land in a later phase.
      </p>
    </div>
  );
}
