import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux'
import Color from '../resource/color'
import { Icon } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import { FontSize, LayoutSize } from '../resource/dimension'
import Device from '../utils/Device';

const PickerCurve = (props) => {
  const [modalVisible, setModalvisible] = useState(false)
  const [selected, setSelected] = useState(props.value)
  const orientation = props.orientation
  const size = props.size
  const items = props.items

  useEffect(() => {
    props.onChangeItem(selected)
    setModalvisible(false)
  }, [selected])


  const Item = ({ text, value,onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
        <View style={[styles({ orientation, size }).radio, selected.value == value ? { borderColor: Color.Surface } : { borderColor: Color.Gray}]} >
        <View style={[styles({ orientation, size }).radioInner, selected.value == value ? { backgroundColor: Color.Surface } : { backgroundColor: null}]} />
        </View>
        <Text style={[styles({ orientation, size }).textModal, selected.value == value ? { color: Color.Cover } : { color: Color.Black }]} >{text}</Text>
      </View>

    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const color = item === selected ? "red" : "blue";
    console.log("items is ", item)
    return (
      <Item
        text={item.text}
        value={item.value}
        onPress={() => { setSelected(item) }}
      />
    );
  };

  return (
    <View style={styles({ orientation, size }).container}>
      <TouchableOpacity onPress={() => { setModalvisible(true) }}>
        <View style={styles({ orientation, size }).picker}>
          <Text style={styles({ orientation, size }).itemText}>{selected.text}</Text>
          <Icon
            //reverse
            name={"sort-down"}
            type='font-awesome-5'
            color={Color.Sub_Surface}
            size={hp("4%")}
            style={styles({ orientation, size }).icon}
          />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalvisible(false) }}>
        <TouchableWithoutFeedback onPress={() => { setModalvisible(false) }}>
          <View style={styles({ orientation, size }).overlay}>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles({ orientation, size }).innerModal}>
          <View style={styles({ orientation, size }).infoModal}>
            <Text style={styles({ orientation, size }).titleModal} >{props.title}</Text>
            <FlatList
              data={items}
              renderItem={renderItem}
              key={item => item.key}
              keyExtractor={item => item.key}
              extraData={selected}
            />
          </View>
        </View>

      </Modal>
    </View>
  );
}

const styles = (props) => StyleSheet.create({
  container: {
    // paddingHorizontal: 12,
    // flex:1,
    // justifyContent: "center",
    // alignContent:"center",
    // alignItems:"center",
    // alignSelf:"center",
    // height: height/20,
    // width: width/6,
    // marginTop:10, 
    // paddingBottom:30,
    // marginLeft:70,
    // marginRight:70,
    // borderRadius: 8,
    // alignItems: "center", 
    // borderColor: 'gray', 
    // borderWidth: 0.5
  },
  picker: {
    flexDirection: "row",
    borderColor: Color.Surface,
    borderWidth: LayoutSize.PickerBorderWidth,
    width: props.size.wp,
    minWidth : LayoutSize.PickerMinWidth,
    paddingHorizontal : LayoutSize.PickerPaddingHorizontal,
    height: LayoutSize.PickerHeight,
    borderRadius: LayoutSize.PickerRadius,
    // justifyContent:"flex-start",
    // alignItems:"center",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    // backgroundColor:"red",
    // alignItems:"flex-end",
    // justifyContent:"flex-end",
    //  alignSelf:"flex-end",
    // alignContent:"flex-end",
    paddingLeft: 12,
    height: props.size.hp,
  },
  itemText: {
    fontSize: Device.fontSizer(FontSize.BUTTON),
    fontFamily: "EkkamaiNew-Regular",
  },
  overlay: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // flexWrap:"wrap",
    // alignSelf:"center",
    // padding:wp("3%"),
    // margin:hp("10%"),
    position: "absolute",
    alignSelf: 'flex-end',
    zIndex: 1,
    backgroundColor: "#00000080",
    width: wp("100%"),
    height: hp("100%"),
    //backgroundColor:"red"
  },
  innerModal: {
    justifyContent: "center",
    //  alignContent:"center",
    alignItems: "center",
    // flexWrap:"wrap",
    // alignSelf:"center",
    // padding:wp("3%"),
    // margin:hp("10%"),
    flex: 1,
  },
  infoModal: {
    zIndex: 2,
    backgroundColor: Color.White,
    width: props.orientation == "portrait" ? hp("30%") : hp("40%"),
    // alignSelf:"center",
    alignItems: "center",
    justifyContent: "center",
    //height:hp('50%'),
    margin: hp('3%'),
    padding: hp('3%'),
    borderRadius: hp('3%')

  },
  textModal: {
    fontFamily: "EkkamaiNew-Regular",
    fontSize: Device.fontSizer(FontSize.Body1),
    marginVertical: 12,
  },
  radio: {
    height: 24,
    width: 24,
    borderColor: Color.Gray,
    borderWidth: 2,
    borderRadius:24,
    marginRight:24,
    justifyContent:"center",
    alignItems:"center",
  },
  radioInner: {
    height: 16,
    width: 16,
    borderRadius:24,
    borderWidth: 1,
    borderColor:Color.White
    

  },
  titleModal: {
    fontFamily: "EkkamaiNew-Bold",
    fontSize: Device.fontSizer(FontSize.H6)
  }
});

const mapStateToProps = state => {
  return {
    orientation: state.orientation,
  }
}

export default connect(mapStateToProps, null)(PickerCurve);