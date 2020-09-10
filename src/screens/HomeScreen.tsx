import React from 'react';
import { View, Text } from "react-native"
import { GET_ALL_MACHES } from '../operations/queries/getAllMatches'
import { useQuery } from '@apollo/client';
 
export const HomeScreen = () => {

  const { loading, data, error } = useQuery(GET_ALL_MACHES)

  console.log(loading, data, error)

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}