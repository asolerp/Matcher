import signIn from './sigIn'
import updateAuthToken from './updateAuthToken'
import updateLoading from './updateLoading'
import updatePhoneVerification from './updatePhoneVerification'
import { authVar } from "../../cache"

export const authMutations = {
  signInUser: signIn(authVar),
  updateAuthToken: updateAuthToken(authVar),
  updateLoading: updateLoading(authVar),
  updatePhoneVerification: updatePhoneVerification(authVar)
}