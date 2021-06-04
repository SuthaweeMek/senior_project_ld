/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {HOSTNAME} from "@env"
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import imageOverlay from '../resource/image/LDSpotOverlay.png'
import ButtonCurve from '../component/buttonCurve.js';
import InputBoxLogin from '../component/inputboxLogin';
import { connect } from 'react-redux';
import SelectionInput from '../component/picker';
import Device from '../utils/Device';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import Color from '../resource/color';
import Font from '../resource/font';
import NegativeModal from '../component/negativeModal'
import LocalStorage from '../utils/LocalStorage'
import { Icon } from 'react-native-elements'
import { FontSize, LayoutSize } from '../resource/dimension'

width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65


const StartTestScene = (props) => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [childrenID, setChildrenID] = useState('HN')
    const [gender, setGender] = useState('m')
    const [vocabType, setVocabType] = useState({ key: "1", value: 1 ,text : "ง่าย" })
    const [age, setAge] = useState('')
    const [isChildren, setIsChildren] = useState(false)
    const [negativeModal, setNegativeModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [titleMessage, setTitleMessage] = useState("")
    const pickerItem = [
        {
            key: "1", value: 1 ,text : "ง่าย"
        },
        {
            key: "2", value: 2,text : "ปานกลาง"
        },
        {
            key: "3", value: 3,text  : "ยาก"
        },
        {
            key: "4", value: 4,text : "รวม"
        },
    ];
    const queryChildren = async () => {
        if (childrenID.length == 10) {
            let res = await fetch(
                `${HOSTNAME}/users/children/?childrenID=${childrenID}`,
                {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + await LocalStorage.readData("token")
                    },
                }
            );
            let responseJson = await res.json();
            if (res.status == 200) {
                setName(responseJson.children[0].name)
                setSurname(responseJson.children[0].surname)
                setAge(responseJson.age)
                setIsChildren(true)
            }
            else {
                setErrorMessage("กรุณาใส่ ChildrenID ให้ถูกต้อง")
                setTitleMessage("Can't find this ChildrenID")
                setNegativeModal(true)
                setIsChildren(false)
            }
        }
        else {
            if (isChildren === true) {
                setName("")
                setSurname("")
                setAge("")
                setIsChildren(false)
            }
        }
    }


    const queryChildrenById = async () => {

        let res = await fetch(
            `${HOSTNAME}/users/children/?id=${props.userId}`,
            {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await LocalStorage.readData("token")
                },
            }
        );
        let responseJson = await res.json();
        if (res.status == 200) {
            setChildrenID(responseJson.children[0].childrenID)
            setName(responseJson.children[0].name)
            setSurname(responseJson.children[0].surname)
            setAge(responseJson.age)
            setIsChildren(true)
        }
        else {
            alert("Cant find children")
        }

    }


    useEffect(() => {
        lor(props.upDateOrientation)
        if (props.userrole == 'student') {
            queryChildrenById()
        }
        return (rol())
    }
        , [])
    useEffect(() => {
        queryChildren()

    }
        , [childrenID])
    const handleChildrenID = async (text) => {
        setChildrenID(text)

    }
    const handleKey = (text) => {
        setVocabType(text)
    }
    const handleAge = (text) => {
        setAge(text)
        mapLeveltoValue(text)
    }

    const handleModalNegative = (bool) => {
        setNegativeModal(bool)
    }

    const onPress = async () => {
        if (isChildren) {
            let res = await fetch(
                `${HOSTNAME}/test/`,
                {
                    method: 'post',
                    body: JSON.stringify({
                        "Round": 0,
                        "LDResult": 0,
                        "UserID": props.userId,
                        "childrenID": childrenID,
                        "vocabtype": vocabType.value
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + await LocalStorage.readData("token")
                    },
                }
            );
            let responseJson = await res.json();
            if (res.status == 200) {
                props.upDateTestId(responseJson.test.id)
                props.upDateVocabIds(responseJson.wordIds.map((number)=>(("0" + number.id).slice(-2))))
                if(responseJson.test.Round > 0){
                    props.upDateScene(1)
                }else{
                    props.upDateScene(6)
                }
            }
        }
        else {
            setErrorMessage("ยังไม่ได้พิมรหัสผู้เข้าทำแบบทดสอบนะครับ")
            setTitleMessage("Can't find this ChildrenID")
            setNegativeModal(true)
        }
    }
    return (
        <View style={styles(props.orientation).container}>

            <View style={styles(props.orientation).containerStartTest} >
                {props.orientation == 'portrait' ?
                    <View style={styles(props.orientation).appBars} >
                        <TouchableOpacity onPress={() => { props.upDateMenuDrawer(true) }}>
                            <Icon
                                name={"bars"}
                                type='font-awesome'
                                color={Color.Black}
                                size={24}
                                style={{ alignSelf: "flex-start" ,marginRight:32}}
                            />
                        </TouchableOpacity>
                        <Text style={[styles(props.orientation).fontStartTest, {}]} >ข้อมูลผู้ทำแบบทดสอบ</Text>
                    </View> 
                    :
                    <Text style={styles(props.orientation).fontStartTest} >ข้อมูลผู้ทำแบบทดสอบ</Text>
                }


                <NegativeModal modalVisible={negativeModal} onChangeVisible={handleModalNegative} title={titleMessage} text={errorMessage} />

                {props.userrole == "student" ? <Text style={styles(props.orientation).fontStartTestInfo} >{"รหัสประจำตัวเด็ก : " + childrenID} </Text>
                    : <InputBoxLogin text={childrenID} onChangeText={handleChildrenID} maxLength={10} placeholder="รหัสประจำตัวเด็ก" icon="user" size={{ hp: hp('6%'), wp: 200 }} />}
                <View style={styles(props.orientation).containerStartTestInput}>
                    <Text style={styles(props.orientation).fontStartTestInfo} >ชื่อ-สกุล : {name == '' ? "-" : gender == 'm' ? "ชาย" : "หญิง"} {name} {surname}</Text>
                    <Text style={styles(props.orientation).fontStartTestInfo} >อายุ : {age}</Text>
                </View>
                <View style={styles(props.orientation).StartPosition}>
                    <Image source={imageOverlay} style={styles(props.orientation).ImageOverlay}/>
                    <Text style={styles(props.orientation).fontStartTestInput} >แบบทดสอบ</Text>
                    <View style={styles(props.orientation).Picker}>
                        <Text style={styles(props.orientation).fontStartTestInfo} >ระดับ : </Text>
                        {props.orientation == "portrait" ? <SelectionInput onChangeItem={handleKey} value={vocabType} size={{ hp: hp('5%'), wp: wp('45%') }} items={pickerItem} title="ระดับแบบทดสอบ" /> : <SelectionInput onChangeItem={handleKey} value={vocabType} size={{ hp: hp('6%'), wp: wp('30%') }} items={pickerItem} title="ระดับแบบทดสอบ" />}
                        {props.orientation == "portrait" ? null : <ButtonCurve text="เริ่มทำแบบทดสอบ" onPress={onPress} size={{ hp: hp('6%'), wp: wp('25%') }} />}
                    </View>
                    {props.orientation == "portrait" ? <ButtonCurve text="เริ่มทำแบบทดสอบ" onPress={onPress} size={{ hp: hp('5%'), wp: wp('50%') }} /> : null}
                </View>
            </View>
        </View>

    );
}

const styles = (props) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.Background
    },
    containerStartTest: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: hp("3%"),
        marginRight: props == "portrait" ? null:hp("3%"),
        paddingHorizontal: wp("4%"),
        paddingTop: hp("8%"),
        backgroundColor: Color.White,
        borderRadius: LayoutSize.ContainerRadius,
    },
    appBars:{
        flexDirection: 'row' ,
        alignItems:"center",
    },
    containerStartTestInput: {
        flexDirection: 'column',
        backgroundColor: Color.white,
        justifyContent: 'space-around',
    },

    containerMenuProfile: {
        flex: 4,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    StartPosition: {
        flex: 1,
        marginTop: 12,
        padding: 24,
        borderTopLeftRadius: LayoutSize.ContainerRadius,
        borderTopRightRadius: LayoutSize.ContainerRadius,
        justifyContent: "flex-start",
        alignItems: props == "portrait" ? "center" : "flex-start",
        backgroundColor: Color.Sub_Background
    },
    ImageOverlay:{
        position:'absolute',
        bottom :0,
        width: props == "portrait" ? wp('92%'):wp('71%'),
        height : props =="portrait" ? wp('92%'):wp('25%'),
        alignSelf:"center",
    },
    Picker: {
        flexDirection: "row",
        padding: 12,
        alignSelf: "center",
    },
    buttonStart: {
        height: hp('6%'),
        width: wp('50%'),
        padding: 200,
    },
    fontStartTest: {
        color: Color.Black,
        fontSize: props == "portrait" ? Device.fontSizer(FontSize.H6) : Device.fontSizer(FontSize.H6) ,
        marginVertical: 12,
        alignSelf: "flex-start",

        fontFamily: Font.Bold,
    },
    fontStartTestInput: {
        fontSize: Device.fontSizer(FontSize.H5),
        marginVertical: 12,
        alignSelf: 'flex-start',
        fontFamily: Font.Bold,
    },
    fontStartTestInfo: {
        fontSize: Device.fontSizer(FontSize.Body1),
        marginVertical: 8,

        fontFamily: Font.Regular,
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
        orientation: state.orientation,
        testId: state.testId,
        userId: state.userId,
        userrole: state.userrole,
        menuDrawer: state.menuDrawer,
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
        },
        upDateMenuDrawer: (menuDrawer) => {
            dispatch({ type: 'EDIT_DRAWER', payload: menuDrawer })
        },
        upDateVocabIds : (vocabIds) => {
            dispatch({type: 'EDIT_VOCABIDS',payload : vocabIds})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartTestScene);
