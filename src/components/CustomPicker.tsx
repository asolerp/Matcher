import { AntDesign } from '@expo/vector-icons'; 
import React, { useState } from 'react'
// import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, StyleSheet, Platform, Modal, Picker, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'

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
    left: 10,
    zIndex: 2
  },
  errorLabel: {
    color: "red"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#ececec',
  },
})


export const CustomPicker = (props) => {

  const [ modalVisible, setModalVisible ] = useState(false)

  const getLabel = () => {
    console.log(props.value)
    if (props.value) {
      const item = props.items.find(item => item.value === props.value)
      return item.label
    }
    return "Selecciona un item"
  }

  return (
    <React.Fragment>
    {
      Platform.OS === 'android' ? (
        <View style={[
          styles.inputWrapper, 
          props.mainWrapper,
          props.error && styles.errorInputWrapper, 
          {width: props.width}, 
          {
            ...(Platform.OS !== 'android' ? {
                zIndex: props.zIndex
            } : {marginBottom: 30})
          }
          ]}>
          <Text style={[styles.label, props.error && styles.errorLabel]}>{props.label || 'Label'}</Text>
            <Picker
              selectedValue={props.value}
              onValueChange={(itemValue) => props.onChange(itemValue)}>
              {props.items.map((i, index) => (
                <Picker.Item key={index} label={i.label} value={i.value} />
              ))}
            </Picker>
        </View>
      ) : (
        <React.Fragment>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.buttonContainer}>
                  <Text
                    style={{ color: 'black' }}
                    onPress={() => setModalVisible(false)}>
                    Done
                  </Text>
                </View>
                <View style={{backgroundColor: "white"}}>
                  <Picker
                    selectedValue={props.value}
                    onValueChange={(itemValue) => {
                      props.onChange(itemValue)
                      setModalVisible(false)
                    }}>
                    {props.items.map((i, index) => (
                      <Picker.Item
                        key={index}
                        label={i.label}
                        value={i.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        <View style={[
          styles.inputWrapper, 
          props.mainWrapper,
          props.error && styles.errorInputWrapper, 
          {width: props.width}, 
          ]}>
          <Text style={[styles.label, props.error && styles.errorLabel]}>{props.label || 'Label'}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
              <Text style={{padding: 10}}>{getLabel()}</Text>
              <AntDesign name="caretdown" style={{fontSize: 10, color: 'black', marginRight: 10}}/>
            </View>
          </TouchableOpacity>
        </View>
        </React.Fragment>
      )
    }
    </React.Fragment>
  )
}




