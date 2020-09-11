import { gql, useMutation } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp ($email: String!, $password: String!) {
    signUpUser(email: $email, password: $password)
  }
`

export const signUp = () => {
  const [mutate, { data, error}] = useMutation(SIGN_UP)
  return { mutate, data, error }
}