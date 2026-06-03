import { NextResponse } from "next/server";

import {
  backendUnavailableBody,
  fetchBackend,
  forwardSetCookie,
} from "@/lib/server-backend";

export const runtime = "nodejs";

export async function POST() {
  const res = await fetchBackend("/api/v1/auth/logout", { method: "POST" });
  if (!res) {
    return NextResponse.json(backendUnavailableBody(), { status: 503 });
  }

  const data = await res.json().catch(() => ({ ok: true }));
  const nextRes = NextResponse.json(data, { status: res.status });
  forwardSetCookie(res, nextRes);
  return nextRes;
}
