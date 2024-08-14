import { refreshNewToken } from "@/actions/refresh-token";
import { isTokenExpired } from "@/lib/is-token-expired";
import { decrypt } from "@/lib/jwt";
import { ACCESS_TOKEN_SECRET_KEY } from "@/lib/jwt/secret-key";
import { NextRequest, NextResponse } from "next/server";

export async function refreshTokenMiddleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const payload = await decrypt(accessToken, ACCESS_TOKEN_SECRET_KEY);

  // Check access token is expired or not
  if (isTokenExpired(payload) && refreshToken) {
    const { data } = await refreshNewToken(refreshToken);
    if (data?.accessToken && data.refreshToken) {
      const response = NextResponse.next();

      response.cookies.set("accessToken", data.accessToken, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        path: "/",
      });

      response.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        path: "/",
      });

      return response;
    }
  }
}
