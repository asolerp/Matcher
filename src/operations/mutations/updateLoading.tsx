import { ReactiveVar } from "@apollo/client";
import { Auth } from '../../cache'

export default function updateLoading (authVar: ReactiveVar<Auth>) {
    return (status: boolean) => {
      authVar({...authVar(), loading: status})
    }
}