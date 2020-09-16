import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import Svg, { ClipPath, Circle, Image, Path, Polyline } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


export const HexagonImageProfile = (props) => {

  useEffect(() => {
    getPermissionAsync()
  },[])

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        props.setImage(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  }

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };


  return (
    <View style={
      {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2.5,
      }
    }>
      <View style={styles.svgWrapper}>
          <Svg style={[styles.svg, Platform.OS === 'ios' && styles.shadow]} height="60%" width="60%" viewBox="-14 0 205 200" {...props}>
            <ClipPath id="clip">
              <Polyline points="87,0 174,50 174,150 87,200 0,150 0,50 87,0" 
                  fill="none"
                  stroke="black"
                  strokeWidth="3"
              />
            </ClipPath>
            <Image clipPath="url(#clip)" width="300" height="300" x="-60" y="-50" href={props.image ? { uri: props.image } : require(`../../assets/images/alberto.png`)} /> 
          </Svg>
        <TouchableOpacity style={{position: "absolute", bottom: 35, left: '-6%'}} onPress={() => _pickImage()}>
          <View style={[styles.iconWrapper, Platform.OS === 'ios' && styles.shadow]}>
            <Icon ios='ios-camera' android="md-camera" style={{fontSize: 25, color: '#919191'}}/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  svgWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  },
  svg: {
    position: "absolute",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#ededed",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 3.84,
    // elevation: 5,
  }
})