import { NextRequest, NextResponse } from "next/server";

import supabaseServer from "./lib/supabaseServer";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const {
    data: { session },
  } = await supabaseServer().auth.getSession();

  // Allow user to access Auth callback route using Magic Link.
  if (!session && req.nextUrl.pathname.startsWith("/auth/callback")) {
    return res;
  }

  // Redirect public user to the Login page.
  if (!session) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  // Prevent logged-in user from accessing Login page.
  if (session && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
