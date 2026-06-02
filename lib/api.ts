import type { ShopCatalogResponse } from "@/lib/types/shop";

export function getPublicApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  return url ?? "http://localhost:4000";
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchShopCatalog(): Promise<ShopCatalogResponse> {
  const res = await fetch(`${getPublicApiBaseUrl()}/api/v1/shop/catalog`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new ApiError("Could not load shop catalog", res.status);
  }
  return (await res.json()) as ShopCatalogResponse;
}

/** Same-origin BFF routes (session cookies on frontend host). */
export async function apiPost<T>(
  path: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = (await res.json().catch(() => ({}))) as T & {
    error?: string;
    code?: string;
  };
  if (!res.ok) {
    throw new ApiError(
      (data as { error?: string }).error ?? "Request failed",
      res.status,
      (data as { code?: string }).code,
    );
  }
  return data;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(path, { credentials: "include", cache: "no-store" });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    throw new ApiError(
      (data as { error?: string }).error ?? "Request failed",
      res.status,
    );
  }
  return data;
}

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
};

export type DownloadedAsset = {
  id: string;
  title: string;
  category: "Motion" | "Design" | "Video";
  thumbnailUrl?: string;
  downloadedAt: string;
  productHref: string;
  fileHref?: string;
  catalogItemId?: string;
};
