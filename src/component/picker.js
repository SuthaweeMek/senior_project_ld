import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";

const SelectionInput = (props) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={props.value}
        style={{ height: 40, width: 200 }}
        onValueChange={(itemValue, itemIndex) => props.onChangeGender(itemValue)}
      >
        <Picker.Item label="เพศชาย" value="male" />
        <Picker.Item label="เพศหญิง" value="female" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height/20,
    width: width/6,
    marginTop:10,
    paddingBottom:30,
    marginLeft:70,
    marginRight:70,
    borderRadius: 8,
    alignItems: "center", 
    borderColor: 'gray', 
    borderWidth: 0.5
  }
});

export default SelectionInput;