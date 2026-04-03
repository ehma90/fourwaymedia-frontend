"use client";

import { useMemo } from "react";

import {
  getDashboardSubscriptionMock,
  type DashboardSubscriptionState,
} from "@/lib/dashboard-subscription";

/**
 * Subscription flags for dashboard UI. Uses mock data until the subscription API ships.
 * TODO: swap for useSWR / server-hydrated context when `/api/me/subscription` (or similar) exists.
 */
export function useDashboardSubscription(): DashboardSubscriptionState {
  return useMemo(() => getDashboardSubscriptionMock(), []);
}
