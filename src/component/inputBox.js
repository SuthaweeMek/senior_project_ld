import React, { Component } from 'react';
import { TextInput } from 'react-native';

const inputbox = (props) => {
  return (
    <TextInput
      style={{ height: 40,width:160,marginTop:5,marginBottom:5,borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => props.onChangeText(text)}
      value={props.text}
      placeholder = {props.placeholder}
    />
  );
}

export default inputbox;
