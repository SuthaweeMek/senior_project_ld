import React, { useCallback,useRef, useState, useEffect ,componentDidMount} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  Modal,
  Animated,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Switch
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

console.log("is tablet ?",Device.isTablet())
console.log("Device height = ", height, " and width = ", width)

//const spriteSize = height
const CollectingScene = (props) => {
  //State
  const [modalVisible, setModalVisible] = useState(false);
  const [index,setIndex] = useState(0)
  const [name,setName] = useState("moo")


  useEffect(() => {
    // Arrays.Shuffle(ary_th_alphabet)
    // Arrays.Shuffle(ary_th_vowel)
    // Arrays.Shuffle(ary_th_vocab)

    //ary_th_alphabet.push("th_alphabet_end")
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
    console.log("modal closed")
    setModalVisible(false)
  }

  const SetArrayIndex = () =>{
    console.log("index : ",index)
    index <= ary_all.length-1 ?setIndex(index+1) : console.log("end jaaaaa")

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
    //justifyContent: 'center', 
    //alignItems: 'center',
    //backgroundColor : "gray"
    //flex: 1 1 auto,
    //marginTop: 22
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
    //backgroundColor:"red",
    top: 7,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    //justifyContent: 'space-around'
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
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    //resizeMode: "cover",
    position: "absolute",
    left: 0,
    width: width*2,
    height: height,
  },
  foreground: {
    // justifyContent: 'center',
    // alignItems: 'center',

    // resizeMode: "cover",
    left :0,
    //backgroundColor: 'black',
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