import { ReactiveVar } from "@apollo/client";
import { Auth } from '../../cache'

export default function signIn (authVar: ReactiveVar<Auth>) {
    return (status: boolean) => {
      authVar({isLoggedIn: status})
    }
}