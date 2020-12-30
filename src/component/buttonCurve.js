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
    marginTop:20,
    marginBottom:13,
    backgroundColor: 'linear-gradient(121deg, rgba(0,241,157,1) 100%, rgba(67,87,199,1) 100%);',
    paddingVertical: 10,
    width: 140,
    borderRadius: width/10
  },
  btnTextStyle: {
    color: '#ffffff',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium'
  }
})

export default ButtonCurve;