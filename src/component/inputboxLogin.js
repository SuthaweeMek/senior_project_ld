import React, { Component,useState,useRef,useEffect } from 'react';
import { TextInput,Dimensions,StyleSheet, View,Text,TouchableOpacity,Animated} from 'react-native';
import Device from '../utils/Device';
import { Icon } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';

//dimesions
 width = Device.isPortrait() ? Dimensions.get('window').height : Dimensions.get('window').width //1:4.65
 height = Device.isPortrait() ? Dimensions.get('window').width : Dimensions.get('window').height //1:4.65  

 console.log("A ",width," b",height)
const inputbox = (props) => {
  const [clickInput,setClickInput] = useState({borderColor: '#d9dada',borderBottomWidth: 2})
  const [text,setText] = useState(props.text)
  const moveAnim = useRef(new Animated.Value(0)).current  // Initial value for top : 0
  const sizeAnim = useRef(new Animated.Value(28)).current // Initial value for fontSize: 28

    Dimensions.addEventListener("change", () => {
      // orientation has changed, check if it is portrait or landscape here

      })

    const placeholderAnimation = (clicked) => {
      Animated.parallel([
      Animated.timing(moveAnim, {
          toValue: clicked ? -(height/26):text =="" ? 0 :-(height/26),
          duration: 300,
          useNativeDriver :false
      }),
      Animated.timing(sizeAnim, {
          toValue: clicked ? 18 :text =="" ? 28 :18,
          duration: 300,
          useNativeDriver :false
      })
    ]).start()
      }

  return (

    <View style={[styles.inputSection, clickInput]}>
   <Icon
      //reverse
      name='user'
      type='font-awesome'
      color= {clickInput.borderColor} 
      size={42}
      style={styles.inputIcon} 
    />
    <View style={styles.container2}>

      <Animated.Text style={[styles.textHolder,{fontSize:sizeAnim,top:moveAnim}]} >{props.placeholder}</Animated.Text>
        <TextInput
          style={[styles.textinput]}
          onChangeText={text => {props.onChangeText(text) ,setText(text)}}
          pointerEvents="none"
          secureTextEntry={props.password? true:false}
          value={props.text}
          onFocus = {()=> {setClickInput({borderColor: '#66b4c1',borderBottomWidth: 4}) ,placeholderAnimation(clicked=true)}}
          onBlur = {()=>{setClickInput({borderColor: '#d9dada',borderBottomWidth: 2}) , placeholderAnimation(clicked=false)}}
        />   
    </View>
      
    </View>

  );
}
const styles = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    marginTop:20,
    borderColor: '#d9dada',
    borderBottomWidth : 2,
    justifyContent:"center",
    alignItems:"flex-end",
    
},
  container2 :{
    flexDirection:"column"
},
  textHolder : {
    paddingLeft: 10,
    fontFamily:"EkkamaiNew-Regular",
    fontSize:28,
    top:0,
    position:"absolute",
     height: height/20,
     width: width/2.6,
},

  inputIcon: {
    padding:8
},
  textinput:{ 
    fontFamily:"EkkamaiNew-Regular",
    fontSize:28,
    height: height/16,
    width: width/2.6,
    marginTop : -10,
    paddingTop :-5,
    paddingLeft: 10,
    color: 'black',
    },
})

export default inputbox;
