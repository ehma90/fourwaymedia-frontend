import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { backendUnavailableBody, fetchBackend } from "@/lib/server-backend";

export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetchBackend("/api/v1/me/downloads", {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  if (!res) {
    return NextResponse.json(backendUnavailableBody(), { status: 503 });
  }

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
