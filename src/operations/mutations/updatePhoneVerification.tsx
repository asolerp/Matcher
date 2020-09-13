import { ReactiveVar } from "@apollo/client";
import { Auth } from '../../cache'

export default function updatePhoneVerification (authVar: ReactiveVar<Auth>) {
    return (status: boolean) => {
      authVar({...authVar(), isPhoneVerified: status})
    }
}