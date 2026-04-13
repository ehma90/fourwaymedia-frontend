export const NOTIFICATION_KINDS = ["billing", "subscription", "product"] as const;

export type NotificationKind = (typeof NOTIFICATION_KINDS)[number];

export type NotificationItem = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};

/**
 * Replace with `/api/me/notifications` (or similar) when wired up.
 * Use an empty array to exercise the empty state.
 */
export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    kind: "billing",
    title: "Payment received",
    body: "Thanks — your Premium subscription renewal was processed successfully.",
    createdAt: "2026-04-12T09:00:00.000Z",
    read: false,
  },
  {
    id: "2",
    kind: "subscription",
    title: "Subscription active",
    body: "You now have full access to the template library and downloads.",
    createdAt: "2026-04-10T14:20:00.000Z",
    read: false,
  },
  {
    id: "3",
    kind: "product",
    title: "New templates this week",
    body: "Fresh motion and design packs dropped — browse the shop for the latest.",
    createdAt: "2026-04-08T11:45:00.000Z",
    read: true,
  },
];
