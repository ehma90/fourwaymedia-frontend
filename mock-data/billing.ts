export type InvoiceStatus = "paid" | "open" | "void";

export type MockInvoice = {
  id: string;
  /** ISO 8601 */
  date: string;
  description: string;
  amount: string;
  status: InvoiceStatus;
  /** Optional URL when invoice PDFs are wired up */
  pdfHref?: string;
};

/** Shown on the billing page until Stripe Customer data exists */
export const MOCK_PAYMENT_METHOD_LABEL = "Visa ending in 4242";

/**
 * Replace with Stripe/ledger data when billing API exists.
 * Use `[]` to exercise the empty-invoices state.
 */
export const MOCK_INVOICES: MockInvoice[] = [
  {
    id: "inv_001",
    date: "2026-04-01T12:00:00.000Z",
    description: "Premium — monthly",
    amount: "$6.99",
    status: "paid",
  },
  {
    id: "inv_002",
    date: "2026-03-01T12:00:00.000Z",
    description: "Premium — monthly",
    amount: "$6.99",
    status: "paid",
  },
  {
    id: "inv_003",
    date: "2026-02-01T12:00:00.000Z",
    description: "Premium — monthly",
    amount: "$6.99",
    status: "paid",
  },
];
