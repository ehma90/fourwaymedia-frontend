import { NextResponse } from "next/server";

import { backendUnavailableBody, fetchBackend } from "@/lib/server-backend";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 400 },
    );
  }

  const raw =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email
      : "";
  const email = raw.trim();

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  // The backend answers identically whether or not the account exists (no enumeration).
  const res = await fetchBackend("/api/v1/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res) {
    return NextResponse.json(backendUnavailableBody(), { status: 503 });
  }

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
