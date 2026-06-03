const API_URL = process.env.API_URL?.replace(/\/$/, "") ?? "http://localhost:4000";

export function getBackendUrl(): string {
  return API_URL;
}

/** Fetch backend API; returns null when the server is not reachable (e.g. not running). */
export async function fetchBackend(
  path: string,
  init?: RequestInit,
): Promise<Response | null> {
  try {
    return await fetch(`${getBackendUrl()}${path}`, {
      ...init,
      cache: "no-store",
    });
  } catch (error) {
    console.error(
      `[bff] Cannot reach backend at ${getBackendUrl()}${path}:`,
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

export const BACKEND_UNAVAILABLE_MESSAGE =
  "Backend unavailable. Start fourwaymedia-backend on port 4000.";

export function backendUnavailableBody() {
  return {
    error: BACKEND_UNAVAILABLE_MESSAGE,
    code: "BACKEND_UNAVAILABLE" as const,
  };
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
