import React, { useEffect, useState } from "react";
import {HOSTNAME} from "@env"
import { View, StyleSheet, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList, Image } from "react-native";
import { connect } from 'react-redux'
import Color from '../resource/color'
import Font from '../resource/font';
import { Icon } from 'react-native-elements'
import LocalStorage from '../utils/LocalStorage'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import { FontSize, LayoutSize } from '../resource/dimension'
import Device from '../utils/Device';
import DeviceInfo from 'react-native-device-info';
import { Picker } from '@react-native-picker/picker';

const ResultStudent = (props) => {
    let testId = props.testId[0]
    let testName = props.testId[1]
    let testSurname =props.testId[2]
    let testCreated = props.testId[3]
    const [testResult, setTestResult] = useState([]);
    const [selectTab, setSelectTab] = useState(0)
    const [imageList, setImageList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("")
    const [selectDate, setSelectDate] = useState("")
    const [selectedModalId, setSelectedModalId] = useState({ index: 0, item: "panding" });
    const [modalEditVisible,setModalEditVisible] = useState(false)
    const [editPrediction, setEditPrediction] = useState(0);
    const [imageModal, setImageModal] = useState("");

    // let selectDate = props.selectDate
    // let name = props.name
    let orientation = props.orientation

    const mapNumberToLabel = {
        0: "รอคุณหมอ",
        1: "เขียนถูก",
        2: "เขียนผิด",
        3: "กลับด้าน",
    }

    const quertTestResult = async (id) => {
        await fetch(`${HOSTNAME}/classificationsresult/?testid=${testId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await LocalStorage.readData("token")
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                setTestResult(responseJson)
            })
        // setTestId(id)
    }
    const queryImage = async () => {
        setImageList([])
        await fetch(`${HOSTNAME}/classifications/?testid=${testId}&type=${selectTab}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await LocalStorage.readData("token")
            },

        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
            else throw new Error(response.status);
        })
            .then((responseJson) => {
                setImageList(responseJson.articles)
            }).catch((error) => {
                console.log('error: ' + error);
            });
    }

    useEffect(() => {
        quertTestResult()
        return (()=>{props.upDateStudentScene(1)})
    }, [])

    useEffect(() => {
        queryImage()
    }, [selectTab])

    const handleEditPrediction = async (item) => {
        console.log(editPrediction)
        let res = await fetch(`${HOSTNAME}/classifications/edit/prediction/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await LocalStorage.readData("token")
            },
            body: JSON.stringify({
                id: item.id,
                prediction: editPrediction,
            })
        })
        let responseJson = await res.json();
        if (res.ok) {

            alert("Edit Success")
            queryImage()
            getTestResult(testId)
            console.log("checkedit", responseJson)
        }
        else {
            alert("Edit Failed")
            console.log('error: ', responseJson);
        }
    }
    
    const onPress = (tab) => {
        setSelectTab(tab)
    }

    const Item = ({ item, index, onPress }) => {
        return (<View
            style={styles({ orientation }).imageResult}
            onPress={() => {
                setImageModal(`${HOSTNAME}${item.ImageName}`)
                setModalVisible(true)
            }}
        >

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: wp('3%') }}>
                <Text style={styles({ orientation }).textResult}> {index + 1}) : {item.labelimage}  </Text>
                <TouchableOpacity onPress={onPress}>
                    <Icon
                        name={"pencil-square"}
                        type="font-awesome"
                        color={Color.Sub_Surface}
                        size={LayoutSize.IconEditResult}
                        style={{ margin: 5 }}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles({ orientation }).textResult}>โมเดลทำนาย : {mapNumberToLabel[item.prediction]}</Text>
            <Text style={styles({ orientation }).textResult}>ความน่าจะเป็น : {item.prediction == 1 ? item.predictionprob + "%" : "-"}</Text>
            <TouchableOpacity onPress={() => {
                setImageModal(`${HOSTNAME}${item.ImageName}`)
                setModalVisible(true)
            }}>
                <Image source={{ uri: `${HOSTNAME}${item.ImageName}` }} style={{
                    width: 120,
                    height: 120,
                    resizeMode: 'contain',
                }} />
            </TouchableOpacity>
        </View>
        )
    }


    const renderItem = ({ item, index }) => {
        //const backgroundColor = item === selectedId ? "#6e3b6e" : "#f9c2ff";
        return (
            <Item
                item={item}
                index={index}
                onPress={() => { console.log("index and item", item), setSelectedModalId({ index, item }), setModalEditVisible(true), setEditPrediction(item.prediction) }}
            />
        )
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalEditVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles({ orientation }).centeredView}>
                    <View style={styles({ orientation }).modalView}>
                        <TouchableOpacity
                            style={{ alignSelf: "flex-end" }}
                            onPress={() => {
                                setModalEditVisible(!modalEditVisible);
                            }}
                        >
                            <Icon
                                name={"cancel"}
                                type="materialIcons"
                                color={Color.Wrong}
                                size={LayoutSize.ModalCloseIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles({ orientation }).modalTitle}>แก้ไขข้อมูล</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: wp('3%') }}>
                            <Text style={styles({ orientation }).modalText}> {selectedModalId.index + 1}) : {selectedModalId.item.labelimage} </Text>
                        </View>
                        <Text style={styles({ orientation }).modalText}>โมเดลทำนาย :
                    <Picker
                                selectedValue={editPrediction}
                                style={{ height: 24, width: 185, borderBottomWidth: 2, borderBottomColor: Color.Gray, justifyContent: "flex-end", alignItems: "flex-end" }}
                                pickerStyleType={{ fontSize: wp(4), color: 'yellow' }}

                                mode="dropdown"
                                onValueChange={(itemValue, itemIndex) =>
                                //
                                { setEditPrediction(itemValue) }
                                }>
                                <Picker.Item label= {mapNumberToLabel[0]} value={0} />
                                <Picker.Item label={mapNumberToLabel[1]} value={1} />
                                <Picker.Item label={mapNumberToLabel[2]} value={2} />
                                <Picker.Item label={mapNumberToLabel[3]} value={3} />
                            </Picker>
                        </Text>
                        <Text style={styles({ orientation }).modalText}>ความน่าจะเป็น : 99%</Text>
                        <Image source={{ uri: `${HOSTNAME}${selectedModalId.item.ImageName}` }} style={{
                            width: 120,
                            height: 120,
                            resizeMode: 'contain',
                        }} />
                        <TouchableOpacity
                            style={{ ...styles({ orientation }).openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                handleEditPrediction(selectedModalId.item)
                                setModalEditVisible(!modalEditVisible);
                            }}
                        >
                            <Text style={styles({ orientation }).textStyle}>ยืนยันแก้ไข</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <TouchableOpacity style={styles({ orientation }).centeredView} onPress={() => setModalVisible(!modalVisible)}>

                    <Image source={{ uri: imageModal }} style={{
                        width: "50%",
                        height: "50%",
                        resizeMode: 'contain',
                    }}></Image>


                </TouchableOpacity>

            </Modal>
            <View style={styles({ orientation }).containerResult}>
                <View style={styles({ orientation }).appBars} >
                    <TouchableOpacity onPress={() => {
                        // setSelectItem(0)
                        // setTestId(-1)
                        props.upDateStudentScene(1)
                    }} >
                        <Icon
                            //reverse
                            name={"chevron-back"}
                            type='ionicon'
                            color={Color.Black}
                            size={36}
                            style={{ alignSelf: "flex-start", marginRight: 32 }}
                        />
                    </TouchableOpacity>
                    <Text style={[styles({ orientation }).headerText, {}]} >{props.studentID}/{testId} </Text>
                    <Text style={styles({ orientation }).dateInfoPersonal}>ทำแบบทดสอบ : {testCreated}</Text>

                </View>

                <View style={styles({ orientation }).containerinfoPersonal}>
                    <View style={{}}>
                        <Text style={styles({ orientation }).textInfoPersonal}>{testName} {testSurname}</Text>
                        {/* <Text style={styles({ orientation }).textInfoPersonal}>ความน่าจะเป็น 97.2431%</Text> */}
                        <Text style={styles({ orientation }).textInfoPersonal}>พยัญชนะ : {orientation == "portrait" ? "\n" : null}<Text style={{ color: Color.Correct }} >เขียนถูก {testResult.countAlphabetTrue} ตัว</Text> <Text style={{ color: Color.Wrong }}> เขียนผิด {testResult.countAlphabetFalse} ตัว </Text> <Text>เขียนกลับด้าน {testResult.countAlphabetMirror} ตัว</Text></Text>
                        <Text style={styles({ orientation }).textInfoPersonal}>สระ : {orientation == "portrait" ? "\n" : null}<Text style={{ color: Color.Correct }} >เขียนถูก {testResult.countVowelTrue} ตัว</Text><Text style={{ color: Color.Wrong }}> เขียนผิด {testResult.countVowelFalse} ตัว </Text> <Text>เขียนกลับด้าน {testResult.countVowelMirror} ตัว</Text></Text>
                        <Text style={styles({ orientation }).textInfoPersonal}>คำสะกด : {orientation == "portrait" ? "\n" : null}<Text style={{ color: Color.Correct }} >เขียนถูก {testResult.countVocabTrue} ตัว</Text><Text style={{ color: Color.Wrong }}> เขียนผิด {testResult.countVocabFalse} ตัว </Text></Text>
                    </View>
                    <View style={{ backgroundColor: "white", alignItems: "flex-end" }}>

                    </View>
                </View>


                <View style={styles({ orientation }).containerImagePersonal}>
                    <Text style={styles({ orientation }).titleImagePersonal}>รูปภาพการทำแบบทดสอบ</Text>
                    <View style={{ marginTop: "2%", flexDirection: 'row', paddingLeft: 16, }}>
                        <TouchableOpacity
                            style={[styles({ orientation }).backgroundSelectTab, selectTab == 0 ? { backgroundColor: Color.Sub_Background } : { backgroundColor: Color.Cover }]}
                            onPress={() => onPress(0)}

                        >
                            <Text style={[styles({ orientation }).fontSelectTab, selectTab == 0 ? { color: Color.Black } : { color: Color.Black }]}> พยัญชนะ </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles({ orientation }).backgroundSelectTab, selectTab == 1 ? { backgroundColor: Color.Sub_Background } : { backgroundColor: Color.Cover }]}
                            onPress={() => onPress(1)}

                        >
                            <Text style={[styles({ orientation }).fontSelectTab, selectTab == 1 ? { color: Color.Black } : { color: Color.Black }]}> สระ </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles({ orientation }).backgroundSelectTab, selectTab == 2 ? { backgroundColor: Color.Sub_Background } : { backgroundColor: Color.Cover }]}
                            onPress={() => onPress(2)}

                        >
                            <Text style={[styles({ orientation }).fontSelectTab, selectTab == 2 ? { color: Color.Black } : { color: Color.Black }]}> คำสะกด </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles({ orientation }).containerImageResult}>
                        <FlatList
                            data={imageList}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            // extraData={selectedStudent}
                            horizontal={false}
                            numColumns={DeviceInfo.isTablet() == true ? 4 : 2}
                        />
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = (props) => StyleSheet.create({
    containerResult: {
        flex: 1,
        //width: width / 1.8,
        flexDirection: 'column',
        //margin: height - (height * 0.9),
        marginVertical: hp("3%"),
        marginRight: props.orientation == "portrait" ? null : hp("3%"),
        paddingHorizontal: wp("4%"),
        paddingTop: hp("8%"),
        backgroundColor: Color.White,
        // borderTopRightRadius:50,
        // borderBottomRightRadius:50,
        borderRadius: LayoutSize.ContainerRadius,
    },
    appBars: {
        flexDirection: 'row',
        alignItems: "center",
    },
    headerText: {
        color: Color.Black,
        fontSize: props.orientation == "portrait" ? Device.fontSizer(FontSize.H6) : Device.fontSizer(FontSize.H6),
        // marginTop: 40,
        // marginBottom: 30,
        marginVertical: 12,
        alignSelf: "flex-start",

        fontFamily: Font.Bold,
    },
    dateInfoPersonal: {
        fontSize: Device.fontSizer(FontSize.H6),
        flex: 1,
        textAlign: "right",
        fontFamily: Font.Bold,
    },
    containerinfoPersonal: {
        // flex: 1.5,
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginHorizontal: "5%",
        // backgroundColor: Color.Black,
        padding: "2%"
    },
    textInfoPersonal: {
        // marginBottom: "1.5%",
        lineHeight: 24,
        color: Color.Black,
        // fontSize: props.orientation == "portrait" ? wp("2%") : wp("1.5%"),
        fontSize: Device.fontSizer(FontSize.Body1),
        fontFamily: Font.Regular,
    },
    containerImagePersonal: {
        flex: 3,
        paddingLeft: wp('1%'),
        paddingRight: wp('1%'),
        flexDirection: 'column',
    },
    titleImagePersonal: {
        marginLeft: "3%",
        fontSize: Device.fontSizer(FontSize.H6),
        fontFamily: Font.Bold,
    },
    backgroundSelectTab: {
        backgroundColor: Color.White,
        marginHorizontal: 8,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.White,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopEndRadius: LayoutSize.ContainerRadius,
        borderTopStartRadius: LayoutSize.ContainerRadius
    },
    fontSelectTab: {
        // color: selectTab == 0 ? "black" : 'rgba(142,142,142,1)', 
        color: Color.Black,
        fontSize: Device.fontSizer(FontSize.BUTTON),
        fontFamily: Font.Bold
    },
    containerImageResult: {
        flex: 16,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: LayoutSize.ContainerRadius,
        borderTopStartRadius: LayoutSize.ContainerRadius,
        backgroundColor: Color.Sub_Background,
    },
    centeredView: {
        flex: 1,
        // width: wp('15%'),
        // height:hp('15%'),
        backgroundColor: '#00000030',
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        // margin: 20,
        backgroundColor: Color.White,
        borderRadius: LayoutSize.ModalRadius,
        padding: LayoutSize.ModalPadding,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: Font.Bold,
        fontSize: Device.fontSizer(FontSize.H6)
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: Font.Regular,
        fontSize: Device.fontSizer(FontSize.Body1)
    },
    openButton: {
        backgroundColor: Color.OpenButton,
        borderRadius: LayoutSize.ButtonRadius,
        paddingHorizontal: LayoutSize.ButtonPaddingHorizontal,
        height : LayoutSize.ButtonHeight,
        minWidth : LayoutSize.ButtonMinWidth,
        justifyContent:"center",
        alignItems:"center",
        elevation: 2,
        alignSelf: "flex-end"
    },
    textStyle: {
        color: Color.White,
        fontFamily: Font.Bold,
        fontSize: Device.fontSizer(FontSize.BUTTON),
        textAlign: "center",
    },
    imageResult: {
        // color: "white",
        // width: wp('20%'),
        // flex:2,
        padding: "1%",
        // borderRightWidth:0.5,
        // borderLeftWidth:0.5,
        borderBottomWidth: 0.5,
    },
    textResult: {
        fontFamily: Font.Regular,
        fontSize: Device.fontSizer(FontSize.Body1),
    },
});

const mapStateToProps = state => {
    return {
        orientation: state.orientation,
        studentScene: state.studentScene,
        studentID: state.studentID,

    }
}


const mapDispatchToProps = dispatch => {
    return {
        upDateStudentScene: (studentScene) => {
            dispatch({ type: 'EDIT_STUDENTSCENE', payload: studentScene })
        },
        upDateStudentID: (studentID) => {
            dispatch({ type: 'EDIT_STUDENTID', payload: studentID })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultStudent);