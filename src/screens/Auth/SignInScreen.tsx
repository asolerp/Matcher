import React from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { Spinner } from 'native-base'
import { ButtonCustom } from '../../components/Button'


import { GraphAPI } from '../../service/match'

import { useApolloClient } from '@apollo/client'

// COMPONENTS

import { TextInputCustom } from '../../components/TextInput'
import { TouchableHighlight, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native-gesture-handler'


export const SignInScreen = ({ navigation }) => {

  const [ email, setEmail ] = React.useState("albertosolpal@gmail.com")
  const [ password, setPassword ] = React.useState("121212")

  const [ error, setError ] = React.useState()
  const [ loading, setLoading ] = React.useState(false)

  const client = useApolloClient()
  const graphAPI = new GraphAPI(client)


  const logearse = async () => {
    setLoading(true)
    try {
      await graphAPI.signIn(email, password)
      setLoading(false)
    } catch(err) {
      setError(err.toString())
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bienvenido a Matcher</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInputCustom value={email} placeholder={"Email"} onChangeText={text => setEmail(text.toLowerCase())} secure={false} />
        <TextInputCustom value={password} placeholder={"Password"} onChangeText={text => setPassword(text.toLowerCase())} secure={true} />
        {
          loading 
          ? <Spinner /> 
          : <ButtonCustom title={"Login"} full danger rounded  onPress={() => logearse()}></ButtonCustom>
        }
        <TouchableHighlight underlayColor="white" onPress={() => navigation.navigate('SignUp')}>
          <Text>Sign Up</Text>
        </TouchableHighlight>
        {
          error && <Text>{error}</Text>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flex: 1
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  inputContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  login: {
    color: 'black',
    fontWeight: 'bold'
  }
})