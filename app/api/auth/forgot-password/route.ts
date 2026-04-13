import { NextResponse } from "next/server";

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

  // Stub: no email is sent yet; response is the same for every valid email (no enumeration).
  return NextResponse.json({ ok: true });
}
