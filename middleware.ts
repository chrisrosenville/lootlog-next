import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();
  let redirect = NextResponse.redirect(new URL("/sign-in", req.url));

  const cookieStore = cookies();

  const sessionCookie = req.cookies.get("session")?.value;

  res.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );

  if (sessionCookie) {
    try {
      const isAuthenticated = (await cookieStore).get(sessionCookie);

      if (isAuthenticated) {
        return res;
      } else {
        return redirect;
      }
    } catch (err) {
      console.error("Error verifying token:", err);
      return redirect;
    }
  } else {
    return redirect;
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
