import React from 'react'
import { View, Button } from 'react-native'

import { GET_AUTH_STATUS } from '../operations/queries/getAuthStatus'

import { authMutations } from '../operations/mutations/index'
import { cache } from '../cache'


export const SignInScreen = () => {
  

  const logearse = () => {
    console.log("Logeando....")
    authMutations.signInUser(true)

    cache.writeQuery({
      query: GET_AUTH_STATUS,
      data: {
        isLoggedIn: 'adfasfasdfasfae3afs',
      },
    });

  }

  return (
    <View>

      <Button title={"Log In"} onPress={() => logearse()} />
    </View>
  )
}

