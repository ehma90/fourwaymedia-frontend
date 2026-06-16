import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { safeInternalPath } from "@/lib/shop-purchase-flow";

const SESSION_COOKIE = "fw_customer_session";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const signIn = new URL("/sign-in", request.url);
      signIn.searchParams.set("next", pathname);
      return NextResponse.redirect(signIn);
    }
  }

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    if (token) {
      const next = request.nextUrl.searchParams.get("next");
      return NextResponse.redirect(
        new URL(safeInternalPath(next), request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
