import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { Spinner } from 'native-base'
import { ButtonCustom } from '../../components/Button'

import { useApolloClient } from '@apollo/client'

// MUTATIONS

import { signUp } from '../../operations/mutations/signUp'

// COMPONENTS

import { TextInputCustom } from '../../components/TextInput'


export const SignUpScreen = ({ navigation }) => {

  const [ email, setEmail ] = React.useState("albertosolpal@gmail.com")
  const [ password, setPassword ] = React.useState("121212")

  const { mutate } = signUp();

  const [ error, setError ] = React.useState()
  const [ loading, setLoading ] = React.useState(false)

  const client = useApolloClient()


  const handlerSignUp = async () => {
    setLoading(true)
    try {
      await mutate({variables:{email, password}})
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
          : <ButtonCustom title={"Sign Up"} full danger rounded  onPress={() => handlerSignUp()}></ButtonCustom>
        }
        <TouchableHighlight underlayColor="white" onPress={() => navigation.navigate('SignIn')}>
          <Text>Login</Text>
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
  buttonWrapper: {
    width: '100%',
    marginVertical: 20
  },
  signUp: {
    color: 'white',
    fontWeight: 'bold'
  }
})