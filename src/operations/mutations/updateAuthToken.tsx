import { ReactiveVar } from "@apollo/client";
import { Auth } from '../../cache'

export default function updateAuthToken (authVar: ReactiveVar<Auth>) {
    return (token: string) => {
      authVar({...authVar(), authToken: token})
    }
}