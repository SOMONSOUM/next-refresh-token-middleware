"use server";

import { client } from "@/lib/apollo";
import { LoginInput } from "@/schema";
import { LOGIN_MUTATION } from "./login.gql";
import { cookies } from "next/headers";

export const login = async (input: LoginInput) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        input,
      },
    });

    if (errors) {
      const error = errors[0];
      return {
        error: error,
        data: null,
      };
    }

    cookies().set({
      httpOnly: true,
      name: "accessToken",
      value: data?.login?.accessToken,
      secure: true,
    });

    cookies().set({
      httpOnly: true,
      name: "refreshToken",
      value: data?.login?.refreshToken,
      secure: true,
    });

    return {
      error: null,
      data: {
        accessToken: data?.login?.accessToken,
        refreshToken: data?.login?.refreshToken,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
      data: null,
    };
  }
};
