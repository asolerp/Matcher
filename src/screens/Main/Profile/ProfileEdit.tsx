import React, { useEffect, useState } from 'react';
import { View, Text, Platform, KeyboardAvoidingView, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { ProfileTextInput } from '../../../components/ProfileTextInput'
import { useForm, Controller } from "react-hook-form";
import HideWithKeyboard from 'react-native-hide-with-keyboard';

// APOLLO
import { useQuery } from '@apollo/client';
import { GET_ME_PROFILE } from '../../../operations/queries/getAuthStatus';


// COMPONENTS
import { ButtonCustom } from '../../../components/Button'
import { CustomPicker } from '../../../components/CustomPicker';
import { HexagonImageProfile } from '../../../components/HexagonImageProfile';


export const ProfileEdit = ({navigation}) => {

  const [ errorForm, setErrorForm ] = useState()
  const { register, handleSubmit, errors } = useForm();
  const [image, setImage] = useState("")

  const [ formulario, setFormulario ] = useState({})
  
  const { loading, data, error } = useQuery(GET_ME_PROFILE, {
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    setFormulario({
      email: data && data.me.email
    })
  },[data])


  const nameInputRef = React.useRef()
  const ageInputRef = React.useRef()
  const heightInputRef = React.useRef()
  const nationalityInputRef = React.useRef() 
  const positionInputRef = React.useRef()


  const onSubmit = data => console.log(data);

  return (
    <KeyboardAvoidingView 
        style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}>         
        {/* <ScrollView style={{height: "100%"}}> */}
          <View style={styles.imageWrapper}>
            <HideWithKeyboard>
              <HexagonImageProfile navigation={navigation} setImage={setImage} image={image}/>
            </HideWithKeyboard>
          </View> 
          <View style={styles.formWrapper}>
            <ProfileTextInput
                  reference={register}
                  error={errors.email}
                  width={"100%"}
                  label={"Email"}
                  onChangeText={value => setFormulario({...formulario, email: value})}
                  value={formulario.email || ""}
                />
            {/* <Controller
              onFocus={() => {
                nameInputRef.current.focus()
              }}
              control={control}
              render={({ onChange, onBlur, value }) => (
                <ProfileTextInput
                  reference={nameInputRef}
                  error={errors.name}
                  width={"100%"}
                  label={"Nombre"}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={data.me && data.me.email || value}
                />
              )}
              name="name"
              rules={{ required: "El nombre es obligatorio" }}
              defaultValue=""
            /> */}
            {/* <View style={styles.row2}>
              <Controller
                onFocus={() => {
                  ageInputRef.current.focus()
                }}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <ProfileTextInput
                  reference={ageInputRef}
                  error={errors.age}
                    mainWrapper={{
                      marginRight: 20
                    }}
                    width={120}
                    label={"Edad"}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                rules={{ required: "La edad es obligatoria" }}
                name="age"
                defaultValue=""
              />
              <Controller
                onFocus={() => {
                  heightInputRef.current.focus()
                }}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <ProfileTextInput
                    error={errors.height}
                    reference={heightInputRef}
                    width={120}
                    label={"Altura"}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                rules={{ required: "La altura es obligatoria"}}
                name="height"
                defaultValue=""
              />
            </View> */}
            {/* <View style={{
              ...(Platform.OS !== 'android' && {
                  zIndex: 10
              })
            }}>
              <Controller
                onFocus={() => {
                  nationalityInputRef.current.focus()
                }}
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <CustomPicker
                  zIndex={4}
                  items={[
                    {label:"España", value:"sp"},
                    {label:"Estados Unidos", value:"eeuu"}
                  ]}
                  value={value}
                  error={errors.nationality}
                  width={"100%"}
                  label={"Nacionalidad"}
                  onBlur={onBlur}
                  onChange={onChange}
                />
                )}
                rules={{ required: "La nacionalidad es obligatoria"}}
                name="nationality"
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <CustomPicker
                    zIndex={3}
                    items={[
                      {label:"Delantero", value:"del"},
                      {label:"Medio", value:"md"}
                    ]}
                    value={value}
                    error={errors.position}
                    reference={positionInputRef}
                    width={"100%"}
                    label={"Posición"}
                    onBlur={onBlur}
                    onChange={onChange}
                    />
                )}
                rules={{ required: "La posición es obligatoria" }}
                name="position"
                defaultValue=""
              />
          </View> */}
        </View>
        <View style={[styles.actionButton, {zIndex:1}]}>
          {errors && <Text style={{color: "black"}}>{errors.message}</Text>}
          <ButtonCustom 
            title={"Guardar"} full danger rounded  onPress={handleSubmit(onSubmit)}></ButtonCustom>
        </View>
    {/* </ScrollView> */}
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 40,
    height: '100%',
    backgroundColor: 'white'
  },
  imageWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2.5,
  },
  image: {
    width: 176,
    height: 197
  },
  formWrapper: {
    width: '100%',
    justifyContent: 'center',
    flex: 3,
    zIndex: 2,
    marginTop: 25
  },
  row2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%'
  },
  actionButton: {
    flex: 1,
    zIndex: 1
  }
})