import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getBackendUrl } from "@/lib/server-backend";

export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${getBackendUrl()}/api/v1/me/downloads`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
