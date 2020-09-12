import { gql, useMutation } from "@apollo/client";

export type PhoneVerificatonInput = {
  phone: string
}


export const UPDATE_PHONE = gql`
  mutation UpdatePhone ($phone: String!) {
    updatePhoneVerification(phone: $phone) {
      phone
    }
  }
`

export const updatePhone = () => {
  const [mutate, { data, error}] = useMutation(UPDATE_PHONE)
  return { mutate, data, error }
}