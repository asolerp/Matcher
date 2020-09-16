import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  inputWrapper:{
    borderWidth: 0.5,
    borderColor: '#535353',
    borderRadius: 5,
    position: 'relative',
    marginBottom: 30,
  },
  errorInputWrapper:{
    borderColor: 'red',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    color: '#535353',
    top: -10,
    left: 10
  },
  errorLabel: {
    color: "red"
  },
  input: {
    padding: 9
  }
})


export const ProfileTextInput = (props) => {
  return (
    <View style={[
      styles.inputWrapper, 
      props.error && styles.errorInputWrapper, 
      {width: props.width}, 
      props.mainWrapper
      ]}>
      <Text style={[styles.label, props.error && styles.errorLabel]}>{props.label || 'Label'}</Text>
      <TextInput ref={props.reference} style={styles.input} {...props}></TextInput>
    </View>
  )
}

