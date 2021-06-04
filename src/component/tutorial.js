/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { HOSTNAME } from "@env"
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Modal,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import Device from '../utils/Device';
import imageBook from '../resource/image/booksmall.png';
import Sound from 'react-native-sound'
import { Icon } from 'react-native-elements'
import Color from '../resource/color'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import imagePlayer from '../resource/image/player_circle.png'

//dimesions
width = Dimensions.get('window').width//1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

var doubly = false;
var end = false;

const writing = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [textModal, setTextModal] = useState(1)
  const [modal2Visible, setModal2Visible] = useState(false);
  //set ary_sound , vowel , vocab
  ary_sound = props.arrSound
  index = props.arrIndex
  collect = props.collecting
  filename = props.name
  var orientation = props.orientation
  //hook
  useEffect(() => {
    lor(props.upDateOrientation)
    setTimeout(() => {
      play()
      setModalVisible(true)
    },
      500
    )
    return rol()
  }, [])

  //sound
  var sound = new Sound(ary_sound[index].concat(".mp3"), Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log("path : ", Sound.MAIN_BUNDLE)
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    collect == true ? multiplier = 1 : multiplier = 4;
    if (textModal > 6) {
      if (index == multiplier || index == multiplier * 2 || index == multiplier * 3 || index == multiplier * 4 || index == multiplier * 5
        || index == multiplier * 6 || index == multiplier * 7 || index == multiplier * 8 || index == multiplier * 9 || index == multiplier * 10
        || index == multiplier * 11) {
        if (doubly == true) {
          play()
        }
        else {
          doubly = true
        }

      }
      else {
        multiplier == 1 ? doubly = true : doubly = false
        play()
      }
    }
  });
  const play = () => {
    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };
  const canvasRef = React.createRef()
  const Clear = () => {
    canvasRef.current.clear()
  }
  const Save = () => {
    Clear()
    if (index < ary_sound.length - 1) {
      sound.release();
      props.setArrIndex()
    }
    else {
      if (end == false) {
        props.setArrIndex()
        end = true
      }
      else {
        console.log("LAST !!!")
      }

    }

  }

  const DialogModal1 = (text) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles(orientation).modalCenteredView}>
        <View style={styles(orientation).dialogModalView}>
          <Image source={imagePlayer} style={styles(orientation).imageCircle} />
          <Text style={styles(orientation).modalText}>
            {textModal == 1 && "เอะ !! เมื่อกี้เสียงอะไรนะ ลองกดที่ปุ่มรูป ลำโพง เพื่อฟังเสียง"}
            {textModal == 2 && "เสียง ก !! ช่วยเขียนลงใน สมุด หน่อยนะ"}
            {textModal == 3 && "สวยมาก !! ถ้าอยากเขียนใหม่ ลองกดที่ปุ่ม ยางลบ ดูสิ"}
            {textModal == 4 && "หายไปแล้ว !! ลองเขียน ก อีกรอบสิ"}
            {textModal == 5 && "เสร็จแล้ว !! ลองกดปุ่ม ส่งคำตอบ ดูสิ"}
            {textModal == 6 && "เรียบร้อย !! คราวนี้ลองฟังแล้วเขียนให้ครบเลยนะ สู้สู้"}
          </Text>
          {textModal == 1 &&
            <TouchableOpacity onPress={() => {
              setTextModal(2);
              play();
              setTimeout(() => {
                setModalVisible(false)
              },
                5000
              )
            }}>
              <Icon
                name={"volume-up"}
                type="font-awesome5"
                color={Color.Gray}
                size={hp("5%")}
                style={{ margin: 5, zIndex: 20 }}
              />
            </TouchableOpacity>
          }
          {textModal == 3 &&
            <TouchableOpacity onPress={() => {
              setTextModal(4);
              Clear();
              setTimeout(() => {
                setModalVisible(false)
              },
                5000
              )
            }}>
              <Icon
                name={"eraser"}
                type="fontisto"
                color={Color.Gray}
                size={hp("4%")}
                style={{ margin: 5 }}
              />
            </TouchableOpacity>
          }
          {textModal == 5 &&
            <View style={{ width: hp('20%'), marginLeft: 10 }}>
              <Button
                onPress={() => {
                  setTextModal(6);
                  Clear();
                  props.setArrIndex()
                  setTimeout(() => {
                    setTextModal(7);
                    setModalVisible(false)
                  },
                    5000
                  )
                }}
                title="ส่งคำตอบ"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          }
        </View>
      </View>
    </Modal>
  )
  const DialogModal2 = (text) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal2Visible}
      onRequestClose={() => {
        setModal2Visible(!modal2Visible);
      }}
    >
      <View style={styles(orientation).modalCenteredView}>
        <View style={styles(orientation).dialogModalView}>
          <Image source={imagePlayer} style={styles(orientation).imageCircle} />
          <Text style={styles(orientation).modalText}>สวยมาก !! ถ้าอยากเขียนใหม่ลองกดที่ปุ่มยางลบดูสิ</Text>
          <TouchableOpacity onPress={() => { setModal2Visible(!modal2Visible); Clear(); }}>
            <Icon
              name={"eraser"}
              type="fontisto"
              color={Color.Gray}
              size={hp("4%")}
              style={{ margin: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )


  return (
    <>
      <View style={styles(orientation).container}>
        <View style={styles(orientation).centeredView}>
          {(modalVisible) && <View style={styles(orientation).focusContainer} />}
          <ImageBackground source={imageBook} style={styles(orientation).image}>
            <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignContent: "flex-start" }}>
              {
                textModal > 1 &&
                <TouchableOpacity onPress={play}>
                  <Icon
                    name={"volume-up"}
                    type="font-awesome5"
                    color={Color.Gray}
                    size={hp("5%")}
                    style={{ margin: 5, zIndex: 20 }}
                  />
                </TouchableOpacity>
              }
              {
                textModal > 3 &&
                <TouchableOpacity onPress={Clear}>
                  <Icon
                    name={"eraser"}
                    type="fontisto"
                    color={Color.Gray}
                    size={hp("4%")}
                    style={{ margin: 5 }}
                  />
                </TouchableOpacity>
              }
              {
                textModal > 5 &&
                <View style={{ width: hp('20%'), padding: 10, marginLeft: 'auto' }}>
                  <Button
                    onPress={Save}
                    title="ส่งคำตอบ"
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
              }
            </View>
            <View style={{ position: 'absolute', bottom: 0, paddingBottom: hp('8%'), width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', }}>
              <View style={{ borderColor: Color.Gray, borderBottomWidth: 2 }} />
              <View style={{ borderColor: Color.Gray, borderBottomWidth: 2 }} />
              <View style={{ borderColor: Color.Gray, borderBottomWidth: 2 }} />
              <View style={{ borderColor: Color.Gray, borderBottomWidth: 2 }} />
            </View>
            <SketchCanvas
              style={{ flex: 1, justifyContent: "center", flexDirection: 'row', zIndex: 10 }}
              strokeColor={'black'}
              strokeWidth={3}
              ref={canvasRef}
              onStrokeEnd={() => {
                if (textModal == 2) {
                  setTextModal(3);
                  setModalVisible(true)
                }
                else if (textModal == 4) {
                  setTextModal(5);
                  setModalVisible(true)
                }
              }}
              onSketchSaved={(success, path) => { console.log("filePath : ", path, "success or not : ", success) }}
              savePreference={{

                folder: 'RNSketchCanvas',
                filename: 'image233',
                transparent: false,
                imageType: 'png',
                includeImage: true,
                includeText: false,
                cropToImageSize: false

              }}
              permissionDialogTitle='Try'
              permissionDialogMessage='try2'
            />
          </ImageBackground>
          <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
          </View>
        </View>
      </View>
      {DialogModal1("เอะ !! เมื่อกี้เสียงอะไรนะ ลองกดที่ปุ่มรูปลำโพงเพื่อฟังเสียง")}
    </>
  );

}

const styles = (orientation) => StyleSheet.create({
  focusContainer: {
    zIndex: 5,
    backgroundColor: 'black',
    opacity: 0.8,
    top: -50,
    width: wp('100%'),
    height: hp('120%'),
    position: "absolute",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  imageCircle: {
    width: orientation == "landscape" ? wp('10%') : wp('20%'),
    height: orientation == "landscape" ? wp('10%') : wp('20%'),
    margin: 10,
    borderRadius: 50
  },
  image: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'center',
    marginHorizontal: orientation == 'portrait' ? wp('15%') : wp('33%'),
    marginTop: 50,
    paddingTop: 50,
    paddingBottom: hp('8%'),
    justifyContent: "center"
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 22,
  },
  dialogModalView: {
    flexDirection: 'row',
    margin: 20,
    flexWrap : 'wrap',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: "center"
  }
});
const mapStateToProps = state => {
  return {
    testId: state.testId,
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
export default connect(mapStateToProps, mapDispatchToProps)(writing);