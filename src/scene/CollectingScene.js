import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Modal,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Orientation from 'react-native-orientation';
import Device from '../utils/Device';
import Arrays from '../utils/Array'
import Writing from '../component/writing'

//ary
var ary_all = []
var ary_th_alphabet = Arrays.CreatePlattern("th_alphabet_",44)
var ary_th_vowel = Arrays.CreatePlattern("th_vowel_",36)
var ary_th_vocab = Arrays.CreatePlattern("th_vocab_",10)


//dimesions
width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

//const spriteSize = height
const CollectingScene = (props) => {
  //State
  const [modalVisible, setModalVisible] = useState(false);
  const [index,setIndex] = useState(0)
  const [name,setName] = useState("moo")


  useEffect(() => {
    ary_all = ary_th_alphabet.concat(ary_th_vowel).concat(ary_th_vocab)
    ary_all.push("th_vocab_end")

    Orientation.lockToLandscape();
    const interval = setInterval(() => {
      setModalVisible(true)
      return () => clearInterval(interval)
    }, 2000 );
    return function () {
      Orientation.unlockAllOrientations();
    }
  }, [])

  const modalOpen = () => {
    setModalVisible(true)
  };

  const HandleCloseModal = () => {
    setModalVisible(false)
  }

  const SetArrayIndex = () =>{
    index <= ary_all.length-1 ?setIndex(index+1) : console.log("end")

  }




  return (
    // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
    // resizeMode cover stretch
    <View style={styles.container}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={{position: "absolute"}}>
            <Text style={styles.font}>เขียนมาแล้ว : {String(index+1)}</Text>
            <Text style={styles.font}>{index<44? "พยัญชนะตัวที่ "+String(index+1) :
            index>=44 && index<44+36 ? "สระตัวที่ "+String(index-43): index>=80 ?"คำสะกดที่ "+String(index-79):null} </Text>
            <Text style={[styles.font]}>ตัว : {ary_all[index]}</Text>
            <TextInput
             style={[styles.font,{borderColor: 'gray',borderWidth:1}]}
              onChangeText={name => setName(name)}
              value={name}
            />
            <Text style={[styles.font]}>สู้ๆนะคุณ {name}</Text>

          </View>
          
          <Writing modalState = {modalVisible} closeModal={HandleCloseModal} arrSound={ary_all} setArrIndex={SetArrayIndex} arrIndex={index} collecting={true} name={name}/>
        </Modal>
    </View>

     

    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column"
  },
  font:{
    padding:30,
    fontSize:30
  }
  ,
  statusHP: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  field: {
    flex: 1,
    top: 7,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  effect:{
    transform: [{ rotate: '-90deg'},{scale: 1}],
    top : '5%',
    zIndex : 3
  },
  enemy:{
    alignItems:"flex-end",
    flex:1,
    right:"50%"
  },
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    width: width*2,
    height: height,
  },
  foreground: {
    left :0,
    justifyContent: 'flex-end',
    width: width * 2,
    height: height / 4.26,
  },
  imageCircle: {
    width: height / 5,
    height: height / 5,
    margin: 10,
    borderRadius: 50
  },
});


export default CollectingScene;