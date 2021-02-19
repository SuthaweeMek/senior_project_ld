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
import Pagination from '../component/pagination';
import Arrays from '../utils/Array'
import Device from '../utils/Device';
import Color from '../resource/color';
import Font from '../resource/font';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'
import LocalStorage from '../utils/LocalStorage'
import DeviceInfo from 'react-native-device-info';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import { Picker } from '@react-native-picker/picker';
import { FontSize, LayoutSize } from '../resource/dimension'

//component
import IndividualStudent from '../component/individualStudent'
import ResultStudent from '../component/resultStudent'


// //dimesions
// width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
// height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

const DATA = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
var DATA2 = []
const ResultScene = (props) => {
    var orientation = props.orientation
    let studentScene = props.studentScene
    let studentID = props.studentID
    DATA2 = Arrays.CreatePlattern("test", 1000)
    const paginationSplit = DeviceInfo.isTablet() == true ? 5 : 4

    const [search, setSearch] = useState("");
    const [reportList, setReportList] = useState([1, 2, 3, 4, 5]);
    const [imageList, setImageList] = useState([]);
    // const [studentScene , setSelectItem] = useState(0)
    const [testId, setTestId] = useState([-1, ,]);
    const [selectedStudent, setSelectedStudent] = useState("")
    // const [selectedModalId, setSelectedModalId] = useState({ index: 0, item: "panding" });

    const queryStudent = async () => {
        if (search == "") {
            fetch(`http://10.0.2.2:8000/students/`, {
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
                    setReportList(responseJson.student)
                }).catch((error) => {
                    console.log('error: ' + error);
                });
        }
        else {
            fetch(`http://10.0.2.2:8000/students/?condition=${search}`, {
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
                    setReportList(responseJson.student)
                }).catch((error) => {
                    console.log('error: ' + error);
                });
        }
    }
    useEffect(() => {
        // console.log("setSelectItem",studentScene )
        lor(props.upDateOrientation)
        return rol()
    }
        , [props.orientation])

    // useEffect(()=>{setReportList},[orientation])
    const mapNumberToLabel = {
        0: "รอคุณหมอ",
        1: "เขียนถูก",
        2: "เขียนผิด",
        3: "กลับด้าน",
    }
    useEffect(() => {
        queryStudent()
    }, [])

    const handleTestID = (id,name,surname,created) =>{
        setTestId([id,name,surname,created])
    }
    useEffect(() => {
        queryStudent()
    }, [search])

    const Item = ({ item, index, onPress }) =>
    {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles({ orientation }).containerItemTable}>
                    <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.childrenID}</Text></View>
                    <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.name} {item.surname}</Text></View>
                    <View style={styles({ orientation }).itemTable} ></View>
                    <View style={styles({ orientation }).itemTable} ></View>
                    <View style={styles({ orientation }).itemTable} ></View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderItem = ({ item, index }) => {
        //const backgroundColor = item === selectedId ? "#6e3b6e" : "#f9c2ff";
        return (
            <Item
                item={item}
                index={index}
                onPress={() => { console.log("index and item", item) ,props.upDateStudentScene(1),props.upDateStudentID(item.childrenID)}}
            />
        )
    }

    if (studentScene==1 ) {
        return (<>
            <IndividualStudent handleTestID={handleTestID}/>
        </>)
    } 
    if (studentScene==2 ){
        return (<>
            <ResultStudent testId={testId}/>
        </>)
    }
    // else is studentScene==0
    else {
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
                                <Text style={[styles({ orientation }).headerText, {}]} >บุคคล </Text>
                            </View>
                            :
                            <Text style={styles({ orientation }).headerText} >บุคคล</Text>
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
                                        <Text style={styles({ orientation }).textTitleTable}>ชื่อ-สกุล</Text>
                                        <Text style={styles({ orientation }).textTitleTable}></Text>
                                        <Text style={styles({ orientation }).textTitleTable}></Text>
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
                            {/* <ScrollView>
                                {itemList}
                            </ScrollView> */}
                            <FlatList
                                data={reportList}
                                renderItem={renderItem}
                                // keyExtractor={(item) => String(item.childrenID)}
                                keyExtractor={(item) => item.childrenID}
                                extraData={selectedStudent}
                                horizontal={false}
                                // onScroll={()=>{console.log("scrolling , ")}}
                                // scrollEventThrottle={16}
                            // numColumns={1}
                            />

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
        marginHorizontal:12,
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

});

const mapStateToProps = state => {
    return {
        orientation: state.orientation,
        menuDrawer: state.menuDrawer,
        studentScene : state.studentScene,
        studentID : state.studentID,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        upDateOrientation: (orientation) => {
            dispatch({ type: 'EDIT_ORIENTATION', payload: orientation })
        },
        upDateMenuDrawer: (menuDrawer) => {
            dispatch({ type: 'EDIT_DRAWER', payload: menuDrawer })
        },
        upDateStudentScene: (studentScene) => {
            dispatch({ type: 'EDIT_STUDENTSCENE', payload: studentScene })
        },
        upDateStudentID: (studentID) => {
            dispatch({ type: 'EDIT_STUDENTID', payload: studentID })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScene);
