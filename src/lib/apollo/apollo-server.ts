import "server-only";

import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import type { NormalizedCacheObject } from "@apollo/client";
import { mainServerLink } from "./links";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";

const authLink = setContext(async (_, { headers }) => {
  const accessToken = cookies().get("accessToken")?.value;

  return {
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : "",
      ...headers,
    },
  };
});

const createClient = (link: HttpLink): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, link]),
    ssrMode: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
  });
};

export const client = createClient(mainServerLink);
