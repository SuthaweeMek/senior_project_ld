/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

import imageBook from '../resource/image/book.png';

const WritingScene = () => {
  const canvasRef = React.createRef()

  const Undo = () => { 
    canvasRef.current.undo()
  }
  const Save = () => {
    console.log("YES");
    canvasRef.current.save()
    console.log("check")
  }
  const [modalVisible, setModalVisible] = useState(false);

return (
  <View style={styles.container}>
    <Modal  animationType="fade" transparent={true} visible={modalVisible}>
    <View style={styles.centeredView}>
        <ImageBackground source={imageBook} style = {styles.image}>
          <SketchCanvas
            style={{ flex: 1,justifyContent: "center",flexDirection: 'row'}}
            strokeColor={'black'}
            strokeWidth={3}
            ref={canvasRef}
            onSketchSaved={(success, filepath) => {console.log('filePath : ',filepath)}}
            localSourceImage={{
              filename: 'image.png',  // e.g. 'image.png' or '/storage/sdcard0/Pictures/image.png'
              directory: '/storage/sdcard0/Pictures/', // e.g. SketchCanvas.MAIN_BUNDLE or '/storage/sdcard0/Pictures/'
              mode: 'AspectFill'
            }}
            savePreference={
              {
                folder: 'RNSketchCanvas',
                filename: 'image',
                transparent: true,
                imageType: 'jpg',
                includeImage: true,
                includeText: false,
                cropToImageSize: true
              }
            }
            permissionDialogTitle={'Try'}
          />        
        </ImageBackground>
        <View style={{ flexDirection: 'column' ,backgroundColor:'blue' ,justifyContent: "flex-end"}}>
            <Button  onPress={() => {
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
        </View>
    </View>
    </Modal>

      <Button  onPress={() => {
          setModalVisible(true);
        }} title="Modal"
        color="#841123"/>

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
    margin: 20,
    justifyContent: "center"
  },
});

export default WritingScene;
