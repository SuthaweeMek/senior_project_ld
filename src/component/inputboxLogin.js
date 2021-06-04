import React, { useState,useRef,useEffect } from 'react';
import { TextInput,StyleSheet, View,Animated} from 'react-native';
import Device from '../utils/Device';
import {FontSize, LayoutSize} from '../resource/dimension'
import { Icon } from 'react-native-elements'
import Color from '../resource/color'
import { connect } from 'react-redux';

const inputbox = (props) => {
  const orientation = props.orientation
  const size = props.size
  const maxLength = props.maxLength

  const [clickInput,setClickInput] = useState({borderColor: Color.Cover,borderBottomWidth: 1})
  const [text,setText] = useState(props.text)
  const moveAnim = useRef(new Animated.Value(0)).current  // Initial value for top : 0
  const sizeAnim = useRef(new Animated.Value(Device.fontSizer(FontSize.Subtitle1))).current // Initial value for fontSize: 28]
  const [holderColor,setHolderColor] = useState(Color.Cover)

  useEffect(()=>{
    placeholderAnimation()
  },[props.orientation])

    const placeholderAnimation = (clicked) => {
      Animated.parallel([
      Animated.timing(moveAnim, {
          toValue: clicked ? -(20):text =="" ? 0 : -(20),
          duration: 300,
          useNativeDriver :false
      }),
      Animated.timing(sizeAnim, {
          toValue: clicked ?  Device.fontSizer(FontSize.Caption) :text =="" ? Device.fontSizer(FontSize.Subtitle1) : Device.fontSizer(FontSize.Caption),
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
      size={24}
      style={styles({orientation,size}).inputIcon} 
    />
    <View style={styles({orientation,size}).container2}>

      <Animated.Text style={[styles({orientation,size}).textHolder,{fontSize:sizeAnim,top:moveAnim,color:holderColor}]} >{props.placeholder}</Animated.Text>
        <TextInput
          style={[styles({orientation,size}).textinput]}
          onChangeText={text => {props.onChangeText(text) ,setText(text)}}
          pointerEvents="none"
          secureTextEntry={props.password? true:false}
          value={props.text}
          maxLength={maxLength}
          onFocus = {()=> {
            placeholderAnimation(clicked=true),text =="" ? setClickInput({borderColor: Color.Background,borderBottomWidth: 1}):null ,
            placeholderAnimation(clicked=true),text =="" ? setHolderColor(Color.Background):null}
          }
          onBlur = {()=>{
            placeholderAnimation(clicked=true),text =="" ? setClickInput({borderColor: Color.Cover,borderBottomWidth: 1}):setClickInput({borderColor: Color.Background,borderBottomWidth: 1}) ,
            placeholderAnimation(clicked=false), text =="" ? setHolderColor(Color.Cover):setHolderColor(Color.Background)}
          }
        />   
    </View>
      
    </View>

  );
}
const styles = (props) => StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    marginBottom:16,
    height : LayoutSize.InputHeight,
    borderBottomWidth : 1,
    justifyContent:"flex-start",
    alignItems:"center",
    width: props.size.wp,
},
  container2 :{
    flexDirection:"column",
    justifyContent:"flex-end",
    alignSelf:"flex-end",

},
  textHolder : {
    fontFamily:"EkkamaiNew-Regular",
    fontSize: Device.fontSizer(FontSize.Subtitle1),
    position:"absolute",
    color:Color.Cover,
    height: LayoutSize.InputHeight,
    textAlignVertical:"center",
},

  inputIcon: {
    paddingHorizontal:LayoutSize.InputPaddingHorizontal,
    alignSelf:"center",
},
  textinput:{ 
    fontFamily:"EkkamaiNew-Regular",
    fontSize: Device.fontSizer(FontSize.Subtitle1),
    width: props.size.wp,
    color: Color.Black,
    },
})

const mapStateToProps = state => {
  return {
    orientation: state.orientation,
  }
}


export default connect(mapStateToProps, null)(inputbox);
