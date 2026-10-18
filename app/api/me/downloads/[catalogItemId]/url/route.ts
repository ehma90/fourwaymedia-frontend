import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { backendUnavailableBody, fetchBackend } from "@/lib/server-backend";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ catalogItemId: string }> };

/** Returns a short-lived download link, only for templates the user owns. */
export async function GET(_request: Request, context: RouteContext) {
  const { catalogItemId } = await context.params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetchBackend(
    `/api/v1/me/downloads/${encodeURIComponent(catalogItemId)}/url`,
    { headers: cookieHeader ? { Cookie: cookieHeader } : {} },
  );
  if (!res) {
    return NextResponse.json(backendUnavailableBody(), { status: 503 });
  }

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
