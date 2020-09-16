import React from 'react';


// NAVIGATION
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// TABS 
import { HomeTab } from './Home/HomeTab'
import { ProfileTab } from './Profile/ProfileTab'

const Tab = createBottomTabNavigator();
 
export const MainScreen = () => {

  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeTab} />
      <Tab.Screen name="ProfileTab" component={ProfileTab} />
    </Tab.Navigator>
  )
}

