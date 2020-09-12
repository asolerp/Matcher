import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInputCustom } from '../../components/TextInput';
import { ButtonCustom } from '../../components/Button';

import { updatePhone } from '../../operations/mutations/updatePhone'
import { TouchableOpacity } from 'react-native-gesture-handler';


export const PhoneVerification = () => {

  const [countSent, setCountSent] = useState(0)
  const [phone, setPhone] = useState()
  const { mutate } = updatePhone();
  const [loading, setLoading] = useState(false)

  const handlePhoneInput = async () => {
    setLoading(true)
    try {
      const mutation = await mutate({variables:{ phone }})
      console.log(mutation)
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
      setCountSent(countSent + 1)
    }
  }

  return (
  <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Phone Verification</Text>
      </View>
    <View style={styles.inputContainer}>
      <TextInputCustom 
        value={phone} 
        onChangeText={text => setPhone(text)} 
        placeholder={"Teléfono"} />
      <ButtonCustom
        loading={loading}
        title={'Enviar'}
        onPress={() => handlePhoneInput()}
        />
      {
        countSent > 0 && (
          <TouchableOpacity onPress={() => handlePhoneInput()}>
            <Text style={styles.sendAgain}>Volver a envair</Text>
          </TouchableOpacity>
        )
      }
    </View>
    <View style={styles.titleContainer}></View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 70,
  },
  sendAgain: {
    color: '#9e9e9e'
  }
});