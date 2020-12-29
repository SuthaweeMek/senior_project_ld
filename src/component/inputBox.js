import React, { Component } from 'react';
import { TextInput } from 'react-native';

const InputBox = () => {
  const [value, onChangeText] = React.useState();

  return (
    <TextInput
      style={{ marginTop:10 ,marginBottom:10,marginLeft:70,marginRight:70, height: 40,width: 200,borderRadius: 8, borderColor: 'gray', borderWidth: 0.5 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  );
}

export default InputBox;