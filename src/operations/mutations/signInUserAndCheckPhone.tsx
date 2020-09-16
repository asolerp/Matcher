import { ReactiveVar } from "@apollo/client";
import { Auth } from '../../cache'

export default function signInUserAndCheckPhone (authVar: ReactiveVar<Auth>) {
    return (logged: boolean, verified: boolean) => {
      authVar({...authVar(), isLoggedIn: logged, isPhoneVerified: verified})
    }
}