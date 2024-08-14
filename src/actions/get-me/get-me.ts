"use server";

import { client } from "@/lib/apollo";
import { GET_ME } from "./get-me.gql";

export const getMe = async (): Promise<{
  me: any;
  error: string | null;
}> => {
  try {
    const { data, error } = await client.query({
      query: GET_ME,
    });

    if (error?.message) {
      return {
        me: null,
        error: error.message,
      };
    }

    return {
      me: data?.getMe,
      error: null,
    };
  } catch (error: any) {
    return {
      me: null,
      error: error?.message,
    };
  }
};
