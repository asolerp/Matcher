
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
      console.log(data)
      // await AsyncStorage.setItem('token', data.loginUser.token)
      // authMutations.signInUser(true)
      // authMutations.updateAuthToken(data.loginUser.phoneVerified)

    } catch (err) {
      console.log(err.toString())
    }
 
  }

  signUp = async(data: any) => {
    try {
      await AsyncStorage.setItem('token', data.signUpUser)
      authMutations.signInUser(true)
    } catch (err) {
      console.log(err.toString())
    }
  }

}