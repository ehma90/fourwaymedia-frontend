/**
 * Dashboard subscription state (Premium / paid plan).
 * Phase A uses mock values; replace `getDashboardSubscriptionMock` callers with API data
 * (e.g. GET /api/me/subscription or session claims).
 */

export type DashboardSubscriptionState = {
  isSubscribed: boolean;
  /** True while subscription status is loading from the API */
  isLoading: boolean;
};

/**
 * Phase A mock — toggle `isSubscribed` to verify sidebar behavior locally.
 * Replace with real subscription resolution when the API exists.
 */
export function getDashboardSubscriptionMock(): DashboardSubscriptionState {
  return {
    isSubscribed: false,
    isLoading: false,
  };
}
