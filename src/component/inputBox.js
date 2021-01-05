import React, { Component } from 'react';
import { TextInput } from 'react-native';



const InputBox = (props) => {
  return (
    <TextInput
      style={{ marginTop:10 ,marginBottom:10,marginLeft:70,marginRight:70, height: height/20,width: width/6,borderRadius: 8, borderColor: 'gray', borderWidth: 0.5 }}
      onChangeText={text => props.onChangeText(text)}
      value={props.text}
      placeholder = {props.placeholder}
    />
  );
}

export default InputBox;
