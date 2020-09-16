import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native"

// NAVIGATION
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './Camera';

// COMPONENTS
import { HexagonImageProfile } from '../../../components/HexagonImageProfile'
import { ProfileTextInput } from '../../../components/ProfileTextInput';
import { ProfileEdit } from './ProfileEdit'

const Stack = createStackNavigator()

const ProfileMain = ({navigation}) => {
  return (
    <View>
      <Text>Hola!!</Text>
      <Button 
      title="Editar"
      onPress={() => navigation.navigate("ProfileEdit")}
      />
    </View>
  )
}


export const ProfileTab = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="ProfileMain" component={ProfileMain} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
  )
}