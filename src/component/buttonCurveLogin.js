/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import Device from '../utils/Device'
//dimesions
width = Device.isPortrait() ? Dimensions.get('window').height : Dimensions.get('window').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('window').width : Dimensions.get('window').height //1:4.65  

const ButtonCurve = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.btnStyle}>
        <Text style={styles.btnTextStyle}> {text} </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#66b4c1',
    paddingVertical: 10,
    height: height-(height*0.93),
    width: width/2.5, 
    borderRadius: width
  },
  btnTextStyle: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'EkkamaiNew-Bold',
    //textTransform: 'uppercase',
    textAlign: 'center',
  }
})

export default ButtonCurve;