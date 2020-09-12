import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { Button } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ButtonCustom = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{display: 'flex', flexDirection: 'row'}}>
      <View style={styles.buttonWrapper}>
          {
            props.loading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.signUp}>{props.title}</Text>
          }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
    backgroundColor: '#CC1D1D',
    padding: 13,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  signUp: {
    color: 'white',
    fontWeight: 'bold',
  }
})