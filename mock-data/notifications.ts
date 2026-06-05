export type {
  NotificationItem,
  NotificationKind,
} from "@/lib/notifications";

export { NOTIFICATION_KINDS } from "@/lib/notifications";

/** @deprecated Notifications load from `/api/me/notifications`. */
export const MOCK_NOTIFICATIONS = [] as const;
