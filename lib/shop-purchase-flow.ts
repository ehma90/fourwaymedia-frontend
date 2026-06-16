export const SHOP_BUY_QUERY_KEY = "buy";

export function shopPurchasePath(templateId: string): string {
  return `/shop?${SHOP_BUY_QUERY_KEY}=${encodeURIComponent(templateId)}`;
}

export function signInForPurchasePath(templateId: string): string {
  return `/sign-in?next=${encodeURIComponent(shopPurchasePath(templateId))}`;
}

export function safeInternalPath(path: string | null, fallback = "/dashboard"): string {
  if (path?.startsWith("/") && !path.startsWith("//")) {
    return path;
  }
  return fallback;
}
