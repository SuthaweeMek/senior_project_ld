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
import Color from '../resource/color'
import Device from '../utils/Device'
import {FontSize,LayoutSize} from '../resource/dimension'
import { connect } from 'react-redux';


const ButtonCurve = ({ text, onPress ,orientation,size}) => {
  // console.log("ButtonCurve : size = ",FontSize.BUTTON)
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles({orientation,size}).btnStyle}>
        <Text style={styles({orientation,size}).btnTextStyle}> {text} </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = (props)  =>  StyleSheet.create({

  btnStyle: {
    // backgroundColor: '#66b4c1',
    backgroundColor : Color.Surface,
    //paddingVertical: 10,
    height: LayoutSize.ButtonHeight,
    width: props.size.wp,
    minWidth : LayoutSize.ButtonMinWidth,
    paddingHorizontal: LayoutSize.ButtonPaddingHorizontal,
    borderRadius: LayoutSize.ButtonRadius,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnTextStyle: {
    flex:1,
    height:18,
    color: Color.White,
    // height: hp('6%'),
    // width: wp('90%'),
    // fontSize: props.orientation=="portrait"?wp("3%"):wp("2%"),
    fontSize : Device.fontSizer(FontSize.BUTTON),
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