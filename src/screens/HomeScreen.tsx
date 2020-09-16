import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native"
import { GET_ME } from '../operations/queries/getAuthStatus'
import { useQuery } from '@apollo/client';

import { authMutations } from '../operations/mutations/index'
import { Spinner } from 'native-base';


// NAVIGATION

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTab } from './Main/Home/HomeTab'

const Tab = createBottomTabNavigator()


const ProfileTab = () => {
  return (
    <View>
      <Text>Hola profile!</Text>
    </View>
  )
}
 
export const HomeScreen = () => {


  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeTab} />
      <Tab.Screen name="ProfileTab" component={ProfileTab} />
    </Tab.Navigator>
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