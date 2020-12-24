/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  ImageBackground,
  Image,
  Alert,
  Dimensions
} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import backgroundLogin from '../resource/image/backgroundLogin.png'
import Router from '../router'
import ButtonCurve from '../component/buttonCurve';
import InputBox from '../component/inputbox';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const LoginScene = () => {
  const onPress = () => {
          alert("clicked");
    }
   

  return (
    <NativeRouter>
     <ImageBackground source = {backgroundLogin} style = {styles.background}>
       <View style = {styles.card}>
         <View style ={{marginBottom : 28}}>
            <Text style={{fontWeight: "bold",fontSize:27}}>เข้าสู่ระบบ</Text>
          </View>
          <View style ={{marginRight :140 ,marginBottom:7}}>
            <Text >ชื่อ</Text>
          </View>
          <InputBox text= "ชื่อ" />
          <View style ={{marginRight :110,marginBottom:7,marginTop:7}}>
           <Text>รหัสผ่าน</Text>
          </View> 
            <InputBox text= "รหัสผ่าน" />
            <Text style ={{marginLeft :0 ,marginBottom:7,marginTop:7}} onPress={onPress}  > ลืมรหัสผ่าน?</Text>
          <ButtonCurve onPress= {onPress} text = "เข้าสู่ระบบ" />
          <Text onPress={onPress} > สมัครสมาชิกใหม่</Text>
       </View>
      </ImageBackground>
    </NativeRouter>
  );
  
}

const styles = StyleSheet.create({
  container: {
  
    //flex: 1,
    //justifyContent: 'center', 
    //alignItems: 'center',
    flexDirection: 'row',
    //backgroundColor : "gray"
    //flex: 1 1 auto,
    //marginTop: 22
  },
  card: {
    fontFamily: "lucida grande",
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection :'column',
    backgroundColor : 'white',
    borderRadius : 10,
    width : width/1.6,
    height : height/1.8,
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: "cover",
  }
});



export default LoginScene;
