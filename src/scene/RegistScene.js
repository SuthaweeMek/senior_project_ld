/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef, useEffect } from 'react';
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
import AsyncStorage from '@react-native-community/async-storage'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import Device from '../utils/Device'
import { connect } from 'react-redux';
import SelectionInput from '../component/picker';
import DateTimePicker from '../component/buttonDatePicker';
import Color from '../resource/color';

// //dimesions
// width = Device.isPortrait() ? Dimensions.get('window').height : Dimensions.get('window').width //1:4.65
// height = Device.isPortrait() ? Dimensions.get('window').width : Dimensions.get('window').height //1:4.65  


const RegistScene = (props) => {
  const [token, setToken] = useState('5')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [idnumber, setIdnumber] = useState('')
  const [name, setName] = useState('')
  const [surname,setSurname] = useState('')
  const [stateregist,setStateregist] = useState(1)

  const moveAnim = useRef(new Animated.Value(-25)).current  // Initial value for top : 0
  const fadeAnim = useRef(new Animated.Value(0)).current // Initial value for fontSize: 28
  // console.log("ore",orientation,"style : ",orientation=="portrait" ? "portrait":"landscape"," hp wp",hp(100),"and",wp(100))
  // console.log("orientation ",Device.orientation())

  const [key, setCurrentStudy] = useState("1")
  const [value, setValue] = useState({ key: "1", value: "ประถมศึกษาปีที่ 1" })
  const pickerItem = [
    {
      key: "1", value: "ประถมศึกษาปีที่ 1"
    },
    {
      key: "2", value: "ประถมศึกษาปีที่ 2"
    },
    {
      key: "3", value: "ประถมศึกษาปีที่ 3"
    },
    {
      key: "4", value: "ประถมศึกษาปีที่ 4"
    },
    {
      key: "5", value: "ประถมศึกษาปีที่ 5"
    },
    {
      key: "6", value: "ประถมศึกษาปีที่ 6"
    },
  ];
  const saveData = async (STORAGE_KEY, value) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value)
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }



  const readData = async () => {
    try {
      const userToken = await AsyncStorage.getItem(STORAGE_KEY)

      if (userToken !== null) {
        setToken(userToken)
        console.log('checkcheck')

      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  const onPress = () => {
    fetch('http://10.0.2.2:8000/api/token/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.detail === undefined && !(responseJson.password !== undefined || responseJson.username !== undefined)) {
          setToken(responseJson.access)
          saveData('@token', responseJson.access)
          saveData('@refreshtoken', responseJson.refresh)
          props.upDateScene(0)
        }
        else {
          alert("Login failed")
        }

      })
      ;
  }
  const handleUser = (text) => {
    setUsername(text)
  }

  const handlePassword = (text) => {
    setPassword(text)
  }
  const handlePassword2 = (text) => {
    setPassword2(text)
  }

  const handleName = (text) => {
    setName(text)
  }

  const handleSurname = (text) => {
    setSurname(text)
  }

  const handleID = (text) => {
    setIdnumber(text)
  }
  const handleCurrentStudy = (text) => {
    setCurrentStudy(text)
  }


  useEffect(() => {
    // console.log("testtttttttttt",props.upDateOrientation)

    lor(props.upDateOrientation)
    Device.isTablet() ? null : Orientation.lockToPortrait();
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
      <StatusBar translucent={true} barStyle={"dark-content"} backgroundColor={"#00000000"} />
      {/* <ImageBackground source={backgroundLogin} style={styles(props.orientation).background} resizeMode={"stretch"}> */}
      <KeyboardAvoidingView
        // behavior={props.orientation=="landscape"? Platform.OS === "ios" ? "padding" : "height": Platform.OS === "ios" ? "padding" : "height"}
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles(props.orientation).container}
      >
        <SafeAreaView style={styles(props.orientation).container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles(props.orientation).inner, { top: moveAnim, opacity: fadeAnim }]}>
              <View style={{ flex: 1}}/>
                <View style={[styles(props.orientation).containerFill]}>
                  <Text style={styles(props.orientation).fontTopic}>
                    ระบบสมัครสมาชิก test {stateregist}
                              </Text>
                  {stateregist==1?<>
                  <InputBoxLogin text={username} onChangeText={handleUser} placeholder="Username" icon="user" size={{ hp: hp('6%'), wp: wp('80%') }} />
                  <InputBoxLogin text={password} onChangeText={handlePassword} placeholder="Password" icon="key" size={{ hp: hp('6%'), wp: wp('80%') }} password={true} />
                  <InputBoxLogin text={password2} onChangeText={handlePassword2} placeholder="Password" icon="key" size={{ hp: hp('6%'), wp: wp('80%') }} password={true} />
                  </>
                  :null}
                  {stateregist==2?<>
                  <InputBoxLogin text={idnumber} onChangeText={handleID} placeholder="ID Number" icon="user" size={{ hp: hp('6%'), wp: wp('80%') }} />
                  <InputBoxLogin text={name} onChangeText={handleName} placeholder="Name" icon="user" size={{ hp: hp('6%'), wp: wp('80%') }} />
                  <InputBoxLogin text={surname} onChangeText={handleSurname} placeholder="Surname" icon="key" size={{ hp: hp('6%'), wp: wp('80%') }} />
                  <View style={styles(props.orientation).btnContainer}>
                    {props.orientation == "portrait" ? <SelectionInput onChangeItem={handleCurrentStudy} value={value} size={{ hp: hp('6%'), wp: wp('80%') }} items={pickerItem} title="ระดับแบบทดสอบ" /> : <SelectionInput onChangeItem={handleCurrentStudy} value={value} size={{ hp: hp('6%'), wp: wp('50%') }} items={pickerItem} title="ระดับชั้นปีที่กำลังศึกษา" />}
                  </View>
                  </>
                  :null}

                  <View style={styles(props.orientation).btnContainer}>
                    <ButtonCurveLogin onPress={()=>{stateregist==1? setStateregist(2):setStateregist(1)}} text={stateregist==1? "ถัดไป":"ก่อนหน้า"} size={{ hp: hp('6%'), wp: wp('50%') }} />
                  </View>
                  <DateTimePicker/>
                </View>




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
    flex: 1,
  },
  logo: {
    height: hp('20%'),
    marginBottom: 36,
  },
  fontTopic: {
    fontFamily: 'EkkamaiNew-Bold',
    // color: "#66b4c1",
    color: "black",
    fontSize: wp('6%'),
    marginBottom: 36,
    alignSelf: 'center',
    // marginTop: hp('3%'),
  },
  fontForget: {
    fontSize: hp('2%'),
    fontFamily: 'EkkamaiNew-Bold',
    textAlign: "right",
    width: wp('85%'),
    marginTop: 10,
    //backgroundColor:"red"

  },
  fontRegis: {
    fontSize: hp('2%'),
    marginBottom: 36,
    textDecorationLine: 'underline',
    fontFamily: 'EkkamaiNew-Bold',
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
    opacity: 0,
    backgroundColor:Color.Background,
    //margin: height - (height * 0.95)
  },
  containerFill:{
    borderRadius:hp("2%"),
    backgroundColor:Color.White,
    padding:wp("2%"),
    justifyContent:"center",
    alignItems:"center"
    // margin:hp('3%')
  },
  header: {
    fontFamily: 'EkkamaiNew-Bold',
    fontSize: hp('4%'),
    flex: 2,
    textAlignVertical: "center",
    //backgroundColor: "blue",
    marginBottom: 48
  },
  btnContainer: {
    marginVertical: 15
  }
});


const mapStateToProps = state => {
  return {
    orientation: state.orientation,
    scene: state.scene
  }
}


const mapDispatchToProps = dispatch => {
  return {
    upDateOrientation: (orientation) => {
      dispatch({ type: 'EDIT_ORIENTATION', payload: orientation })
    },
    upDateScene: (scene) => {
      dispatch({ type: 'EDIT_SCENE', payload: scene })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistScene);
