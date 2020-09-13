import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import { ButtonCustom } from '../../components/Button';

import { GET_AUTH_STATUS } from '../../operations/queries/getAuthStatus'
import {  useQuery } from '@apollo/client';


// MUTATIONS
import { checkCode } from '../../operations/mutations/checkCode'
import { authMutations } from '../../operations/mutations/index'

 
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
 
const styles = StyleSheet.create({
  root: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 70,
    width: '100%'
  },
  codeFieldRoot: {
    marginTop: 20,
    display: "flex",
    width: '100%',
    justifyContent: 'space-between'
  },
  codeContainer: {
    flex: 3,
    justifyContent:'center',
    alignItems: 'center',
    width: '100%'
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ffd6d6',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#CC1D1D',
  },
  sendAgain: {
    color: '#9e9e9e'
  }
});
 
const CELL_COUNT = 6;
 
export const CodeVerification = () => {

  const [countSent, setCountSent] = useState(0)
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { mutate } = checkCode();

  const { data } = useQuery(GET_AUTH_STATUS)
  const auth = data.auth

  const handleCodeInput = async () => {
    // authMutations.updateLoading(true)
    try {
      await mutate({variables:{code:value}})
      // authMutations.updatePhoneVerification(true)
    } catch (err) {
      console.log(err)
    } 
    // finally {
    //   authMutations.updateLoading(false)
    //   setCountSent(countSent + 1)
    // }
  }
 
  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Verificación de teléfono</Text>
      </View>
      <View style={styles.codeContainer}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <ButtonCustom
        loading={auth.loading}
        title={'Enviar'}
        onPress={() => handleCodeInput()}
        />
        {
        countSent > 0 && (
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.sendAgain}>Volver a envair</Text>
          </TouchableOpacity>
        )
      }
      </View>
      <View style={styles.titleContainer}></View>
    </View>
  );
};
 
