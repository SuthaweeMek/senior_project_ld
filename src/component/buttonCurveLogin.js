/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils/Device';
import Device from '../utils/Device'
import { connect } from 'react-redux';


const ButtonCurve = ({ text, onPress ,orientation}) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles(orientation).btnStyle}>
        <Text style={styles(orientation).btnTextStyle}> {text} </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = (props)  => StyleSheet.create({
  btnStyle: {
    backgroundColor: '#66b4c1',
    //paddingVertical: 10,
    height: hp('6%'),
    width: wp('90%'),
    borderRadius: height
  },
  btnTextStyle: {
    color: '#ffffff',
    height: hp('6%'),
    width: wp('90%'),
    fontSize: hp('3%'),
    //backgroundColor:"red",
    fontFamily: 'EkkamaiNew-Bold',
    //textTransform: 'uppercase',
    textAlignVertical :'center',
    textAlign: 'center',
  }
})

const mapStateToProps = state => {
  return {
    orientation: state.orientation,
  }
}

export default connect(mapStateToProps, null)(ButtonCurve);