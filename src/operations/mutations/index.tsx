import signIn from './sigIn'
import updateAuthToken from './updateAuthToken'
import updateLoading from './updateLoading'
import updatePhoneVerification from './updatePhoneVerification'
import { authVar } from "../../cache"
import signInUserAndCheckPhone from './signInUserAndCheckPhone'

export const authMutations = {
  signInUser: signIn(authVar),
  signInUserAndCheckPhone: signInUserAndCheckPhone(authVar),
  updateAuthToken: updateAuthToken(authVar),
  updateLoading: updateLoading(authVar),
  updatePhoneVerification: updatePhoneVerification(authVar)
}