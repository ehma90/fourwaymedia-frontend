"use client";

import { useCallback, useEffect, useState } from "react";

import { apiGet, type DownloadedAsset } from "@/lib/api";

export function usePurchases() {
  const [downloads, setDownloads] = useState<DownloadedAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiGet<{ downloads: DownloadedAsset[] }>("/api/me/downloads");
      setDownloads(data.downloads ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load purchases");
      setDownloads([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { downloads, isLoading, error, reload };
}
