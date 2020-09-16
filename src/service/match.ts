
import { useApolloClient } from '@apollo/client'
import { SIGN_IN } from '../operations/queries/getAuthStatus'
import { AsyncStorage } from 'react-native';
import { authMutations } from '../operations/mutations/index'


export class GraphAPI {

  client: any

  constructor(client: any) {
    this.client = client
  }

  signIn = async (email: string, password: string) => {
    try {
      const { data } = await this.client.query({
        query: SIGN_IN,
        variables: { email, password },
        fetchPolicy: 'no-cache'
      })

      const { loginUser: { token, user: { phone: { verified } } } } = data

      await AsyncStorage.setItem('token', token)
      await authMutations.signInUserAndCheckPhone(true, verified)
      // await authMutations.updateAuthToken(verified)

    } catch (err) {
      console.log(err.toString())
    }
 
  }

  signUp = async(data: any) => {
      try {
        await AsyncStorage.setItem('token', data.signUpUser.token)
        authMutations.signInUser(true)
      } catch (err) {
        console.log(err.toString())
      }
  }

}