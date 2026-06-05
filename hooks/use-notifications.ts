"use client";

import { useCallback, useEffect, useState } from "react";

import { apiGet, apiPost } from "@/lib/api";
import type { NotificationItem } from "@/lib/notifications";

type NotificationsResponse = {
  notifications: NotificationItem[];
  unreadCount: number;
};

export function useNotifications(options?: { markReadOnMount?: boolean }) {
  const markReadOnMount = options?.markReadOnMount ?? false;
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyResponse = useCallback((data: NotificationsResponse) => {
    setNotifications(data.notifications ?? []);
    setUnreadCount(data.unreadCount ?? 0);
  }, []);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiGet<NotificationsResponse>("/api/me/notifications");
      applyResponse(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load notifications");
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [applyResponse]);

  const markAllRead = useCallback(async () => {
    try {
      const data = await apiPost<NotificationsResponse>(
        "/api/me/notifications/read-all",
      );
      applyResponse(data);
      window.dispatchEvent(new Event("notifications-updated"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update notifications");
    }
  }, [applyResponse]);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    if (!markReadOnMount || isLoading || unreadCount === 0) return;
    void markAllRead();
  }, [markReadOnMount, isLoading, unreadCount, markAllRead]);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    reload,
    markAllRead,
  };
}
