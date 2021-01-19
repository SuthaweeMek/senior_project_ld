import React, { Component,useState,useRef,useEffect } from 'react';
import { TextInput,Dimensions,StyleSheet, View,Text,TouchableOpacity,Animated} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils/Device';
import Device from '../utils/Device';
import { Icon } from 'react-native-elements'
import Color from '../resource/color'
import { connect } from 'react-redux';

const inputbox = (props) => {
  const orientation = props.orientation
  const size = props.size
  const [clickInput,setClickInput] = useState({borderColor: Color.Cover,borderBottomWidth: 2})
  const [text,setText] = useState(props.text)
  const moveAnim = useRef(new Animated.Value(0)).current  // Initial value for top : 0
  const sizeAnim = useRef(new Animated.Value(wp('2.7%'))).current // Initial value for fontSize: 28]
  const [textHolderColor,setTextholdercolor] = useState(Color.Cover)

    const placeholderAnimation = (clicked) => {
      Animated.parallel([
      Animated.timing(moveAnim, {
          toValue: clicked ? -(hp('2.5%')):text =="" ? 0 :-(hp('2.5%')),
          duration: 300,
          useNativeDriver :false
      }),
      Animated.timing(sizeAnim, {
          toValue: clicked ? wp('2%') :text =="" ? wp('2.7%') : wp('2%'),
          duration: 300,
          useNativeDriver :false
      })
    ]).start()
      }

  return (

    <View style={[styles({orientation,size}).inputSection, clickInput]}>
   <Icon
      //reverse
      name={props.icon}
      type='font-awesome-5'
      color= {clickInput.borderColor} 
      size={hp('4%')}
      style={styles({orientation,size}).inputIcon} 
    />
    <View style={styles({orientation,size}).container2}>

      <Animated.Text style={[styles({orientation,size}).textHolder,{fontSize:sizeAnim,top:moveAnim,color:textHolderColor}]} >{props.placeholder}</Animated.Text>
        <TextInput
          style={[styles({orientation,size}).textinput]}
          onChangeText={text => {props.onChangeText(text) ,setText(text)}}
          pointerEvents="none"
          secureTextEntry={props.password? true:false}
          value={props.text}
          onFocus = {()=> {setClickInput({borderColor: Color.Background,borderBottomWidth: 4}) ,placeholderAnimation(clicked=true),text =="" ? setTextholdercolor(Color.Black):null}}
          onBlur = {()=>{setClickInput({borderColor: '#d9dada',borderBottomWidth: 2}) , placeholderAnimation(clicked=false), text =="" ? setTextholdercolor(Color.Cover):setTextholdercolor(Color.Black)}}
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
    borderColor: 'red',
    borderBottomWidth : 2,
    justifyContent:"flex-start",
    alignItems:"flex-end",
    width: props.size.wp,
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
    height: props.size.hp,
    width: props.size.wp,
},

  inputIcon: {
    padding:8,
    // backgroundColor:"green"
},
  textinput:{ 
    fontFamily:"EkkamaiNew-Regular",
    fontSize: wp('3%'),
    // height: hp('5.9%'),
    width: props.size.wp,
    //marginTop : -10,
    //paddingTop :-5,
    paddingLeft: 10,
    color: Color.Background,
    textAlignVertical:"center",
    },
})

const mapStateToProps = state => {
  return {
    orientation: state.orientation,
  }
}


export default connect(mapStateToProps, null)(inputbox);
