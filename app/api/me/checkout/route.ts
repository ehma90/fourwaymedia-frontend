import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getBackendUrl } from "@/lib/server-backend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${getBackendUrl()}/api/v1/me/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
