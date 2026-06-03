import { NextResponse } from "next/server";

import {
  backendUnavailableBody,
  fetchBackend,
  forwardSetCookie,
} from "@/lib/server-backend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetchBackend("/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res) {
    return NextResponse.json(backendUnavailableBody(), { status: 503 });
  }

  const data = await res.json().catch(() => ({}));
  const nextRes = NextResponse.json(data, { status: res.status });
  forwardSetCookie(res, nextRes);
  return nextRes;
}
