import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native"
import { GET_ME } from '../operations/queries/getAuthStatus'
import { useQuery } from '@apollo/client';

import { authMutations } from '../operations/mutations/index'
import { Spinner } from 'native-base';


 
export const HomeScreen = () => {

  const { loading, data, error } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network'
  })

  const logOut = () => {
    authMutations.signInUser(false)
  }

  return (
    <View style={styles.container}>
      {
        data && (
          <React.Fragment>
            { loading && <Spinner/> }
            <Text>Hola {data && data.me.email}</Text>
            { data.me.matches.map((match)=> <Text key={match.id}>{match.name}</Text>)}
          </React.Fragment>
        )
      }
      <Button title={"Log Out"} onPress={() => logOut()} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

})