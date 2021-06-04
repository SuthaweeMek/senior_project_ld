/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { HOSTNAME } from "@env"
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import Device from '../utils/Device';
import imageBook from '../resource/image/booksmall.png';
import Sound from 'react-native-sound'
import { Icon } from 'react-native-elements'
import Color from '../resource/color'
import LocalStorage from '../utils/LocalStorage'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'

//dimesions
width = Dimensions.get('window').width//1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

var doubly = false;
var end = false;

const writing = (props) => {

  //set ary_sound , vowel , vocab
  ary_sound = props.arrSound
  index = props.arrIndex
  collect = props.collecting
  filename = props.name
  var orientation = props.orientation
  //hook
  useEffect(() => {
    lor(props.upDateOrientation)
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
    if (ary_sound[index].includes("th_alphabet")) {
      collect == true ? multiplier = 1 : multiplier = 4;
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

    if (ary_sound[index].includes("th_vowel")) {
      collect == true ? multiplier = 1 : multiplier = 4;
      if (index == multiplier || index == multiplier * 2 || index == multiplier * 3 || index == multiplier * 4 || index == multiplier * 5
        || index == multiplier * 6 || index == multiplier * 7 || index == multiplier * 8 || index == multiplier * 9 || index == multiplier * 10
      ) {
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

    if (ary_sound[index].includes("th_vocab")) {
      collect == true ? multiplier = 1 : multiplier = 2;
      if (index == multiplier || index == multiplier * 2 || index == multiplier * 3 || index == multiplier * 4 || index == multiplier * 5
        || index == multiplier * 6 || index == multiplier * 7 || index == multiplier * 8 || index == multiplier * 9 || index == multiplier * 10
      ) {
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
  const Undo = () => {
    canvasRef.current.undo()
  }
  const Clear = () => {
    canvasRef.current.clear()
  }
  const CheckCallback = async (success, base64) => {
    var image = `data:image/png;base64,` + base64
    const data = new FormData();
    data.append('prediction', 0);
    data.append('ImageName', image);
    data.append('label', ary_sound[index - 1])
    data.append('TestID', props.testId)
    data.append('labelimage', "no")
    data.append('predictionprob', 0);
    //Please change file upload URL
    let res = await fetch(
      `${HOSTNAME}/classifications/`,
      {
        method: 'post',
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data; ',
          'Authorization': 'Bearer ' + await LocalStorage.readData("token")
        },
      }
    );
    if (res.ok) {
      console.log('Upload Successful');
    }
    else {
      //if no file selected the show alert
      console.log('Please Select File first');
    }
  }
  const Save = () => {
    canvasRef.current.save('jpg', false, 'RNSketchCanvas', ary_sound[index] + "_" + filename, true, false, false)
    canvasRef.current.getBase64("jpg", false, false, false, false, CheckCallback)
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

  return (
    <View style={styles(orientation).container}>
      <View style={styles(orientation).centeredView}>
        <ImageBackground source={imageBook} style={styles(orientation).image}>
          <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignContent: "flex-start" }}>
            <TouchableOpacity onPress={play}>
              <Icon
                name={"volume-up"}
                type="font-awesome5"
                color={Color.Gray}
                size={hp("5%")}
                style={{ margin: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={Clear}>
              <Icon
                name={"eraser"}
                type="fontisto"
                color={Color.Gray}
                size={hp("4%")}
                style={{ margin: 5 }}
              />
            </TouchableOpacity>
            <View style={{ width: hp('20%'), padding: 10 ,marginLeft:'auto'}}>
              <Button
                onPress={Save}
                title="ส่งคำตอบ"
                // color={Color.Yellow}  
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
            {/* <Button
                onPress={play}
                title="play"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />   */}
            {/* <Button
              onPress={Clear}
              title="clear"
              color="#191584"
              accessibilityLabel="Learn more about this purple button"
            /> */}
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
  );

}

const styles = (orientation) => StyleSheet.create({
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