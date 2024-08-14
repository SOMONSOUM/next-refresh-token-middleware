import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./common/constants";
import { decrypt } from "./lib/jwt";
import { ACCESS_TOKEN_SECRET_KEY } from "./lib/jwt/secret-key";
import { refreshTokenMiddleware } from "./common/middlewares";

const protectedRoutes = ["/"];
const publicRoutes = ["/login"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoutes = protectedRoutes.includes(pathname);
  const isPublicRoutes = publicRoutes.includes(pathname);

  const accessToken = request.cookies.get("accessToken")?.value;
  const payload = await decrypt(accessToken, ACCESS_TOKEN_SECRET_KEY);

  // Check access token is expired or not
  const response = await refreshTokenMiddleware(request);
  if (response) {
    return response;
  }

  if (isProtectedRoutes && !payload?.sub) {
    const response = NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  }

  if (isPublicRoutes && payload?.sub) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
