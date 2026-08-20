"use client";

import Link from "next/link";
import { ArrowLeft, Download, Receipt, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { apiGet } from "@/lib/api";
import { cn } from "@/lib/utils";

type ReceiptData = {
  orderId: string;
  templateTitle: string;
  amount: string;
  status: string;
  placedAt: string;
  paymentReference?: string;
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? iso
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "long",
        timeStyle: "short",
      }).format(date);
}

export function ReceiptPageContent({ orderId }: { orderId: string }) {
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void apiGet<ReceiptData>(`/api/me/receipts/${encodeURIComponent(orderId)}`)
      .then(setReceipt)
      .catch((cause) => {
        setError(
          cause instanceof Error ? cause.message : "Could not load receipt",
        );
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <header>
        <Link
          href="/dashboard/notifications"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#DC4437] hover:underline dark:text-[#FEC107]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to notifications
        </Link>
        <h1 className="mt-5 font-[family-name:var(--font-bitter)] text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Receipt
        </h1>
      </header>

      {loading ? (
        <div className="flex items-center justify-center rounded-2xl bg-white py-16 dark:bg-zinc-900/40">
          <LoadingSpinner label="Loading receipt" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
          <p className="text-sm">{error}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Try again
          </Button>
        </div>
      ) : receipt ? (
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <Receipt className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Payment receipt
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Thank you for your purchase.
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold capitalize text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
              {receipt.status}
            </span>
          </div>

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500 dark:text-zinc-400">Item</dt>
              <dd className="text-right font-medium text-zinc-900 dark:text-zinc-50">
                {receipt.templateTitle}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500 dark:text-zinc-400">Amount</dt>
              <dd className="font-semibold text-zinc-900 dark:text-zinc-50">
                {receipt.amount}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500 dark:text-zinc-400">Date</dt>
              <dd className="text-right text-zinc-900 dark:text-zinc-50">
                {formatDate(receipt.placedAt)}
              </dd>
            </div>
            {receipt.paymentReference ? (
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500 dark:text-zinc-400">Reference</dt>
                <dd className="max-w-[60%] break-all text-right font-mono text-xs text-zinc-900 dark:text-zinc-50">
                  {receipt.paymentReference}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-8 flex flex-col gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800 sm:flex-row">
            <Link
              href="/dashboard/purchases"
              className={cn(
                buttonVariants({ variant: "primary" }),
                "justify-center",
              )}
            >
              <Download className="h-4 w-4" aria-hidden />
              Open purchases
            </Link>
            <Link
              href="/dashboard/notifications"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "justify-center",
              )}
            >
              Back to notifications
            </Link>
          </div>
        </article>
      ) : null}
    </div>
  );
}
