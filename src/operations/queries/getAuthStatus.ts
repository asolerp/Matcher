import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  query SigIn($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`

export const GET_AUTH_STATUS = gql`
  query GetAuthStatus {
    auth @client 
  }
`

export const GET_ME = gql`
  query GetMe {
    me {
      email
      matches {
        id
        name
      }
    }
  }
`
