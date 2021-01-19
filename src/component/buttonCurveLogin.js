/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

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
    backgroundColor: 'linear-gradient(121deg, rgba(0,241,157,1) 100%, rgba(67,87,199,1) 100%);',
    paddingVertical: 10,
    height: height-(height*0.93),
    width: width/2.5, 
    borderRadius: width/90
  },
  btnTextStyle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight:'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium'
  }
})

export default ButtonCurve;