export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  const session = await getToken({
    req,
    secret: "rentalsystem2023",
    // secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  if (pathname.startsWith("/api/privet")) {
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (pathname.startsWith("/dashboard")) {
    if (!session) return NextResponse.redirect(`${origin}/login`);
  }

  if (pathname.startsWith("/login")) {
    if (session) return NextResponse.redirect(`${origin}/dashboard`);
  }
}

// export const config = { matcher: ["/badr"] };
