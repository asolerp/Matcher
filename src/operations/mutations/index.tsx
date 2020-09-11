import signIn from './sigIn'
import { authVar } from "../../cache"

export const authMutations = {
  signInUser: signIn(authVar),
}