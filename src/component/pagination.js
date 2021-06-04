import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import Device from '../utils/Device';
import Color from '../resource/color';
import Font from '../resource/font';
import {connect} from 'react-redux';
import { FontSize, LayoutSize } from '../resource/dimension'

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
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  item: {
    borderRadius: LayoutSize.PaginationBorderRadius,
    marginVertical: 8,
    marginHorizontal: props.orientation=="portrait" ? 6 :18,
    width : LayoutSize.PaginationWidth,
    height : LayoutSize.PaginationHeight,
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
    fontSize: Device.fontSizer(FontSize.BUTTON),
    textAlign:"center",
    textAlignVertical:"center",
    fontFamily : Font.Regular,
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
