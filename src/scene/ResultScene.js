/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {HOSTNAME} from '@env'
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
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    FlatList,
    Modal,
    Dimensions,
} from 'react-native';
import { NativeRouter, Route, Link, Redirect } from "react-router-native";
import imageAlphabet from '../resource/image/alphabet.jpg';
import Pagination from '../component/pagination'
import Device from '../utils/Device';
import Color from '../resource/color';
import Font from '../resource/font';
import { connect } from 'react-redux';
import SelectionInput from '../component/picker';
import { Icon } from 'react-native-elements'
import LocalStorage from '../utils/LocalStorage'
import DeviceInfo from 'react-native-device-info';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import { Picker } from '@react-native-picker/picker';
import { FontSize, LayoutSize } from '../resource/dimension'

//dimesions
width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

const DATA = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
const DATA2 = ["1", "2", "3", "4"]
const ResultScene = (props) => {
    var orientation = props.orientation
    const paginationSplit = DeviceInfo.isTablet() == true ? 5 : 4

    const [search, setSearch] = useState("");
    const [reportList, setReportList] = useState([1, 2, 3, 4, 5]);
    const [imageList, setImageList] = useState([]);
    const [selectItem, setSelectItem] = useState(0)
    const [selectTab, setSelectTab] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [paging, setPaging] = useState(0);
    const [selectedId, setSelectedId] = useState("1");
    const [resultNumber, setResultNumber] = useState("0");
    const [imageModal, setImageModal] = useState("");
    const [testId, setTestId] = useState(-1);
    const [childrenID, setChildrenID] = useState(-1)
    const [testResult, setTestResult] = useState([]);
    const [name, setName] = useState("")
    const [selectDate, setSelectDate] = useState("")
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [editPrediction, setEditPrediction] = useState(0);
    const [selectedModalId, setSelectedModalId] = useState({ index: 0, item: "panding" });

    const queryTestSearch = async () => {
        if (search == "") {
            fetch(`${HOSTNAME}/test/?page=${selectedId}`, {
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
                    setResultNumber(responseJson.count)
                    setReportList(responseJson.articles)
                }).catch((error) => {
                    console.log('error: ' + error);
                });
        }
        else {
            fetch(`${HOSTNAME}/test/?page=${selectedId}&condition=${search}`, {
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
                    setResultNumber(responseJson.count)
                    setReportList(responseJson.articles)
                }).catch((error) => {
                    console.log('error: ' + error);
                });
        }
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
        lor(props.upDateOrientation)
        return rol()
    }
        , [])

    // useEffect(()=>{setReportList},[orientation])
    const mapNumberToLabel = {
        0: "รอคุณหมอ",
        1: "เขียนถูก",
        2: "เขียนผิด",
        3: "กลับด้าน",
    }
    useEffect(() => {

        queryTestSearch()
    }, [selectedId])


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

    useEffect(() => {

        queryTestSearch()
    }, [search])


    useEffect(() => {
        queryImage()
    }, [testId, selectTab])

    const getTestResult = async (id) => {
        await fetch(`${HOSTNAME}/classificationsresult/?testid=${id}`, {
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
        setTestId(id)
    }
    const backText = "< "
    const onPress = (tab) => {
        setSelectTab(tab)

    }

    const Item = ({ item, index, onPress }) =>
    // <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    //   <Text style={styles.title}>{item}</Text>
    // </TouchableOpacity>
    {
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
            {console.log("test ", selectedModalId, "and", index)}
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


    const itemList = reportList.map((element, index) => {
        return (<>
            {element.childrenID ?
                < View style={styles({ orientation }).containerItemTable
                }>
                    {DeviceInfo.isTablet() == true ?
                        <>
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{element.id} - {element.childrenID.childrenID}</Text></View>
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{element.Round}</Text></View>
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{element.childrenID.name + " " + element.childrenID.surname}</Text></View>
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{element.created === undefined ? "Pending" : element.created.split("T")[0]}</Text></View>
                            <View style={styles({ orientation }).itemTable} >
                                <TouchableOpacity
                                    onPress={async () => {
                                        setImageList([])
                                        await getTestResult(element.id)
                                        setChildrenID(element.childrenID.childrenID)
                                        setSelectItem(1)
                                        setSelectTab(0)
                                        setSelectDate(element.created.split("T")[0])
                                        setName(element.childrenID.name + " " + element.childrenID.surname)
                                    }}
                                    color={Color.Sub_Surface}
                                >
                                    {/* <Text style={styles({ orientation }).textItemTable}>
                                        ๐ ๐ ๐
                                    </Text> */}
                                    <Icon
                                        name={"more-horizontal"}
                                        type="feather"
                                        color={Color.Sub_Surface}
                                        size={48}
                                    />
                                </TouchableOpacity>
                            </View>
                        </>
                        :
                        <>
                            <View style={styles({ orientation }).itemTableName}>
                                <View style={{ flexDirection: "column" }}>
                                    <Text style={[styles({ orientation }).textItemTable, { color: Color.Cover }]}>{element.childrenID.childrenID} ({element.Round})</Text>
                                    <Text style={styles({ orientation }).textItemTable}>{element.childrenID.name + " " + element.childrenID.surname}</Text>
                                </View>
                            </View>
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{element.created === undefined ? "Pending" : element.created.split("T")[0]}</Text></View>
                            <View style={styles({ orientation }).itemTable} >
                                <TouchableOpacity
                                    onPress={async () => {
                                        setImageList([])
                                        await getTestResult(element.id)
                                        setSelectItem(1)
                                        setSelectTab(0)
                                        setSelectDate(element.created.split("T")[0])
                                        setName(element.childrenID.name + " " + element.childrenID.surname)
                                    }}
                                    color={Color.Sub_Surface}
                                >
                                    <Icon
                                        name={"more-horizontal"}
                                        type="feather"
                                        color={Color.Sub_Surface}
                                        size={48}
                                    />
                                </TouchableOpacity>
                            </View>
                        </>
                    }

                </View > : null
            }</>)

    })

    if (selectItem) {
        return (<>
            {/* Model PREDICTIONedit */}
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
                                <Picker.Item label={mapNumberToLabel[0]} value={0} />
                                <Picker.Item label={mapNumberToLabel[1]} value={1} />
                                <Picker.Item label={mapNumberToLabel[2]} value={2} />
                                <Picker.Item label={mapNumberToLabel[3]} value={3} />
                            </Picker>
                        </Text>
                        {/* <Text style={styles({ orientation }).modalText}>ความน่าจะเป็น : 99%</Text> */}
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
                {/* <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", }}>


                    <TouchableOpacity onPress={() => {
                        setSelectItem(0)
                        setTestId(-1)
                    }} >
                        <Icon
                            //reverse
                            name={"chevron-back"}
                            type='ionicon'
                            color={"black"}
                            size={wp('4%')}
                        />
                    </TouchableOpacity>
                    <Text style={styles({ orientation }).textIDPersonal}>{testId}</Text>
                </View> */}
                    <View style={styles({ orientation }).appBars} >
                        <TouchableOpacity onPress={() => {
                        setSelectItem(0)
                        setTestId(-1)
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
                        <Text style={[styles({ orientation }).headerText, {}]} >{testId} - {childrenID} </Text>
                        <Text style={styles({ orientation }).dateInfoPersonal}>{selectDate}</Text>

                    </View>

                <View style={styles({ orientation }).containerinfoPersonal}>
                    <View style={{}}>
                        <Text style={styles({ orientation }).textInfoPersonal}>{name}</Text>
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
                    <View style={{ marginTop: "2%", flexDirection: 'row',paddingLeft:16, }}>
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
                            extraData={selectedModalId}
                            horizontal={false}
                            numColumns={DeviceInfo.isTablet()==true ?4:2}
                        />
                    </View>
                </View>
            </View>


        </>)
    } else {
        return (

            <>
                <View style={styles({ orientation }).container}>
                    <View style={styles({ orientation }).containerResult}>
                        {/* <Text style={styles({ orientation }).headerText}>ผลลัพธ์</Text> */}
                        {props.orientation == 'portrait' ?
                            <View style={styles({ orientation }).appBars} >
                                <TouchableOpacity onPress={() => { props.upDateMenuDrawer(true), console.log("moo", props.menuDrawer) }}>
                                    <Icon
                                        //reverse
                                        name={"bars"}
                                        type='font-awesome'
                                        color={Color.Black}
                                        size={24}
                                        style={{ alignSelf: "flex-start", marginRight: 32 }}
                                    />
                                </TouchableOpacity>
                                <Text style={[styles({ orientation }).headerText, {}]} >ผลลัพธ์ </Text>
                            </View>
                            :
                            <Text style={styles({ orientation }).headerText} >ผลลัพธ์</Text>
                        }
                        <TextInput
                            style={styles({ orientation }).searchBox}
                            onChangeText={text => setSearch(text)}
                            value={search}
                            placeholder="ค้นหา"
                        />

                        <View style={styles({ orientation }).table}>
                            <View style={styles({ orientation }).containerTitleTable}>
                                {DeviceInfo.isTablet() == true ?
                                    <>
                                        <Text style={styles({ orientation }).textTitleTable}>เลขที่</Text>
                                        <Text style={styles({ orientation }).textTitleTable}>รอบที่</Text>
                                        <Text style={styles({ orientation }).textTitleTable}>ชื่อ-สกุล</Text>
                                        <Text style={styles({ orientation }).textTitleTable}>วันที่</Text>
                                        <Text style={styles({ orientation }).textTitleTable}></Text>

                                    </>
                                    :
                                    <>
                                        <Text style={styles({ orientation }).textTitleTable}>ชื่อ-สกุล</Text>
                                        <Text style={styles({ orientation }).textTitleTable}></Text>
                                        <Text style={styles({ orientation }).textTitleTable}>วันที่</Text>
                                        <Text style={styles({ orientation }).textTitleTable}></Text>
                                        <Text></Text>
                                    </>
                                }
                            </View>
                            {itemList}

                            <View style={styles({ orientation }).containerPagination}>
                                {paging > 0 ? <TouchableOpacity onPress={() => { setPaging(paging - 1) }} style={styles({ orientation }).buttonPagination} >
                                    <Text style={styles({ orientation }).textButtonPagination}>ก่อน</Text>
                                </TouchableOpacity> : null}
                                <Pagination paging={paging} number={resultNumber} split={paginationSplit} selectedId={selectedId} setSelectedId={setSelectedId} />
                                {/* วิธีคิด pagging คือต้องเอา number/split -1*/}
                                {paging < resultNumber / paginationSplit - 1 ? <TouchableOpacity onPress={() => { setPaging(paging + 1) }} style={styles({ orientation }).buttonPagination} >
                                    <Text style={styles({ orientation }).textButtonPagination}>หลัง</Text>
                                </TouchableOpacity> : null}
                            </View>
                        </View>

                    </View>
                </View>

            </>
        );
    }
}

const styles = (props) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Color.Background
    },
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
    headerText: {
        color: Color.Black,
        fontSize: props.orientation == "portrait" ? Device.fontSizer(FontSize.H6) : Device.fontSizer(FontSize.H6),
        // marginTop: 40,
        // marginBottom: 30,
        marginVertical: 12,
        alignSelf: "flex-start",

        fontFamily: Font.Bold,
    },
    appBars: {
        flexDirection: 'row',
        alignItems: "center",
    },
    searchBox: {
        height: LayoutSize.InputHeight,
        width: DeviceInfo.isTablet() == true ? '40%' : '100%',
        borderColor: Color.Sub_Surface,
        borderWidth: 2,
        alignSelf: 'flex-end',
        // marginRight: "5%",
        paddingHorizontal: LayoutSize.InputPaddingLeft,
        fontSize: Device.fontSizer(FontSize.Subtitle1),
        fontFamily: Font.Regular,
        borderRadius: LayoutSize.InputCurveRadius,
    },
    table: {
        flex: 1,
        margin: "5%",
        // backgroundColor: 'red'
    },
    containerTitleTable: {
        margin: "1%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textTitleTable: {
        flex:1,
        textAlign:"center",
        color: Color.Black,
        fontSize: Device.fontSizer(FontSize.Body2),
        fontWeight: "bold",

    },
    containerItemTable: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        // flex:1,
        height: 52,
        alignItems: 'center',
        // marginTop: "2%",
        // paddingBottom: "1%",
        borderBottomColor: Color.Gray,
        borderBottomWidth: 1,
    },
    itemTableName: {
        flex: 4,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: "flex-end",
    },
    itemTable: {
        flex: DeviceInfo.isTablet() ? 1 : 2,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: "center",
    },
    textItemTable: {
        color: Color.Black,
        fontSize: Device.fontSizer(FontSize.Body2)
    },
    containerPagination: {
        // margin : 16,
        marginVertical: 16,
        // flexDirection: DeviceInfo.isTablet()==true ? "row":"column",
        flexDirection: "row",
        justifyContent: "center",
        // backgroundColor:"blue",
        // alignSelf:"flex-start",
    },
    buttonPagination: {
        backgroundColor: Color.Sub_Surface,
        // padding: 8,
        borderRadius: LayoutSize.PaginationBorderRadius,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textButtonPagination: {
        fontSize: Device.fontSizer(FontSize.H6),
        paddingHorizontal: 12,
        fontFamily: Font.Bold,
    },

    textIDPersonal: {
        fontSize: wp(4),
        marginVertical: 12,
        fontFamily: Font.Bold,
    },
    containerinfoPersonal: {
        // flex: 1.5,
        flexDirection: 'row',
        justifyContent:"flex-start",
        marginHorizontal: "5%",
        // backgroundColor: Color.Black,
        padding: "2%"
    },
    textInfoPersonal: {
        // marginBottom: "1.5%",
        lineHeight : 24,
        color: Color.Black,
        // fontSize: props.orientation == "portrait" ? wp("2%") : wp("1.5%"),
        fontSize : Device.fontSizer(FontSize.Body1),
        fontFamily: Font.Regular,
    },
    dateInfoPersonal: {
        fontSize: Device.fontSizer(FontSize.H6),
        flex:1,
        textAlign : "right",
        fontFamily: Font.Bold,
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
        borderTopEndRadius: LayoutSize.ContainerRadius ,
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
});

const mapStateToProps = state => {
    return {
        orientation: state.orientation,
        menuDrawer: state.menuDrawer,

    }
}


const mapDispatchToProps = dispatch => {
    return {
        upDateOrientation: (orientation) => {
            dispatch({ type: 'EDIT_ORIENTATION', payload: orientation })
        },
        upDateMenuDrawer: (menuDrawer) => {
            dispatch({ type: 'EDIT_DRAWER', payload: menuDrawer })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScene);
