import { client } from "@/lib/apollo";
import { REFRESH_TOKEN_MUTATION } from "./refresh-token.gql";
import { NextResponse } from "next/server";

export const refreshNewToken = async (refreshToken: string) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: {
        input: {
          refreshToken: refreshToken,
        },
      },
    });

    if (errors) {
      const error = errors[0];
      return {
        error: error,
        data: null,
      };
    }

    NextResponse.json({
      accessToken: data?.refreshToken?.accessToken,
      refreshToken: data?.refreshToken?.refreshToken,
    });

    return {
      error: null,
      data: {
        accessToken: data?.refreshToken?.accessToken,
        refreshToken: data?.refreshToken?.refreshToken,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
      data: null,
    };
  }
};
