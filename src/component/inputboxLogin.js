import React, { Component } from 'react';
import { TextInput,Dimensions } from 'react-native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const inputbox = (props) => {
  return (
    <TextInput
      style={{ marginTop:20 ,marginBottom:20,left:"10%", height: height/16,width: width/2.6,borderRadius: 4, borderColor: 'gray', borderWidth: 0.5 }}
      onChangeText={text => props.onChangeText(text)}
      value={props.text}
      placeholder = {props.placeholder}
    />
  );
}

export default inputbox;
