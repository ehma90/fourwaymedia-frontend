"use client";

import Link from "next/link";
import { CreditCard, ExternalLink, Receipt } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useDashboardSubscription } from "@/hooks/use-dashboard-subscription";
import { cn } from "@/lib/utils";
import {
  MOCK_INVOICES,
  MOCK_PAYMENT_METHOD_LABEL,
  type MockInvoice,
} from "@/mock-data/billing";
import { pricingPlans } from "@/mock-data/pricing-plans";

const cardClass =
  "rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-6";

const labelClass = "text-sm font-medium text-zinc-500 dark:text-zinc-400";

function formatInvoiceDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(d);
}

function statusStyles(status: MockInvoice["status"]): string {
  switch (status) {
    case "paid":
      return "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300";
    case "open":
      return "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200";
    case "void":
      return "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400";
    default:
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
}

export function DashboardBillingContent() {
  const { isSubscribed, planName, renewalDateLabel } = useDashboardSubscription();
  const [portalMessage, setPortalMessage] = useState<string | null>(null);

  const premiumPlan = pricingPlans.find((p) => p.id === "premium");
  const priceLine =
    premiumPlan && premiumPlan.pricePeriod
      ? `${premiumPlan.price}${premiumPlan.pricePeriod}`
      : premiumPlan?.price ?? "";

  const handleManageBilling = () => {
    setPortalMessage(
      "Stripe Customer Portal will open here when the billing API is connected. No request was sent.",
    );
    window.setTimeout(() => setPortalMessage(null), 6000);
  };

  if (!isSubscribed) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 p-8 text-center dark:border-zinc-600 dark:bg-zinc-900/40">
        <CreditCard
          className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-500"
          strokeWidth={1.5}
          aria-hidden
        />
        <h2 className="mt-4 font-[family-name:var(--font-bitter)] text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Billing
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Invoices, renewal dates, and payment methods are available once you have an active Premium
          subscription.
        </p>
        <Link
          href="/dashboard/subscription"
          className={cn(
            buttonVariants({ variant: "primary" }),
            "mt-6 inline-flex w-full justify-center sm:w-auto",
          )}
        >
          View plans
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header>
        <h1 className="font-[family-name:var(--font-bitter)] text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Billing
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Invoices, renewal, and payment method. Manage sensitive changes in the billing portal when
          it is connected.
        </p>
      </header>

      {portalMessage ? (
        <p
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200"
          role="status"
        >
          {portalMessage}
        </p>
      ) : null}

      <section aria-labelledby="billing-plan-heading" className={cardClass}>
        <h2 id="billing-plan-heading" className="sr-only">
          Current plan
        </h2>
        <p className={labelClass}>Current plan</p>
        <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {planName ?? "Premium"}
          {priceLine ? (
            <span className="ml-2 text-base font-normal text-zinc-600 dark:text-zinc-400">
              · {priceLine}
            </span>
          ) : null}
        </p>
        {renewalDateLabel ? (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Next renewal on <span className="font-medium text-zinc-800 dark:text-zinc-200">{renewalDateLabel}</span>
            .
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button type="button" variant="primary" className="h-11 px-6" onClick={handleManageBilling}>
            <ExternalLink className="mr-2 h-4 w-4" strokeWidth={2} aria-hidden />
            Manage billing
          </Button>
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            Opens your provider&apos;s customer portal (e.g. Stripe) when wired up—update card,
            cancel, or download receipts there.
          </p>
        </div>
      </section>

      <section aria-labelledby="billing-payment-heading" className={cardClass}>
        <h2
          id="billing-payment-heading"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Payment method
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Update your card in the billing portal when checkout is connected.
        </p>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800/40">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-zinc-900">
            <CreditCard className="h-5 w-5 text-zinc-600 dark:text-zinc-300" strokeWidth={1.75} aria-hidden />
          </span>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{MOCK_PAYMENT_METHOD_LABEL}</p>
        </div>
      </section>

      <section aria-labelledby="billing-invoices-heading" className={cardClass}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="billing-invoices-heading"
              className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Invoices
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Recent charges on your subscription (demo data).
            </p>
          </div>
        </div>

        {MOCK_INVOICES.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400" role="status">
            No invoices yet. They will appear here after your first successful payment.
          </p>
        ) : (
          <>
            <div className="mt-6 hidden overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 md:block">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">Date</th>
                    <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">Description</th>
                    <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">Amount</th>
                    <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">Status</th>
                    <th className="px-4 py-3 text-right font-medium text-zinc-700 dark:text-zinc-300">
                      <span className="sr-only">Receipt</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_INVOICES.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-800/80"
                    >
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                        <time dateTime={inv.date}>{formatInvoiceDate(inv.date)}</time>
                      </td>
                      <td className="px-4 py-3 text-zinc-900 dark:text-zinc-50">{inv.description}</td>
                      <td className="px-4 py-3 font-medium tabular-nums text-zinc-900 dark:text-zinc-50">
                        {inv.amount}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex rounded-md px-2 py-0.5 text-xs font-semibold capitalize",
                            statusStyles(inv.status),
                          )}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <InvoicePdfButton invoice={inv} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="mt-6 flex flex-col gap-3 md:hidden" role="list">
              {MOCK_INVOICES.map((inv) => (
                <li
                  key={inv.id}
                  className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{inv.description}</p>
                    <span
                      className={cn(
                        "shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold capitalize",
                        statusStyles(inv.status),
                      )}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <time dateTime={inv.date}>{formatInvoiceDate(inv.date)}</time>
                    <span className="mx-1.5" aria-hidden>
                      ·
                    </span>
                    <span className="font-medium tabular-nums text-zinc-800 dark:text-zinc-200">
                      {inv.amount}
                    </span>
                  </p>
                  <div className="mt-3">
                    <InvoicePdfButton invoice={inv} fullWidth />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
        Card charges may appear on your statement under Fourwaymedia or your payment provider&apos;s
        descriptor. Questions?{" "}
        <Link
          href="/contact"
          className="font-medium text-[#DC4437] underline-offset-2 hover:underline dark:text-[#FEC107]"
        >
          Contact us
        </Link>
        .
      </p>
    </div>
  );
}

function InvoicePdfButton({
  invoice,
  fullWidth,
}: {
  invoice: MockInvoice;
  fullWidth?: boolean;
}) {
  const disabled = !invoice.pdfHref;
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={disabled}
      title={disabled ? "PDF receipts will be available when billing is connected." : undefined}
      className={cn(fullWidth && "w-full", "h-9")}
      onClick={() => {
        if (invoice.pdfHref) window.open(invoice.pdfHref, "_blank", "noopener,noreferrer");
      }}
    >
      <Receipt className="mr-2 h-4 w-4" strokeWidth={2} aria-hidden />
      PDF
    </Button>
  );
}
