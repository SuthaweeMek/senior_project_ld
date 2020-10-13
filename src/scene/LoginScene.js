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
          <Text>เข้าสู่ระบบ</Text>
          <ButtonCurve text = "Moo" onPress= {onPress}/>
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
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection :'column',
    backgroundColor : 'white',
    borderRadius : 10,
    width : width/1.96,
    height : height/1.56,
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: "cover",
  }
});



export default LoginScene;
