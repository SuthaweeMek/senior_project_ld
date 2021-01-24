/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
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
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import { Picker } from '@react-native-picker/picker';

//dimesions
width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

const DATA = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
const DATA2 = ["1", "2", "3", "4"]
const ResultScene = (props) => {
    var orientation = props.orientation

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
    const [testId, setTestId] = useState(1);
    const [testResult, setTestResult] = useState([]);
    const [selectDate, setSelectedDate] = useState(new Date())
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [editPrediction, setEditPrediction] = useState(0);

    const [selectedModalId, setSelectedModalId] = useState({ index: 0, item: "panding" });

    useEffect(() => {
        lor(props.upDateOrientation)
        return rol()
    }
        , [])

    // useEffect(()=>{setReportList},[orientation])
    const mapNumberToLabel = {
        0: "อะไรเอ๋ย",
        1: "เขียนถูก",
        2: "เขียนผิด",
        3: "กลับด้าน",
    }
    const pickerItem = [
        {
            key: 0, value: "ไม่ยอมเขียนมา"
        },
        {
            key: 1, value: "เขียนถูก"
        },
        {
            key: 2, value: "เขียนผิด"
        },
        {
            key: 3, value: "เขียนกลับด้าน"
        },
    ];
    useEffect(() => {
        const queryTest = async () => {
            fetch(`http://10.0.2.2:8000/test/?page=${selectedId}`, {
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
            }
            ).then((responseJson) => {
                setResultNumber(responseJson.count)
                setReportList(responseJson.articles)
            }).catch((error) => {
                console.log('error: ' + error);
            });
        }
        queryTest()
    }, [selectedId])


    const handleEditPrediction = (item) => {
        // setEditPrediction(text)
        console.log("คุณแก้ไขการทำนายสำเร็จ id=",item.id," และแก้เป็น",editPrediction,"คือ",mapNumberToLabel[editPrediction])
         Alert.alert("คุณแก้ไขการทำนายสำเร็จ id="+item.id+"แก้เป็น" +editPrediction+ "คือ"+mapNumberToLabel[editPrediction])
    }

    useEffect(() => {
        const queryTest = async () => {
            if (search == "") {
                fetch(`http://10.0.2.2:8000/test/?page=${selectedId}`, {
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
                fetch(`http://10.0.2.2:8000/test/?page=${selectedId}&condition=${search}`, {
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
        queryTest()
    }, [search])


    useEffect(() => {
        const queryImage = async () => {
            setImageList([])
            await fetch(`http://10.0.2.2:8000/classifications/?testid=${testId}&type=${selectTab}`, {
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
        queryImage()
    }, [selectTab, testId])

    const getTestResult = async (id) => {
        await fetch(`http://10.0.2.2:8000/classificationsresult/?testid=${id}`, {
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

    const Item = ({ item, index, onPress }) => (
        // <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        //   <Text style={styles.title}>{item}</Text>
        // </TouchableOpacity>

        <View
            style={styles({ orientation }).imageResult}
            onPress={() => {
                setImageModal(`http://10.0.2.2:8000${item.ImageName}`)
                setModalVisible(true)
            }}
        >

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: wp('3%') }}>
                <Text style={styles({ orientation }).textResult}> {index + 1}) : ก  </Text>
                <TouchableOpacity onPress={onPress}>
                    <Icon
                        name={"pencil-square"}
                        type="font-awesome"
                        color={Color.Sub_Surface}
                        size={wp("3%")}
                        style={{ margin: 5 }}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles({ orientation }).textResult}>โมเดลทำนาย : {mapNumberToLabel[item.prediction]}</Text>
            <Text style={styles({ orientation }).textResult}>ความน่าจะเป็น : 99%</Text>
            <TouchableOpacity onPress={() => {
                setImageModal(`http://10.0.2.2:8000${item.ImageName}`)
                setModalVisible(true)
            }}>
                <Image source={{ uri: `http://10.0.2.2:8000${item.ImageName}` }} style={{
                    width: wp("12%"),
                    height: wp("12%"),
                    resizeMode: 'contain',
                }} />
            </TouchableOpacity>

            {/* Model edit */}
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
                                size={wp("3%")}
                            />
                        </TouchableOpacity>
                        <Text style={styles({ orientation }).modalTitle}>แก้ไขข้อมูล</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: wp('3%') }}>
                            <Text style={styles({ orientation }).modalText}> {selectedModalId.index + 1}) : ก  </Text>
                        </View>
                        <Text style={styles({ orientation }).modalText}>โมเดลทำนาย : 
                        <Picker
                            selectedValue={editPrediction}
                            style={{ height: wp(3), width: wp(15), borderBottomWidth: 2, borderBottomColor: Color.Gray ,justifyContent:"flex-end",alignItems:"flex-end"}}
                            pickerStyleType={{fontSize: wp(4),color:'yellow'}}

                            mode="dropdown"
                            onValueChange={(itemValue, itemIndex) =>
                                setEditPrediction(itemValue)
                            }>
                            <Picker.Item label="ไม่เขียนอะไรเลย" value={0} />
                            <Picker.Item label="เขียนถูก" value={1} />
                            <Picker.Item label="เขียนผิด" value={2} />
                            <Picker.Item label="กลับด้าน" value={3} />
                        </Picker>
                        </Text>
                        <Text style={styles({ orientation }).modalText}>ความน่าจะเป็น : 99%</Text>
                        <TouchableOpacity
                            style={{ ...styles({ orientation }).openButton, backgroundColor: "#2196F3" }}
                            onPress={ () => {
                                 handleEditPrediction(selectedModalId.item)
                                setModalEditVisible(!modalEditVisible);
                            }}
                        >
                            <Text style={styles({ orientation }).textStyle}>ยืนยันแก้ไข</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>

    );

    const renderItem = ({ item, index }) => {
        //const backgroundColor = item === selectedId ? "#6e3b6e" : "#f9c2ff";
        return (
            <Item
                item={item}
                index={index}
                onPress={() => { console.log("index and item", item), setSelectedModalId({ index, item }), setModalEditVisible(true) ,setEditPrediction(item.prediction )}}
            />
        )
    };


    const itemList = reportList.map((element, index) => {
        console.log("element", element)
        return (<>
            < View style={styles({ orientation }).containerItemTable
            }>
                <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{element.id}</Text></View>
                <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{element.name}</Text></View>
                <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{element.created === undefined ? "Pending" : element.created.split("T")[0]}</Text></View>
                <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{element.LDResult}</Text></View>
                <View style={styles({ orientation }).itemTable} >
                    <Button
                        title=" ๐ ๐ ๐ "
                        onPress={async () => {
                            setImageList([])
                            await getTestResult(element.id)
                            setSelectItem(1)
                            setSelectTab(0)
                            setSelectedDate(element.created)
                        }}
                        color={Color.Sub_Surface}
                    />
                </View>
            </View >
        </>)

    })

    if (selectItem) {
        return (<>
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
                <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", }}>


                    <TouchableOpacity onPress={() => setSelectItem(1)} >
                        <Icon
                            //reverse
                            name={"chevron-back"}
                            type='ionicon'
                            color={"black"}
                            size={wp('4%')}
                        />
                    </TouchableOpacity>
                    <Text style={styles({ orientation }).textIDPersonal}>{testId}</Text>
                </View>



                <View style={styles({ orientation }).containerinfoPersonal}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles({ orientation }).textInfoPersonal}>นายทดสอบ สมจริง</Text>
                        <Text style={styles({ orientation }).textInfoPersonal}>ความน่าจะเป็น 97.2431%</Text>
                        <Text style={styles({ orientation }).textInfoPersonal}>พยัญชนะ : {orientation == "portrait" ? "\n\n" : null}เขียนถูก {testResult.countAlphabetTrue} ตัว <Text style={{ color: Color.Correct }}>เขียนผิด</Text> {testResult.countAlphabetFalse}ตัว <Text style={{ color: Color.Wrong }} >เขียนกลับด้าน</Text> {testResult.countAlphabetMirror} ตัว</Text>
                        <Text style={styles({ orientation }).textInfoPersonal}>สระ : {orientation == "portrait" ? "\n\n" : null}เขียนถูก {testResult.countVowelTrue} ตัว <Text style={{ color: Color.Correct }}>เขียนผิด</Text> {testResult.countVowelFalse} ตัว <Text style={{ color: Color.Wrong }} >เขียนกลับด้าน</Text> {testResult.countVowelMirror} ตัว</Text>
                        <Text style={styles({ orientation }).textInfoPersonal}>คำสะกด : {orientation == "portrait" ? "\n\n" : null}เขียนถูก {testResult.countVocabTrue} ตัว <Text style={{ color: Color.Correct }}>เขียนผิด</Text> {testResult.countVocabFalse} ตัว </Text>
                    </View>
                    <View style={{ backgroundColor: "white", alignItems: "flex-end" }}>
                        <Text style={styles({ orientation }).dateInfoPersonal}>{String("selectDate")}</Text>
                    </View>
                </View>


                <View style={styles({ orientation }).containerImagePersonal}>
                    <Text style={styles({ orientation }).titleImagePersonal}>รูปภาพการทำแบบทดสอบ</Text>
                    <View style={{ marginTop: "2%", flex: 1, flexDirection: 'row' }}>
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
                            numColumns={4}
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
                        <Text style={styles({ orientation }).headerText}>ผลลัพธ์</Text>
                        <TextInput
                            style={styles({ orientation }).searchBox}
                            onChangeText={text => setSearch(text)}
                            value={search}
                            placeholder="ค้นหา"
                        />

                        <View style={styles({ orientation }).table}>
                            <View style={styles({ orientation }).containerTitleTable}>
                                <Text style={styles({ orientation }).textTitleTable}>เลขที่</Text>
                                <Text style={styles({ orientation }).textTitleTable}>ชื่อ-สกุล</Text>
                                <Text style={styles({ orientation }).textTitleTable}>วันที่</Text>
                                <Text style={styles({ orientation }).textTitleTable}>ความน่าจะเป็น</Text>
                                <Text></Text>
                            </View>
                            {itemList}


                        </View>
                        <View style={styles({ orientation }).containerPagination}>
                            {paging > 0 ? <TouchableOpacity onPress={() => { setPaging(paging - 1) }} style={styles({ orientation }).buttonPagination} >
                                <Text style={styles({ orientation }).textButtonPagination}>ก่อน</Text>
                            </TouchableOpacity> : null}
                            <Pagination paging={paging} number={resultNumber} split={5} selectedId={selectedId} setSelectedId={setSelectedId} />
                            {/* วิธีคิด pagging คือต้องเอา number/split -1*/}
                            {paging < resultNumber / 5 - 1 ? <TouchableOpacity onPress={() => { setPaging(paging + 1) }} style={styles({ orientation }).buttonPagination} >
                                <Text style={styles({ orientation }).textButtonPagination}>หลัง</Text>
                            </TouchableOpacity> : null}
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
        // flexDirection: 'column',
        marginVertical: hp("3%"),
        marginRight: hp("3%"),
        paddingHorizontal: wp("4%"),
        paddingTop: hp("8%"),
        backgroundColor: Color.White,
        borderRadius: hp("3.5%"),
    },
    headerText: {
        fontSize: wp("4%"),
        marginVertical: 12,
        fontFamily: Font.Bold
    },
    searchBox: {
        height: wp('5%'),
        width: wp('25%'),
        borderColor: Color.Sub_Surface,
        borderWidth: 2,
        alignSelf: 'flex-end',
        // marginRight: "5%",
        paddingHorizontal: wp('3%'),
        fontSize: wp('2%'),
        fontFamily: Font.Regular,
        borderRadius: 50
    },
    table: {
        flex: 2,
        margin: "5%",
        backgroundColor: 'white'
    },
    containerTitleTable: {
        margin: "1%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textTitleTable: {
        color: Color.Gray,
        fontSize: wp("1.25%"),
    },
    containerItemTable: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        marginTop: "2%",
        paddingBottom: "1%",
        borderBottomColor: Color.Black,
        borderBottomWidth: 1,
    },
    itemTable: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    textItemTable: {
        color: Color.Black,
        fontSize: wp("1.25%"),
    },
    containerPagination: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonPagination: {
        backgroundColor: Color.Sub_Surface,
        padding: 8,
        borderRadius: wp(1),
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
        fontSize: wp(2),
        fontFamily: Font.Bold,
    },

    textIDPersonal: {
        fontSize: wp(4),
        marginVertical: 12,
        fontFamily: Font.Bold
    },
    containerinfoPersonal: {
        flex: 1.5,
        flexDirection: 'row',
        marginHorizontal: "5%",
        backgroundColor: Color.White,
        padding: "2%"
    },
    textInfoPersonal: {
        marginBottom: "1.5%",
        color: Color.Black,
        fontSize: props.orientation == "portrait" ? wp("2%") : wp("1.5%"),
        fontFamily: Font.Regular,
    },
    dateInfoPersonal: {
        fontSize: wp("3%"),
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
        fontSize: wp("2.5%"),
        fontFamily: Font.Bold
    },
    backgroundSelectTab: {
        backgroundColor: Color.White,
        marginLeft: wp('2%'),
        paddingHorizontal: "2%",
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.Black,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30
    },
    fontSelectTab: {
        // color: selectTab == 0 ? "black" : 'rgba(142,142,142,1)', 
        color: Color.Black,
        fontSize: wp("2%"),
        fontFamily: Font.Bold
    },
    containerImageResult: {
        flex: 14,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: wp('2%'),
        borderTopStartRadius: wp("2%"),
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
        fontSize: wp('1.6%'),
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
        margin: 20,
        backgroundColor: Color.White,
        borderRadius: 20,
        padding: 35,
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
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        alignSelf:"flex-end"
    },
    textStyle: {
        color: Color.White,
        fontFamily: Font.Bold,
        fontSize : wp('2%'),
        textAlign: "center"
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: Font.Bold,
        fontSize: wp('3%')
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: Font.Regular,
        fontSize: wp('2%')
    },
});

const mapStateToProps = state => {
    return {
        orientation: state.orientation
    }
}


const mapDispatchToProps = dispatch => {
    return {
        upDateOrientation: (orientation) => {
            dispatch({ type: 'EDIT_ORIENTATION', payload: orientation })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScene);
