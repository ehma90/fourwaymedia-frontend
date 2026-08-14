import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { backendUnavailableBody, fetchBackend } from "@/lib/server-backend";

export const runtime = "nodejs";

function failureRedirect(request: Request) {
  return new URL("/sign-in?error=google", request.url);
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const params = requestUrl.searchParams;
  const cookieStore = await cookies();
  const state = cookieStore.get("fw_google_state")?.value;
  const codeVerifier = cookieStore.get("fw_google_verifier")?.value;
  const next = cookieStore.get("fw_google_next")?.value ?? "/dashboard";

  if (
    params.get("error") ||
    !params.get("code") ||
    !state ||
    state !== params.get("state") ||
    !codeVerifier
  ) {
    return NextResponse.redirect(failureRedirect(request));
  }

  const res = await fetchBackend("/api/v1/auth/google/callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: params.get("code"), codeVerifier }),
  });
  if (!res) {
    return NextResponse.json(backendUnavailableBody(), { status: 503 });
  }

  if (!res.ok) {
    return NextResponse.redirect(failureRedirect(request));
  }

  const redirect = NextResponse.redirect(new URL(next, request.url));
  const setCookies =
    typeof res.headers.getSetCookie === "function"
      ? res.headers.getSetCookie()
      : ([res.headers.get("set-cookie")].filter(Boolean) as string[]);
  const sessionCookie = setCookies.find((cookie) =>
    cookie.startsWith("fw_customer_session="),
  );
  const sessionValue = sessionCookie
    ?.split(";", 1)[0]
    .slice("fw_customer_session=".length);
  if (sessionValue) {
    redirect.cookies.set(
      "fw_customer_session",
      decodeURIComponent(sessionValue),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      },
    );
  }
  for (const name of [
    "fw_google_state",
    "fw_google_verifier",
    "fw_google_next",
  ]) {
    redirect.cookies.delete(name);
  }
  return redirect;
}
