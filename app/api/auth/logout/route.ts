import { NextResponse } from "next/server";

import { forwardSetCookie, getBackendUrl } from "@/lib/server-backend";

export const runtime = "nodejs";

export async function POST() {
  const res = await fetch(`${getBackendUrl()}/api/v1/auth/logout`, {
    method: "POST",
  });
  const data = await res.json().catch(() => ({ ok: true }));
  const nextRes = NextResponse.json(data, { status: res.status });
  forwardSetCookie(res, nextRes);
  return nextRes;
}
