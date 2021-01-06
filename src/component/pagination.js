import React, { useState,useEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,Dimensions } from "react-native";
import Device from '../utils/Device';


const DATA3 = [["1","2","3","4","5","6","7","8","9","10"],["11","12","13","14","15","16","17","18","19","20"]]
const DATA2 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
var DATA = []
var page 
// //dimesions
 width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
 height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item}</Text>
  </TouchableOpacity>
);

generateData = (number,split) => {
  them = []
  data = []
  i=1
  while(i<=number){
    them.push(String(i))
    i++
    if(them.length == split){
      data.push(them)
      them = []
    }
  }
  them.length == 0 ? null : data.push(them)
  return data
}

const Pagination = (props) => {
  const [selectedId, setSelectedId] = useState("1");
  page = props.paging
  console.log("props page",props.paging,"props number",props.number,"props split",props.split)
  DATA = generateData(props.number,props.split)
  console.log("selected :",selectedId)

  

  const renderItem = ({ item }) => {
    const backgroundColor = item === selectedId ? "#6e3b6e" : "#f9c2ff";
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item)}
        style={{ backgroundColor }}
      />
    );
  };

  useEffect(() => {
},[selectedId])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA[page]}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        extraData={selectedId}
        horizontal={true}
        initialNumToRender={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    borderRadius: width/50,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width : width/18,
    height : width/18,
    alignItems : "center"
  },
  title: {
    fontSize: 26,
  },
});

export default Pagination;