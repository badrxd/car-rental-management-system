export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  let session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  if (pathname.startsWith("/api/privet")) {
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (session?.role !== "ADMIN")
      return NextResponse.json(
        { error: "You an not authirized" },
        { status: 403 }
      );
  }
  if (pathname.startsWith("/dashboard")) {
    if (!session) return NextResponse.redirect(`${origin}/login`);
    if (session?.role !== "ADMIN") return NextResponse.redirect(`${origin}`);
  }
  if (pathname.startsWith("/login")) {
    if (session) return NextResponse.redirect(`${origin}/dashboard`);
  }
  if (pathname.startsWith("/403")) {
    if (session && session?.role !== "ADMIN")
      return NextResponse.redirect(`${origin}`);
  }
}

// export const config = { matcher: ["/badr"] };
