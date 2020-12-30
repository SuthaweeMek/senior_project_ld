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
    Dimensions,
    Alert
} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import backgroundLogin from '../resource/image/backgroundLogin.png'
import Router from '../router'
import ButtonCurve from '../component/buttonCurve';
import { connect } from 'react-redux';
import InputBox from '../component/inputBox';
import SelectionInput from '../component/picker';
import ButtonStart from '../component/buttonStart';
import Device from '../utils/Device';

width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

console.log("is tablet ?",Device.isTablet())
console.log("Device height = ", height, " and width = ", width)

const StartTestScene = (props) => {
    const onPress = async () => {
        let res = await fetch(
            'http://10.0.2.2:8000/test/',
            {
                method: 'post',
                body: JSON.stringify({
                    "Round": 0,
                    "LDResult": 0,
                    "UserID": 1,
                    "TestSet": 1
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
        <View style={styles.containerStartTest} >
                <Text style={styles.fontStartTest} >แบบทดสอบ</Text>
                <Text style={styles.fontStartTestInput} >รหัสประจำตัวเด็ก</Text> 
                <InputBox text="รหัสประจำตัวเด็ก"></InputBox>
                <View style={styles.containerStartTestInput}>
                    <View>
                        <Text style={styles.fontStartTestInput} >เพศ</Text> 
                        <SelectionInput></SelectionInput>
                    </View>
                    <View>
                        <Text style={styles.fontStartTestInput} >ชื่อ-สกุล</Text> 
                        <InputBox text="ชื่อและนามสกุล"></InputBox>
                    </View>    
                </View>
                <Text style={styles.fontStartTestInput} >อายุ</Text> 
                <InputBox text="อายุ"></InputBox>
                <View style={styles.buttonStartPosition}>
                <ButtonStart style={styles.buttonStart} text="กดเพื่อเริ่มแบบทดสอบ" onPress={onPress}/>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center', 
        //alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor : "gray"
        //flex: 1 1 auto,
        //marginTop: 22
    },
    containerStartTest: {
        flex: 1,
        width : width/1.8,
        flexDirection: 'column',
        backgroundColor : "white",
        margin : height-(height*0.9) 
        //justifyContent: 'center', 
        //alignItems: 'center'
        //flex: 1 1 auto, 
        //marginTop: 22
    },
    containerStartTestInput: {
        flexDirection: 'row',
        backgroundColor : "white",
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
    buttonStartPosition: {
        marginTop:31,
        marginBottom:30,
        alignSelf:"center"
    },
    buttonStart: {
        height : 5200
    },
    fontStartTest: {
        color: 'black',
        fontSize: 50,
        fontWeight: "bold",
        marginTop:40,
        marginBottom:30,
        alignSelf:"center"
    },
    fontStartTestInput: {
        color: 'black',
        fontSize: 20,
        marginLeft:70,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontMenuProfile: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontMenuContent: {
        color: 'white',
        fontSize: 15,
        alignItems: 'center',
        paddingLeft: 5,
    },
    containerMenuContent: {
        marginTop: 10,
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    containerMenuContentRow: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    containerMenuFooter: {
        flex: 1,
        paddingBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    containerContent: {
        backgroundColor: "blue",
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        resizeMode: "cover",
    },
    imageProfile: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
});
const mapStateToProps = state => {
    return {
        text: state.global,
        scene: state.scene
    }
}


const mapDispatchToProps = dispatch => {
    return {
   
        upDateScene: (scene) => {
            dispatch({ type: 'EDIT_SCENE', payload: scene })
        },
        upDateTestId: (testId) => {
            dispatch({ type: 'EDIT_TESTID', payload: testId })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartTestScene);
