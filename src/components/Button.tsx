import React from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'native-base'

export const ButtonCustom = (props) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button {...props}>
        <Text style={styles.signUp}>{props.title}</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    marginVertical: 20
  },
  signUp: {
    color: 'white',
    fontWeight: 'bold'
  }
})