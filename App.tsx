import React from 'react';

import { StyleSheet, AsyncStorage, View, Text } from 'react-native';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { cache } from './src/cache'

import { GET_AUTH_STATUS } from './src/operations/queries/getAuthStatus'

import { ApolloClient, createHttpLink, ApolloProvider, useQuery, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


// SCREENS

import { HomeScreen } from './src/screens/HomeScreen'
import { SignInScreen } from './src/screens/SignInScreen';

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:30001/',
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


const App = () => {


  const GET_MATCHES = gql`
  query GetMatches {
    matches {
      name
    }
  }
`

const { loading, data, error } = useQuery(GET_MATCHES)

console.log(loading, data, error)

  // const { loading, data, error } = useQuery(GET_ALL_MACHES);
  // const { data } = useQuery(GET_AUTH_STATUS)
  // const auth = data.auth


  // const matches = data && data.matches.map(m => ({ name: m.name}))

  return (
    <View>
      <Text>Hola</Text>
    </View>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
    //     {/* {
    //      auth.isLoggedIn 
    //       ? <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
    //       : <Stack.Screen name="LoginScreen" component={SignInScreen}></Stack.Screen> 
          
    //     } */}
        
    //   </Stack.Navigator> 
    // </NavigationContainer>
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
