/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState,useEffect } from 'react';
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
    Dimensions,
    Alert
} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import backgroundLogin from '../resource/image/backgroundLogin.png'
import Router from '../router'
import ButtonCurve from '../component/buttonCurve.js';
import InputBoxLogin from '../component/inputboxLogin';
import { connect } from 'react-redux';
import InputBox from '../component/inputBox';
import SelectionInput from '../component/picker';
// import ButtonStart from '../component/buttonStart';
import Color from '../resource/color'
import Device from '../utils/Device';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'


width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

console.log("is tablet ?", Device.isTablet())
console.log("Device height = ", height, " and width = ", width)

const StartTestScene = (props) => {
    useEffect(() => {
        lor(props.upDateOrientation)
        return(rol())
    }    
    ,[])
    const [name, setName] = useState('ทดสอบ')
    const [surname, setSurname] = useState('สมจริง')
    const [childrenID, setChildrenID] = useState('')
    const [gender, setGender] = useState('m')
    const [level, setLevel] = useState("level_1")
    const [value, setValue] = useState({level: "level_1", value: "ระดับที่ 1"})
    const [age, setAge] = useState('16')
    const pickerItem = [
        {
            level: "level_1", value: "ระดับที่ 1" 
        },
        {
            level: "level_2", value: "ระดับที่ 2"
        },
        {
            level: "level_3", value: "ระดับที่ 3"
        },
        {
            level: "level_4", value: "ระดับที่ 4"
        },
        {
            level: "level_5", value: "ระดับที่ 5"
        },
      ];
    console.log("what ?",props.orientation == "portrait"?"true":"false")
    console.log(props.orientation)
    console.log(childrenID)
    console.log(gender)
    const handleName = (text) => {
        setName(text)
    }
    const handleChildrenID = (text) => {
        setChildrenID(text)
    }
    const handleLevel = (text) => {
        console.log("level = == = ",text)
        setLevel(text)
    }
    const handleAge = (text) => {
        setAge(text)
        mapLeveltoValue(text)
    }

    const onPress = async () => {
        let res = await fetch(
            'http://10.0.2.2:8000/test/',
            {
                method: 'post',
                body: JSON.stringify({
                    "Round": 0,
                    "LDResult": 0,
                    "UserID": 1,
                    "TestSet": 1,
                    "name": name,
                    "childrenID": childrenID,
                    "age": age,
                    "gender": gender
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        );
        let responseJson = await res.json();
        if (res.status == 200) {
            props.upDateTestId(responseJson.id)
            props.upDateScene(1)
        }
    }
    return (
        <View style={styles(props.orientation).container}>
            <View style={styles(props.orientation).containerStartTest} >
                <Text style={styles(props.orientation).fontStartTest} >ข้อมูลผู้ทำแบบทดสอบ</Text>
                {/* <Text style={styles(props.orientation).fontStartTestInput} >รหัสประจำตัวเด็ก</Text> */}
                <InputBoxLogin text={childrenID} onChangeText={handleChildrenID} placeholder="รหัสประจำตัวเด็ก" icon="user" size={{ hp: hp('6%'), wp: wp('35%') }} />
                {/* <InputBox text={childrenID} onChangeText={handleChildrenID} placeholder="รหัสประจำตัวผู้เข้าทำแบบทดสอบ"></InputBox> */}
                <View style={styles(props.orientation).containerStartTestInput}>
                    <Text style={styles(props.orientation).fontStartTestInfo} >เพศ : {gender == 'm' ? "ชาย" : "หญิง"} </Text>
                    {/* <SelectionInput onChangeGender={handleGender} value={gender}></SelectionInput> */}
                    <Text style={styles(props.orientation).fontStartTestInfo} >ชื่อ-สกุล : {gender == 'm' ? "เด็กชาย" : "เด็กหญิง"} {name} {surname}</Text>
                    {/* <InputBox text={name} onChangeText={handleName} placeholder="ชื่อและนามสกุล"></InputBox> */}
                    <Text style={styles(props.orientation).fontStartTestInfo} >อายุ : {age}</Text>
                    {/* <InputBox text={age} onChangeText={handleAge} placeholder="อายุ"></InputBox> */}
                </View>
                <View style={styles(props.orientation).StartPosition}>
                    <Text style={styles(props.orientation).fontStartTestInput} >แบบทดสอบ</Text>
                    <View style={styles(props.orientation).Picker}>
                        <Text style={styles(props.orientation).fontStartTestInfo} >ระดับ : </Text>
                        {props.orientation == "portrait"? <SelectionInput onChangeItem={handleLevel} value={value} size={{ hp: hp('5%'), wp: wp('45%') }} items={pickerItem} title="ระดับแบบทดสอบ"/>:<SelectionInput onChangeItem={handleLevel} value={value} size={{ hp: hp('6%'), wp: wp('30%') }} items={pickerItem} title="ระดับแบบทดสอบ"/>}
                        {props.orientation == "portrait"? null : <ButtonCurve text="เริ่มทำแบบทดสอบ" onPress={onPress} size={{ hp: hp('6%'), wp: wp('25%') }} />}
                    </View>
                    {props.orientation == "portrait"? <ButtonCurve text="เริ่มทำแบบทดสอบ" onPress={onPress} size={{ hp: hp('5%'), wp: wp('50%') }} />:null}
                </View>
            </View>
        </View>

    );
}

const styles = (props) => StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start', 
        // alignItems: 'flex-start',
        // alignSelf:"flex-start",
        //flexDirection: 'row',
        // marginVertical:20,
        // marginHorizontal:40,
        backgroundColor: Color.Background
        //flex: 1 1 auto,
        //marginTop: 22
    },
    containerStartTest: {
        flex: 1,
        //width: width / 1.8,
        flexDirection: 'column',
        //margin: height - (height * 0.9),
        marginVertical: hp("3%"),
        marginRight: hp("3%"),
        paddingHorizontal: wp("4%"),
        paddingTop: hp("8%"),
        backgroundColor: Color.White,
        // borderTopRightRadius:50,
        // borderBottomRightRadius:50,
        borderRadius: hp("3.5%"),
        //justifyContent: 'center', 
        //alignItems: 'center'
        //flex: 1 1 auto, 
        //marginTop: 22
    },
    containerStartTestInput: {
        flexDirection: 'column',
        backgroundColor: "white",
        justifyContent: 'space-around',
        //alignItems: 'center',
        //flex: 1 1 auto,
        //marginTop: 22
    },

    containerMenuProfile: {
        flex: 4,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    StartPosition: {
        flex: 1,
        // alignSelf: "center",
        marginTop: 12,
        padding: 24,
        borderTopLeftRadius: hp("3.5%"),
        borderTopRightRadius: hp("3.5%"),
        justifyContent: "flex-start",
        alignItems: props == "portrait"? "center":"flex-start",
        backgroundColor: Color.Sub_Background
    },
    Picker :{
     flexDirection: "row" ,
    //  alignContent:"center",
    //  justifyContent:"center",
     padding:12,
    alignSelf:"center",
    // alignItems:"center",
    // justifyContent:"flex-end",
    // alignItems: "flex-end",
    // backgroundColor:"red",
    },
    buttonStart: {
        height: hp('6%'),
        width: wp('50%'),
        padding:200,
    },
    fontStartTest: {
        color: 'black',
        fontSize: props == "portrait" ? wp('4%') : wp('4%'),
        // marginTop: 40,
        // marginBottom: 30,
        marginVertical: 12,
        alignSelf: "flex-start",

        fontFamily: "EkkamaiNew-Bold",
    },
    fontStartTestInput: {
        // color: 'black',
        fontSize: wp('3%'),
        // marginLeft: 70,
        // marginTop: 10,
        marginVertical: 12,
        // alignItems: 'center',
        alignSelf:'flex-start',
        fontFamily: "EkkamaiNew-Bold",
        // justifyContent: 'center'
    },
    fontStartTestInfo: {
        // color: 'black',t
        fontSize: wp('3%'),
        // marginLeft: 70,
        // marginTop: 10,
        marginVertical: 8,

        fontFamily: "EkkamaiNew-Regular",
        // justifyContent: 'center'
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        resizeMode: "cover",
    },
});
const mapStateToProps = state => {
    return {
        text: state.global,
        scene: state.scene,
        orientation: state.orientation
    }
}


const mapDispatchToProps = dispatch => {
    return {

        upDateScene: (scene) => {
            dispatch({ type: 'EDIT_SCENE', payload: scene })
        },
        upDateTestId: (testId) => {
            dispatch({ type: 'EDIT_TESTID', payload: testId })
        },
        upDateOrientation: (orientation) => {
            dispatch({ type: 'EDIT_ORIENTATION', payload: orientation })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartTestScene);
