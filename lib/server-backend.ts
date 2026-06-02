const API_URL = process.env.API_URL?.replace(/\/$/, "") ?? "http://localhost:4000";

export function getBackendUrl(): string {
  return API_URL;
}

export function forwardSetCookie(
  backendResponse: Response,
  nextResponse: { headers: Headers },
): void {
  const setCookies =
    typeof backendResponse.headers.getSetCookie === "function"
      ? backendResponse.headers.getSetCookie()
      : [backendResponse.headers.get("set-cookie")].filter(Boolean) as string[];

  for (const cookie of setCookies) {
    nextResponse.headers.append("Set-Cookie", cookie);
  }
}
