
import { InMemoryCache, makeVar, ReactiveVar } from "@apollo/client";

export type Auth = {
  isLoggedIn: boolean
  isPhoneVerified: boolean
}

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        auth: {
          read () {
            return authVar()
          }
        }
      }
    }
  }
});

/**
 * Set initial values when we create cache variables.
 */

const auth: Auth = {
  isLoggedIn: false,
  isPhoneVerified: false
}

export const authVar: ReactiveVar<Auth> = makeVar(
  auth
)