/**
 * Dashboard subscription state (Premium / paid plan).
 * Phase A uses mock values; replace `getDashboardSubscriptionMock` callers with API data
 * (e.g. GET /api/me/subscription or session claims).
 */

export type DashboardSubscriptionState = {
  isSubscribed: boolean;
  /** True while subscription status is loading from the API */
  isLoading: boolean;
  /** Premium plan label when subscribed */
  planName: string | null;
  /** Human-readable renewal / expiry (mock until billing API exists) */
  renewalDateLabel: string | null;
};

/**
 * Phase A mock — toggle `isSubscribed` to verify sidebar and overview locally.
 * Replace with real subscription resolution when the API exists.
 */
export function getDashboardSubscriptionMock(): DashboardSubscriptionState {
  const isSubscribed = false;
  return {
    isSubscribed,
    isLoading: false,
    planName: isSubscribed ? "Premium" : null,
    renewalDateLabel: isSubscribed ? "April 15, 2026" : null,
  };
}
