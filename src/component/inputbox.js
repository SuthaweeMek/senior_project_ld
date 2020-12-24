import React, { Component } from 'react';
import { TextInput } from 'react-native';

const inputbox = ({text,onChangeText}) => {
  return (
    <TextInput
      style={{ height: 40,width:160,marginTop:5,marginBottom:5,borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={text}
    />
  );
}

export default inputbox;
