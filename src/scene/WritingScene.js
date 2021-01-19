/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Modal,
  ImageBackground,
} from 'react-native';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

import imageBook from '../resource/image/book.png';
import ImageScene from './ImageScene';


const WritingScene = () => {
  const canvasRef = React.createRef()

  const Undo = () => {
    canvasRef.current.undo()
  }
  const CheckCallback = async (success, base64) => {
    var image = `data:image/png;base64,` + base64
    const data = new FormData();
    data.append('prediction', 1);
    data.append('img', image);

    //Please change file upload URL
    let res = await fetch(
      'http://10.0.2.2:8000/classifications/',
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
    canvasRef.current.save('jpg', false, 'RNSketchCanvas', 'image', true, false, false)
    console.log("check")
    canvasRef.current.getBase64("jpg", false, false, false, false, CheckCallback)
  }

  const Upload = () => {
    console.log("YES");
    ImageScene("test", "moo");
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
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <ImageBackground source={imageBook} style={styles.image}>
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
          <View style={{ flexDirection: 'column', backgroundColor: 'blue', justifyContent: "flex-end" }}>
            <Button onPress={() => {
              setModalVisible(!modalVisible);
            }} title="Close"
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
      </Modal>

      <Button onPress={() => {
        setModalVisible(true);
      }} title="Modal"
        color="#841123" />

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
    resizeMode: 'cover',
    //alignItems: "center",
    padding: 20,
    justifyContent: "center"
  },
});

export default WritingScene;
