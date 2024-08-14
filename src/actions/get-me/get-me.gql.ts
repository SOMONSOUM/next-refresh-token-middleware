import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    getMe {
      id
      email
      created_at
      updated_at
    }
  }
`;
