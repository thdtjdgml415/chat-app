import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("request", request.nextUrl.pathname);
  if (request.nextUrl.pathname === "/profile") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/profile",
};
