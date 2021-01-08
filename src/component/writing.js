/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Modal,
  Dimensions,
  ImageBackground,
} from 'react-native';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import Device from '../utils/Device';
import imageBook from '../resource/image/book.png';
import Sound from 'react-native-sound'

//dimesions
width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

var doubly = false;
var end = false;

const writing = (props) => {

  //set ary_sound , vowel , vocab
  ary_sound = props.arrSound
  index = props.arrIndex
  collect = props.collecting
  filename = props.name
  console.log("array sound = ",ary_sound)
  //hook
  

  //sound
  var sound = new Sound(ary_sound[index].concat(".mp3"), Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log("path : ",Sound.MAIN_BUNDLE)
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    //console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
    if(ary_sound[index].includes("th_alphabet")){
      console.log("colect :",collect)
      
      collect == true ? multiplier = 1 : multiplier = 4;
      console.log("multiplier :",multiplier ,"index : ",index)
      if(index == multiplier || index == multiplier*2 || index == multiplier*3 || index == multiplier*4 || index == multiplier*5 
        || index == multiplier*6 || index == multiplier*7 || index == multiplier*8 || index == multiplier*9 || index == multiplier*10
        || index == multiplier*11 ){
        if(doubly == true){
          play()
        }
        else{
          doubly = true
        }
        
      }
      else{
        multiplier == 1 ? doubly=true : doubly = false
        play()
     }
    }

    if(ary_sound[index].includes("th_vowel")){
      collect == true ? multiplier = 1 : multiplier = 4;
      if(index == multiplier || index == multiplier*2 || index == multiplier*3 || index == multiplier*4 || index == multiplier*5 
        || index == multiplier*6 || index == multiplier*7 || index == multiplier*8 || index == multiplier*9 || index == multiplier*10
        ){
        if(doubly == true){
          play()
        }
        else{
          doubly = true
        }
        
      }
      else{
        multiplier == 1 ? doubly=true : doubly = false
        play()
     }
    }

    if(ary_sound[index].includes("th_vocab")){
      collect == true ? multiplier = 1 : multiplier = 2;
      if(index == multiplier || index == multiplier*2 || index == multiplier*3 || index == multiplier*4 || index == multiplier*5 
        || index == multiplier*6 || index == multiplier*7 || index == multiplier*8 || index == multiplier*9 || index == multiplier*10
        ){
        if(doubly == true){
          play()
        }
        else{
          doubly = true
        }
        
      }
      else{
        multiplier == 1 ? doubly=true : doubly = false
        play()
     }
    }
    
    // Play the sound with an onEnd callback
    // whoosh.play((success) => {
    //   if (success) {
    //     console.log('successfully finished playing');
    //   } else {
    //     console.log('playback failed due to audio decoding errors');
    //   }
    // });
  });
  //console.log("/n HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE m",props.modalState)
  const play = () => {  
    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  console.log("Alphabet : ",ary_sound[index])
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
    data.append('prediction', 1);
    data.append('ImageName', image);
    data.append('label',ary_sound[index])
    data.append('TestID',1)

    //Please change file upload URL
    let res = await fetch(
      'http://10.0.2.2:8000/classifications/' ,
      {
        method: 'post',
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data; ',
        },
      }
    );
    let responseJson = await res.json();
    console.log(responseJson)
    if (res.status == 201) {
      console.log('Upload Successful');
    }
    else {
      //if no file selected the show alert
      console.log('Please Select File first');
    }
  }
  const Save = () => {
    console.log("YES");
    canvasRef.current.save('jpg', false, 'RNSketchCanvas', ary_sound[index]+"_"+filename, true, false, false)
    console.log("check")
    canvasRef.current.getBase64("jpg", false, false, false, false, CheckCallback)
    Clear()   
    if(index < ary_sound.length-1){
      sound.release();
      props.setArrIndex()
    }
    else {
      if(end == false){
        props.setArrIndex()
        end = true
      }
      else{
        console.log("LAST !!!")
      }
      
    }
    
  }

  const Upload = () => {
    console.log("YES");
    //ImageScene("test", "moo");
  }




  let uploadImage = async () => {
    //Check if any file is selected or not
    if (singleFile != null) {
      //If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      //Please change file upload URL
      let res = await fetch(
        'http://localhost/upload.php',
        {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } else {
      //if no file selected the show alert
      alert('Please Select File first');
    }
  };

  let selectFile = async () => {
    //Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        //Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      //Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  

  return (
    <View style={styles.container}>
        <View style={styles.centeredView}>
          <ImageBackground source={imageBook} style={styles.image}>
            <View style={{ flexDirection: 'row', justifyContent: "flex-start",alignContent:"flex-start" }}>
              <Button
                onPress={play}
                title="sound"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />  
              <Button
              onPress={Clear}
              title="clear"
              color="#191584"
              accessibilityLabel="Learn more about this purple button"
            />
            </View>
            <SketchCanvas
              style={{ flex: 1, justifyContent: "center", flexDirection: 'row' }}
              strokeColor={'black'}
              strokeWidth={3}
              ref={canvasRef}
              onSketchSaved={(success, path) => { console.log("filePath : ", path, "success or not : ", success) }}
              // localSourceImage={{
              //   filename: 'image.png',  // e.g. 'image.png' or '/storage/sdcard0/Pictures/image.png'
              //   directory: 'SketchCanvas.MAIN_BUNDLE', // e.g. SketchCanvas.MAIN_BUNDLE or '/storage/sdcard0/Pictures/'
              //   mode: 'AspectFill'
              // }}
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
            <Button onPress={
              props.closeModal
            } title="Close"
              color="#841123"
            />
            <Button
              onPress={Undo}
              title="Undo"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <Button
              onPress={Save}
              title="Save"
              color="#631584"
              accessibilityLabel="Learn more about this purple button"
            />
            <Button
              onPress={Upload}
              title="Upload"
              color="#639584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          
        </View>
      {/* <Button onPress={() => {
        setModalVisible(true);
      }} title="Modal"
        color="#841123" /> */}

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    //flex: 1, justifyContent: 'center', alignItems: 'center', 
    flex: 1,
    justifyContent: "center",
    //marginTop: 22
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
    
    //backgroundColor:"blue",
    //alignItems: "center",
    marginHorizontal : width/3,
    margin: 50,
    padding : 30,
    // paddingHorizontal :50,
    // paddingBottom : 50,
    //alignSelf:"center",
    justifyContent: "center"
  },
});

export default writing;
