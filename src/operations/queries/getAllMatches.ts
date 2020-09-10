import { gql } from "@apollo/client";

export const GET_ALL_MACHES = gql`
  query GetAllMaches {
    matches {
      name
    }
  }
`