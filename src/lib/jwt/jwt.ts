import { getMe } from "@/actions/get-me";
import { JwtPayload } from "@/common/types/jwt-payload";
import { jwtVerify } from "jose";
import { ACCESS_TOKEN_SECRET_KEY } from "./secret-key";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/common/constants";

export const decrypt = async (
  token: string | undefined = "",
  key: Uint8Array
) => {
  try {
    const { payload } = await jwtVerify<JwtPayload>(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
};

export async function verifySession() {
  const token = cookies().get("accessToken")?.value;
  const payload = await decrypt(token, ACCESS_TOKEN_SECRET_KEY);

  const { me, error } = await getMe();

  if (error && !payload?.sub) {
    redirect(ROUTES.LOGIN);
  }

  return {
    me,
  };
}
