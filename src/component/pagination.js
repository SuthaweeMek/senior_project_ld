import React, { useState,useEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,Dimensions } from "react-native";
import Device from '../utils/Device';
import Color from '../resource/color';
import Font from '../resource/font';
import {connect} from 'react-redux';

import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'


const DATA3 = [["1","2","3","4","5","6","7","8","9","10"],["11","12","13","14","15","16","17","18","19","20"]]
const DATA2 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
var DATA = []
var page 



const generateData = (number,split) => {
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
  page = props.paging
  DATA = generateData(props.number,props.split)
  var orientation = props.orientation
  
  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles({orientation}).item, style]}>
      <Text style={styles({orientation}).title}>{item}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item === props.selectedId ? Color.Background : Color.Sub_Background ;
    return (
      <Item
        item={item}
        onPress={() => props.setSelectedId(item)}
        style={{ backgroundColor }}
      />
    );
  };

  useEffect(() => {
},[props.selectedId])

  return (
    <SafeAreaView style={styles({orientation}).container}>
      <FlatList
        data={DATA[page]}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        extraData={props.selectedId}
        horizontal={true}
        initialNumToRender={2}
      />
    </SafeAreaView>
  );
};

const styles=(props) => StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    borderRadius: wp(1),
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width : wp(6),
    height : wp(6),
    alignItems : "center",
    justifyContent:"center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: wp(2),
    textAlign:"center",
    textAlignVertical:"center",
  },
});

const mapStateToProps = state => {
  return {
      orientation: state.orientation
  }
}


const mapDispatchToProps = dispatch => {
  return {
      upDateOrientation: (orientation) => {
          dispatch({ type: 'EDIT_ORIENTATION', payload: orientation })
      }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
