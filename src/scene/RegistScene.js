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
  TouchableOpacity,
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
import Font from '../resource/font';
import { Icon } from 'react-native-elements'
import imageRegistTypeDocter from '../resource/image/registTypeDocter.png'
import imageRegistTypeStudent from '../resource/image/registTypeStudent.png'

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
  const [surname, setSurname] = useState('')
  const [stateregist, setStateregist] = useState(1)
  const [registTypeSelect, setRegisttypeSelect] = useState("student")
  const [currentDate, setCurrentDate] = useState(null)
  const [stepColor, setStepcolor] = useState([{ backgroundColor: Color.Gray }, { backgroundColor: Color.Gray }])


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
  const checkStateregist = async (stateRegist) => {
    switch (stateRegist) {
      case 2:
        if (username == "") {
          console.log("username is empty")
          break
        }
        if (password == "" || password2 == "") {
          console.log("password is empty")
          break
        }
        if (password != password2) {
          console.log("Passwords are not the same")
          break
        }
        setStateregist(3)
        break
      case 3:
        if (idnumber == "") {
          console.log("idnumber is empty")
          break
        }
        if (name == "") {
          console.log("name is empty")
          break
        }
        if (surname == "") {
          console.log("surname is empty")
          break
        }
        if (currentDate == null) {
          console.log("currentDate is empty")
          break
        }
        let res = await fetch('http://10.0.2.2:8000/users/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userid: username,
            password: password,
            idnumber: idnumber,
            name:name,
            surname:surname,
            birthday:formatDate(currentDate),
            education:key.key,
            is_student: registTypeSelect == "student"? 1:0  
          })
        })
          let responseJson = await res.json();
          if (res.ok) {
            alert("Register Success")
            props.upDateScene(-1)
          }
          else{
            alert("Register Failed")
            console.log('error: ' , responseJson);
          }
        break
    }
  }


  const formatDate = (date) =>{
    format = String(date.getFullYear())+"-"+String(date.getMonth()+1)+"-"+String(date.getDate())
    return format
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
  const handleCurrentDate = (text) => {
    setCurrentDate(text)
  }
  const handleCurrentStudy = (text) => {
    setCurrentStudy(text)
  }

  useEffect(() => {
    console.log(stateregist)
    switch(stateregist){
      case 1 : 
        setStepcolor([{backgroundColor:Color.Gray},{backgroundColor:Color.Gray}])
        break
      case 2:
        setStepcolor([{ backgroundColor: Color.Background }, { backgroundColor: Color.Gray }])
        break
      case 3:
        setStepcolor([{ backgroundColor: Color.Background }, { backgroundColor: Color.Background }])
        break
    }
  }, [stateregist])
  useEffect(() => {
    // console.log("test",props.upDateOrientation)

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
      <StatusBar translucent={false} barStyle={"light-content"} backgroundColor={Color.Background} />
      {/* <ImageBackground source={backgroundLogin} style={styles(props.orientation).background} resizeMode={"stretch"}> */}
      <KeyboardAvoidingView
        // behavior={props.orientation=="landscape"? Platform.OS === "ios" ? "padding" : "height": Platform.OS === "ios" ? "padding" : "height"}
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles(props.orientation).container}
      >
        <SafeAreaView style={styles(props.orientation).container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles(props.orientation).inner, { top: moveAnim, opacity: fadeAnim }]}>
              <View style={{ flex: 1 }} />
              <View style={[styles(props.orientation).containerFill]}>
                <View style={{ flexDirection: "row", width: wp(90) }}>
                  {/* <View style={{flexDirection:"column",width:wp(50)}}> */}
                      <TouchableOpacity onPress={() =>  {stateregist == 1 ? console.log("go to login scene") :setStateregist(stateregist-1)}}>
                      <Icon
                                //reverse
                                name={"chevron-back"}
                                type='ionicon'
                                color= {"black"} 
                                size={wp('6%')}
                                style={{alignSelf:"flex-start"}}
                                />
                    </TouchableOpacity>

                  {/* </View> */}

                  <Text style={styles(props.orientation).fontTopic}>
                    ระบบสมัครสมาชิก
                </Text>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 2 }} />
                  <View style={{ flexDirection: 'column', alignItems: "center" }}>
                    <View style={[styles(props.orientation).circleStepProgressBar]}>
                      <Text style={styles(props.orientation).numberStepProgressBar}>1</Text>
                    </View>
                  </View>

                  <View style={[{ flex: 1, height: 1, }, stepColor[0]]} />

                  <View style={{ flexDirection: 'column', alignItems: "center" }}>
                    <View style={[styles(props.orientation).circleStepProgressBar, stepColor[0]]}>
                      <Text style={styles(props.orientation).numberStepProgressBar}>2</Text>
                    </View>
                  </View>

                  <View style={[{ flex: 1, height: 1, }, stepColor[1]]} />

                  <View style={{ flexDirection: 'column', alignItems: "center" }}>
                    <View style={[styles(props.orientation).circleStepProgressBar, stepColor[1]]}>
                      <Text style={styles(props.orientation).numberStepProgressBar}>3</Text>
                    </View>
                  </View>
                  <View style={{ flex: 2 }} />
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 2 }} />
                  <Text style={styles(props.orientation).textStepProgressBar}>ประเภท</Text>
                  <View style={{ flex: 0.5, }} />
                  <Text style={styles(props.orientation).textStepProgressBar}>สร้างบัญชี</Text>
                  <View style={{ flex: 0.5, }} />
                  <Text style={styles(props.orientation).textStepProgressBar}>ข้อมูลส่วนตัว</Text>
                  <View style={{ flex: 2 }} />
                </View>

                {stateregist == 1 ? <>
                  <Text style={[styles(props.orientation).textTitle]} >ประเภทสมาชิก</Text>
                  <View style={{flexDirection:"row"}}>
                    <TouchableOpacity disabled={registTypeSelect=="student"?true:false} onPress={()=>{setRegisttypeSelect("student") ,setCurrentStudy("1"),setCurrentDate(null)}}>
                      <View style={[styles(props.orientation).containerRegistType,{opacity:registTypeSelect=="student"?1:0.5}]}>
                        <Image source={imageRegistTypeStudent} style={styles(props.orientation).imageRegistType} />
                        <Text style={styles(props.orientation).textRegistType}>นักเรียน</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={registTypeSelect=="personnel"?true:false} onPress={()=>{setRegisttypeSelect("personnel"),setCurrentStudy("0"),setCurrentDate(new Date)}}>
                      <View style={[styles(props.orientation).containerRegistType,{opacity:registTypeSelect=="personnel"?1:0.5}]}>
                        <Image source={imageRegistTypeDocter} style={styles(props.orientation).imageRegistType}/>
                        <Text style={styles(props.orientation).textRegistType}>บุคลากร</Text>        
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles(props.orientation).textRegistType}>ท่านสมัครสมาชิกในฐานะ : {registTypeSelect == "personnel" ? "บุคลากร" : "นักเรียน"}</Text>

                </>
                  : null}

                {stateregist == 2 ? <>
                  <Text style={[styles(props.orientation).textTitle]} >ชื่อบัญชีและรหัสผ่าน</Text>
                  <InputBoxLogin text={username} onChangeText={handleUser} placeholder="Username" icon="user" size={{ hp: hp('6%'), wp: wp('80%') }} />
                  <InputBoxLogin text={password} onChangeText={handlePassword} placeholder="Password" icon="key" size={{ hp: hp('6%'), wp: wp('80%') }} password={true} />
                  <InputBoxLogin text={password2} onChangeText={handlePassword2} placeholder="Confirm Password" icon="key" size={{ hp: hp('6%'), wp: wp('80%') }} password={true} />
                </>
                  : null}

                {stateregist == 3 ? <>
                  <Text style={[styles(props.orientation).textTitle]} >ข้อมูลส่วนตัว</Text>
                  <InputBoxLogin text={idnumber} onChangeText={handleID} placeholder="ID Number" icon="id-card" size={{ hp: hp('6%'), wp: wp('80%') }} />
                  
                  {registTypeSelect=="student"?
                  <View style={{flexDirection:"row"}}>
                    <InputBoxLogin text={name} onChangeText={handleName} placeholder="Name" icon="user" size={{ hp: hp('6%'), wp: wp('39%') }} />
                    <View style={{width:wp('2%')}}></View>
                    <InputBoxLogin text={surname} onChangeText={handleSurname} placeholder="Surname" icon="user" size={{ hp: hp('6%'), wp: wp('39%') }} />
                  </View>
                  :<>
                      <InputBoxLogin text={name} onChangeText={handleName} placeholder="Name" icon="user" size={{ hp: hp('6%'), wp: wp('80%') }} />
                      <InputBoxLogin text={surname} onChangeText={handleSurname} placeholder="Surname" icon="user-friends" size={{ hp: hp('6%'), wp: wp('80%') }} />

                  </>}
                  {registTypeSelect=="student"?
                    <View style={styles(props.orientation).containerInfo}>
                      <Text style={styles(props.orientation).textInfo}>วันเกิด : </Text>
                      <DateTimePicker onChangeDate={handleCurrentDate} size={{ hp: hp('6%'), wp: wp('35%') } }/>
                    </View>
                  :null}
                  {registTypeSelect=="student"?
                    <View style={styles(props.orientation).containerInfo} >
                      <Text style={styles(props.orientation).textInfo}>ระดับชั้นปีที่กำลังศึกษา : </Text>
                      {props.orientation == "portrait" ? <SelectionInput onChangeItem={handleCurrentStudy} value={value} size={{ hp: hp('6%'), wp: wp('35%') }} items={pickerItem} title="ระดับชั้นปีที่กำลังศึกษา" /> : <SelectionInput onChangeItem={handleCurrentStudy} value={value} size={{ hp: hp('6%'), wp: wp('35%') }} items={pickerItem} title="ระดับชั้นปีที่กำลังศึกษา" />}
                    </View>
                    : null}


                </>
                  : null}

                <View style={styles(props.orientation).btnContainer}>
                  <ButtonCurveLogin onPress={() => {
                    stateregist == 1 ? setStateregist(2) :
                      stateregist == 2 ? checkStateregist(2) : checkStateregist(3)
                    }} 
                    text={stateregist == 3 ? "สมัครสมาชิก" : "ถัดไป >"} 
                    size={{ hp: hp('6%'), wp: wp('30%') }} />
                </View>
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
    fontFamily: Font.Bold,
    // color: "#66b4c1",
    color: "black",
    fontSize: props == "portrait" ? wp('6%') : wp('4%'),
    // alignSelf: 'center',
    textAlign: "center",
    textAlignVertical: "center",
    // backgroundColor:"blue",
    width: wp("78%")
    // marginTop: hp('3%'),
  },
  fontRegis: {
    fontSize: hp('2%'),
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
    opacity: 0,
    backgroundColor: Color.Background,
    //margin: height - (height * 0.95)
  },
  containerFill: {
    borderRadius: hp("2%"),
    backgroundColor: Color.White,
    padding: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
    height:hp("90%"),
    // margin:hp('3%')
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
    marginVertical: 15,
    alignSelf: 'flex-end',
  },
  circleStepProgressBar: {
    borderRadius: wp('2%'),
    // borderWidth:1,
    // borderColor:Color.Surface,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.Background
  },
  numberStepProgressBar: {
    width: wp('4%'),
    height: wp('4%'),
    textAlign: 'center',
    fontSize: wp('2%'),
    textAlignVertical: "center",
    color: Color.White,
    fontFamily: Font.Bold
  },
  textStepProgressBar: {
    fontSize: wp('2%'),
    width: wp('11%'),
    textAlign: 'center',
    fontFamily: Font.Regular
  },
  containerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    alignSelf: "flex-start",
    paddingLeft: wp("6%")
  },
  textInfo: {
    fontSize: wp('3%'),
    paddingLeft: 12,
    fontFamily: Font.Regular,
  },
  containerRegistType:{
    padding : 12,
    margin :12,
    height : props=="portrait"?wp('30%'):wp('20%'),
    width : props=="portrait"?wp('30%'):wp('20%'),
    // flexDirection:"row",
    // borderColor : Color.Surface,
    backgroundColor: Color.Background,
    borderWidth: 2,
    borderRadius: wp('2%'),
    // justifyContent:"flex-start",
    // alignItems:"center",
    justifyContent: "center",
    alignItems: "center",
  },
  imageRegistType: {
    height: props == "portrait" ? wp('30%') : wp('20%'),
    width: props == "portrait" ? wp('30%') : wp('20%'),
  },
  imageRegistType:{
    height:props=="portrait"?wp('25%'):wp('16%'),
    width:props=="portrait"?wp('25%'):wp('16%'),
  }, 
  textRegistType:{
    fontFamily:Font.Bold,
    fontSize:wp('3%')
  },
  textTitle: {
    fontFamily: Font.Bold,
    fontSize: props == "portrait" ? wp('4%') : wp('3%'),
    alignSelf: "flex-start",
    paddingLeft: wp("6%"),
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
