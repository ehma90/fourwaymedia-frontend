"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { apiGet, type DownloadedAsset } from "@/lib/api";

export function usePurchases() {
  const [downloads, setDownloads] = useState<DownloadedAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const reload = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiGet<{ downloads: DownloadedAsset[] }>(
        "/api/me/downloads",
      );
      if (requestId !== requestIdRef.current) return;
      setDownloads(data.downloads ?? []);
    } catch (e) {
      if (requestId !== requestIdRef.current) return;
      setError(e instanceof Error ? e.message : "Failed to load purchases");
      setDownloads([]);
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch-on-mount: setState inside reload() is the intended loading/error sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  return { downloads, isLoading, error, reload };
}
