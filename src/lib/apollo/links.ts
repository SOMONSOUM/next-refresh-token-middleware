import { HttpLink } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/graphql";

export const mainServerLink = new HttpLink({
  uri: API_URL,
  headers: {
    "apollo-require-preflight": "true",
  },
  fetchOptions: { cache: "no-store" },
});

export const uploadLink = createUploadLink({
  uri: API_URL,
  headers: {
    "apollo-require-preflight": "true",
  },
  fetchOptions: { cache: "no-store" },
});
