import { gql, useMutation } from "@apollo/client";


export const VERIFIED_CODE = gql`
  mutation CheckCode ($code: String!) {
    codeVerification(code: $code) {
      phone
    }
  }
`

export const checkCode = () => {
  const [mutate, { data, error}] = useMutation(VERIFIED_CODE)
  return { mutate, data, error }
}