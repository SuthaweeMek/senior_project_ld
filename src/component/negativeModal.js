import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import Color from '../resource/color';
import Font from '../resource/font';
import { Icon } from 'react-native-elements'

const negativeModal = (props) => {
  // const [modalVisible, setModalVisible] = useState(false);
  var modalVisible = props.modalVisible
  const title = props.title
  const text = props.text
  const orientation = props.orientation
  return (
    <View style={styles({ orientation }).centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles({ orientation }).centeredView}>
          <View style={styles({ orientation }).modalView}>
            <View style={styles({ orientation }).containerTitle}>
              <TouchableOpacity onPress={() => {props.onChangeVisible(!modalVisible)}}>
                <Icon
                  //reverse
                  name={"cancel"}
                  type='materialIcons'
                  color={Color.White}
                  size={hp('6%')}
                  style={{ alignSelf: "flex-end" }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles({ orientation }).containerInfomation}>
              <Icon
                  //reverse
                  name={"closecircleo"}
                  type='antdesign'
                  color={Color.Wrong}
                  size={hp('12%')}
                  style={{ alignSelf: "flex-end" }}
                />
              <Text style={styles({ orientation }).modalTitle}>{title}</Text>
              <Text style={styles({ orientation }).modalText}>{text}</Text>
              <TouchableOpacity
                style={{ ...styles({ orientation }).openButton}}
                onPress={() => {
                  props.onChangeVisible(!modalVisible);
                }}
              >
                <Text style={styles({ orientation }).textStyle}>ตกลง</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = ({ orientation }) => StyleSheet.create({
  centeredView: {
    width: wp('100%'),
    height: hp('100%'),
    // backgroundColor:"red",
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flex: 0.7,
    margin: 20,
    borderRadius: 20,
    //margin: 35,
    // justifyContent: "center",
    // alignItems: "center",
    aspectRatio : 5/6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: Color.White,
    borderRadius: wp('50%'),
    padding: 10,
    elevation: 2,
    borderWidth:2,
    width:'60%',
    borderColor:Color.Wrong,
  },
  textStyle: {
    color: Color.Wrong,
    // fontWeight: "bold",
    fontFamily:Font.Bold,
    textAlign: "center",
    fontSize:hp('3%'),

  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily:Font.Bold,
    fontSize:hp('4%'),
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily:Font.Bold,
    fontSize:hp('2%'),
    paddingHorizontal:12,
    color:Color.Gray
  },
  containerTitle: {
    flex: 3,
    backgroundColor: Color.Wrong,
    borderRadius: 20,
    justifyContent:"center",
    paddingRight:8,
    borderBottomEndRadius:0,
    borderBottomStartRadius:0,
  },
  containerInfomation: {
    flex: 16,
    backgroundColor: Color.White,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    borderRadius: 20,
    padding:12,
  },
});

const mapStateToProps = state => {
  return {
    orientation: state.orientation,
  }
}

export default connect(mapStateToProps, null)(negativeModal);