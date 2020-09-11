import React from 'react';

import { Text, TextInput, StyleSheet } from 'react-native'   


export const TextInputCustom = (props) => {

  return (
      <TextInput style={styles.input} {...props}/>
  )
}

const styles = StyleSheet.create({
  label: {
    width: '100%',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
    padding: 10,
    marginBottom: 10
  }
});
