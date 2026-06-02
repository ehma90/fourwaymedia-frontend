"use client";

import { useEffect, useState } from "react";

import { fetchShopCatalog } from "@/lib/api";
import type { ShopCatalogResponse } from "@/lib/types/shop";

type ShopCatalogState = {
  data: ShopCatalogResponse | null;
  isLoading: boolean;
  error: string | null;
};

export function useShopCatalog(): ShopCatalogState {
  const [data, setData] = useState<ShopCatalogResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const catalog = await fetchShopCatalog();
        if (!cancelled) setData(catalog);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load catalog");
          setData(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}
