import React, { Component,useState,useRef,useEffect } from 'react';
import { TextInput,Dimensions,StyleSheet, View,Text,TouchableOpacity,Animated} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils/Device';
import Device from '../utils/Device';
import { Icon } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { connect } from 'react-redux';

const inputbox = (props) => {
  const orientation = props.orientation
  const [clickInput,setClickInput] = useState({borderColor: '#d9dada',borderBottomWidth: 2})
  const [text,setText] = useState(props.text)
  const moveAnim = useRef(new Animated.Value(0)).current  // Initial value for top : 0
  const sizeAnim = useRef(new Animated.Value(hp('3%'))).current // Initial value for fontSize: 28


    const placeholderAnimation = (clicked) => {
      Animated.parallel([
      Animated.timing(moveAnim, {
          toValue: clicked ? -(hp('2.5%')):text =="" ? 0 :-(hp('2.5%')),
          duration: 300,
          useNativeDriver :false
      }),
      Animated.timing(sizeAnim, {
          toValue: clicked ? hp('2%') :text =="" ? hp('3%') : hp('2%'),
          duration: 300,
          useNativeDriver :false
      })
    ]).start()
      }

  return (

    <View style={[styles(orientation).inputSection, clickInput]}>
   <Icon
      //reverse
      name={props.icon}
      type='font-awesome-5'
      color= {clickInput.borderColor} 
      size={hp('4%')}
      style={styles(orientation).inputIcon} 
    />
    <View style={styles(orientation).container2}>

      <Animated.Text style={[styles(orientation).textHolder,{fontSize:sizeAnim,top:moveAnim}]} >{props.placeholder}</Animated.Text>
        <TextInput
          style={[styles(orientation).textinput]}
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
const styles = (props) => StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    marginTop:20,
    marginBottom:10,
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
    top:-10,
    position:"absolute",
    color:"#d9dada",
    //backgroundColor:"blue",
    height: hp('6%'),
    width: wp('80%'),
},

  inputIcon: {
    padding:8,
    // backgroundColor:"green"
},
  textinput:{ 
    fontFamily:"EkkamaiNew-Regular",
    fontSize: hp('3%'),
    // height: hp('5.9%'),
    width: wp('80%'),
    //marginTop : -10,
    //paddingTop :-5,
    paddingLeft: 10,
    color: '#66b4c1',
    textAlignVertical:"center",
    },
})

const mapStateToProps = state => {
  return {
    orientation: state.orientation,
  }
}


export default connect(mapStateToProps, null)(inputbox);
