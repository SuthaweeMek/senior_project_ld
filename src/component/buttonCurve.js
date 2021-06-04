/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Color from '../resource/color'
import Device from '../utils/Device'
import {FontSize,LayoutSize} from '../resource/dimension'
import { connect } from 'react-redux';


const ButtonCurve = ({ text, onPress ,orientation,size}) => {
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
    backgroundColor : Color.Surface,
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
    fontSize : Device.fontSizer(FontSize.BUTTON),
    fontFamily: 'EkkamaiNew-Bold',
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