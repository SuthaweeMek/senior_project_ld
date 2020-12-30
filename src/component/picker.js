import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";

const SelectionInput = () => {
  const [selectedValue, setSelectedValue] = useState("java");
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 40, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="เพศชาย" value="เพศชาย" />
        <Picker.Item label="เพศหญิง" value="เพศหญิง" />
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