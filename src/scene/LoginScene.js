/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef, useEffect } from 'react';
// import {HOSTNAME} from 'react-native-dotenv';
import {HOSTNAME} from "@env"
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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import logo from '../resource/image/logo.png'
import { NativeRouter, Route, Link } from "react-router-native";
import backgroundLogin from '../resource/image/backgroundLogin.png'
import Router from '../router'
import Orientation from 'react-native-orientation';
import ButtonCurveLogin from '../component/buttonCurve.js';
import InputBoxLogin from '../component/inputboxLogin';
import LocalStorage from '../utils/LocalStorage'
import AsyncStorage from '@react-native-community/async-storage'
import NegativeModal from '../component/negativeModal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import Device from '../utils/Device'
import { connect } from 'react-redux';
import {FontSize} from '../resource/dimension'
import Color from '../resource/color'
import Font from '../resource/font'
// //dimesions
// width = Device.isPortrait() ? Dimensions.get('window').height : Dimensions.get('window').width //1:4.65
// height = Device.isPortrait() ? Dimensions.get('window').width : Dimensions.get('window').height //1:4.65  

const LoginScene = (props) => {
  const [token, setToken] = useState('5')
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [orientation, setOrientation] = useState(Device.isPortrait() ? "portrait" : "landscape")
  const [negativeModal, setNegativeModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [titleMessage, setTitleMessage] = useState("")
  const moveAnim = useRef(new Animated.Value(-25)).current  // Initial value for top : 0
  const fadeAnim = useRef(new Animated.Value(0)).current // Initial value for fontSize: 28
  // console.log("ore",orientation,"style : ",orientation=="portrait" ? "portrait":"landscape"," hp wp",hp(100),"and",wp(100))
  console.log("orientation ",Device.fontSizer(24))

  console.log(props.firstname)
  const onPress = async () => {

    let res = await fetch(`${HOSTNAME}/api/token/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userid: username,
        password: password
      })
    })

    let responseJson = await res.json();
    if (res.ok) {
      LocalStorage.saveData("token", JSON.stringify(responseJson))
      props.upDateUserId(responseJson.userId)
      props.upDateUserRole(responseJson.is_student === true ? 'student' : 'teacher')
      props.upDateName(responseJson.name)
      props.upDateScene(0)
    }
    else {
      if (responseJson.userid !== undefined) {
        setTitleMessage("Login Failed")
        setErrorMessage("กรุณากรอกช่อง Username")
      }
      else if (responseJson.password !== undefined) {
        setTitleMessage("Login Failed")
        setErrorMessage("กรุณากรอกช่อง Password")
      }
      else if (responseJson.detail !== undefined) {
        setTitleMessage("Login Failed")
        setErrorMessage("ลองตรวจสอบ Username และ Password นะครับ")
      }
      setNegativeModal(true)
      console.log('error: ', responseJson);
    }
  }

  const handleUser = (text) => {
    setUsername(text)
  }

  const handlePassword = (text) => {
    setPassword(text)
  }
  const handleModalNegative = (bool) => {
    setNegativeModal(bool)
  }

  useEffect(() => {
    // console.log("testtttttttttt",props.upDateOrientation)

    lor(props.upDateOrientation)
    Device.isTablet() ? Orientation.unlockAllOrientations() : Orientation.lockToPortrait();
    Animated.parallel([
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      })
    ]).start()
    return () => {
      rol()
    }
  }, [])

  return (


    <NativeRouter>
      <StatusBar translucent={false} barStyle={"dark-content"} backgroundColor={Color.Transparent} />
      {/* <ImageBackground source={backgroundLogin} style={styles(props.orientation).background} resizeMode={"stretch"}> */}
      <KeyboardAvoidingView
        // behavior={props.orientation=="landscape"? Platform.OS === "ios" ? "padding" : "height": Platform.OS === "ios" ? "padding" : "height"}
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles(props.orientation).container}
      >
        <NegativeModal modalVisible={negativeModal} onChangeVisible={handleModalNegative} title={titleMessage} text={errorMessage} />

        <SafeAreaView style={styles(props.orientation).container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles(props.orientation).inner, { top: moveAnim, opacity: fadeAnim }]}>
              <View style={{ flex: 1 }} />
              <Image style={styles(props.orientation).logo} source={logo} resizeMode="contain" />
              <Text style={styles(props.orientation).fontTopic}>
                เข้าสู่ระบบ
                            </Text>
              <InputBoxLogin text={username} onChangeText={handleUser} placeholder="Username" icon="user" size={{ hp: hp('6%'), wp: wp('90%') }} />
              <InputBoxLogin text={password} onChangeText={handlePassword} placeholder="Password" icon="key" size={{ hp: hp('6%'), wp: wp('90%') }} password={true} />
              <Text style={styles(props.orientation).fontForget} onPress={() => { console.log("do something1") }}>ลืมรหัสผ่าน</Text>
              <View style={styles(props.orientation).btnContainer}>
                <ButtonCurveLogin onPress={onPress} text="เข้าสู่ระบบ" size={{ hp: hp('6%'), wp: wp('90%') }} />
              </View>
              <Text style={styles(props.orientation).fontRegis} onPress={() => { props.upDateScene(5) }}>สมัครสมาชิก</Text>
              <View style={{ flex: 1 }} />
            </Animated.View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
      {/* </ImageBackground> */}
    </NativeRouter>


  );

}



const styles = (props) => StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: hp('20%'),
    marginBottom: 36,
  },
  fontTopic: {
    fontFamily: Font.Regular,
    // color: "#66b4c1",
    color: Color.Black,
    fontSize: Device.fontSizer(FontSize.H3),
    marginBottom: 36,
  },
  fontForget: {
    // fontSize: hp('2%'),
    fontSize: Device.fontSizer(FontSize.OVERLINE),
    fontFamily: Font.Bold,
    textAlign: "right",
    width: wp('85%'),
    marginTop: 10,
    //backgroundColor:"red"

  },
  fontRegis: {
    // fontSize: hp('2%'),
    fontSize: Device.fontSizer(FontSize.Body2),
    marginBottom: 36,
    textDecorationLine: 'underline',
    fontFamily: Font.Bold,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    fontSize: 50,
    top: -25,
    opacity: 0
    //margin: height - (height * 0.95)
  },
  header: {
    fontFamily: Font.Bold,
    fontSize: hp('4%'),
    flex: 2,
    textAlignVertical: "center",
    //backgroundColor: "blue",
    marginBottom: 48
  },
  btnContainer: {
    marginVertical: 24
  }
});


const mapStateToProps = state => {
  return {
    orientation: state.orientation,
    scene: state.scene,
    userId: state.userId,
    firstname: state.firstname
  }
}


const mapDispatchToProps = dispatch => {
  return {
    upDateOrientation: (orientation) => {
      dispatch({ type: 'EDIT_ORIENTATION', payload: orientation })
    },
    upDateScene: (scene) => {
      dispatch({ type: 'EDIT_SCENE', payload: scene })
    },
    upDateUserId: (userId) => {
      dispatch({ type: 'EDIT_USERID', payload: userId })
    },
    upDateUserRole: (userrole) => {
      dispatch({ type: 'EDIT_USERROLE', payload: userrole })
    },
    upDateName: (name) => {
      dispatch({ type: 'EDIT_NAME', payload: name })
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
