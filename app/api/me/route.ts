import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { backendUnavailableBody, fetchBackend } from "@/lib/server-backend";

export const runtime = "nodejs";

function cookieHeaderFromStore(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

export async function GET() {
  const cookieHeader = cookieHeaderFromStore(await cookies());

  const res = await fetchBackend("/api/v1/me", {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });

  if (!res) {
    return NextResponse.json(backendUnavailableBody(), { status: 503 });
  }

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(request: Request) {
  const cookieHeader = cookieHeaderFromStore(await cookies());
  const body = await request.json().catch(() => ({}));

  const res = await fetchBackend("/api/v1/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res) {
    return NextResponse.json(backendUnavailableBody(), { status: 503 });
  }

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
