import React, { useEffect } from 'react';

import { StyleSheet, AsyncStorage, View, Text, Platform } from 'react-native';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { cache } from './src/cache'

import { GET_AUTH_STATUS } from './src/operations/queries/getAuthStatus'

import { ApolloClient, createHttpLink, ApolloProvider, useQuery, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


// SCREENS

import { SignInScreen } from './src/screens/Auth/SignInScreen';
import { SignUpScreen } from './src/screens/Auth/SignUpScreen';
import { PhoneVerification } from './src/screens/Auth/PhoneVerification';
import { CodeVerification } from './src/screens/Auth/CodeVerification';
import { MainScreen } from './src/screens/Main/Main';

const httpLink = createHttpLink({
  uri: Platform.OS === 'ios' ? 'http://127.0.0.1:30001/' : 'http://10.0.2.2:30001/',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export default function AppWrapper () {


  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
  })

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

const Stack = createStackNavigator();

const authScreens = {
  SignUp: {
    component: SignUpScreen,
    options: { headerShown: false}
  },
  SignIn: {
    component: SignInScreen,
    options: { headerShown: false}
  },
}

const homeScreens = {
  Home: {
    component: MainScreen
  }
}

const phoneScreens = {
  Phone: {
    component: PhoneVerification,
    options: { headerShown: false}
  },
  Code: {
    component: CodeVerification,
    options: { headerShown: false}
  },

}

const stackHandler = (auth) => {
  if (auth.isLoggedIn) {
    return auth.isPhoneVerified ? homeScreens : phoneScreens
  }
  return authScreens
  // return homeScreens
}


const App = () => {

  // const { loading, data, error } = useQuery(GET_ALL_MACHES);
  const { data } = useQuery(GET_AUTH_STATUS)
  const auth = data.auth

  // const matches = data && data.matches.map(m => ({ name: m.name}))

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Object.entries({
          // Use the screens normally
          // Use some screens conditionally based on some condition
          ...(stackHandler(auth)),
        }).map(([name, {component, options}]) => (
          <Stack.Screen key={`key-${name}`} name={name} options={{...options}} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
