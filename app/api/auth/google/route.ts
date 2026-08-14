import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

import { safeInternalPath } from "@/lib/shop-purchase-flow";

export const runtime = "nodejs";

function base64Url(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64url");
}

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  if (!clientId) {
    return NextResponse.json(
      {
        error: "Google auth is not configured.",
        code: "GOOGLE_AUTH_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const requestUrl = new URL(request.url);
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI?.trim() ??
    new URL("/api/auth/google/callback", requestUrl.origin).toString();
  const state = base64Url(randomBytes(32));
  const codeVerifier = base64Url(randomBytes(64));
  const challenge = base64Url(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(codeVerifier),
      ),
    ),
  );
  const next = safeInternalPath(requestUrl.searchParams.get("next"));

  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", redirectUri);
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set("scope", "openid email profile");
  googleUrl.searchParams.set("state", state);
  googleUrl.searchParams.set("code_challenge", challenge);
  googleUrl.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(googleUrl);
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 600,
  };
  response.cookies.set("fw_google_state", state, cookieOptions);
  response.cookies.set("fw_google_verifier", codeVerifier, cookieOptions);
  response.cookies.set("fw_google_next", next, cookieOptions);
  return response;
}
