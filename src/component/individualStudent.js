import React, { useEffect, useState } from "react";
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
import image from '../resource/image/alphabet.jpg'

const IndividualStudent = (props) => {
    let studentID = props.studentID
    // console.log("tets",testId)
    const [studentDetail, setStudentDetail] = useState([])
    const [studentResult, setStudentResult] = useState([])

    // let selectDate = props.selectDate
    // let name = props.name
    let orientation = props.orientation

    const queryStudentDetail = async () => {
        fetch(`http://10.0.2.2:8000/students/?condition=${studentID}`, {
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
                // console.log("responseJson ",responseJson.student[0])
                setStudentDetail(responseJson.student[0])
            }).catch((error) => {
                console.log('error: ' + error);
            });
    }

    const queryStudentResult = async () => {
        fetch(`http://10.0.2.2:8000/test/?condition=${studentID}&allresult=True`, {
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
                // console.log("responseJson ",responseJson.student[0])
                setStudentResult(responseJson.articles)
            }).catch((error) => {
                setStudentResult([])
                console.log('error: ' + error);
            });
    }

    

    const Item = ({ item, index, onPress }) =>
    {
        return (
            <>
                < View style={styles({ orientation }).containerItemTable}>
                    {DeviceInfo.isTablet() == true ?
                        <>
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.Round}</Text></View>
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.id} - {item.childrenID.childrenID}</Text></View>
                            {/* <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}></Text></View> */}
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.created === undefined ? "Pending" : item.created.split("T")[0]}</Text></View>
                            <View style={styles({ orientation }).itemTable} >
                                <TouchableOpacity
                                    onPress={() => {
                                        props.handleTestID(item.id,item.childrenID.name,item.childrenID.surname,item.created.split("T")[0])
                                        props.upDateStudentScene(2)
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
                        :
                        <>
                            <View style={styles({ orientation }).itemTableName}>
                                <View style={{ flexDirection: "column" }}>
                                    <Text style={[styles({ orientation }).textItemTable, { color: Color.Cover }]}>{item.childrenID.childrenID} ({item.Round})</Text>
                                    <Text style={styles({ orientation }).textItemTable}>{item.childrenID.name + " " + item.childrenID.surname}</Text>
                                </View>
                            </View>
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.created === undefined ? "Pending" : item.created.split("T")[0]}</Text></View>
                            <View style={styles({ orientation }).itemTable} >
                                <TouchableOpacity
                                    onPress={async () => {
                                        setImageList([])
                                        await getTestResult(item.id)
                                        setSelectItem(1)
                                        setSelectTab(0)
                                        setSelectDate(item.created.split("T")[0])
                                        setName(item.childrenID.name + " " + item.childrenID.surname)
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

                </View >
            </>
        )
    }

    const renderItem = ({ item, index }) => {
        //const backgroundColor = item === selectedId ? "#6e3b6e" : "#f9c2ff";
        return (
            <Item
                item={item}
                index={index}
                onPress={() => {
                    console.log("index and item", item)
                    // ,props.upDateStudentScene(1),props.upDateStudentID(item.childrenID)
                }}
            />
        )
    }

    useEffect(() => {
        queryStudentDetail()
        queryStudentResult()
    }, [])


    return (
        <> 
            <View style={styles({ orientation }).containerResult}>
                <View style={styles({ orientation }).appBars} >
                    <TouchableOpacity onPress={() => {
                        props.upDateStudentID(-1)
                        props.upDateStudentScene(0)
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
                    <Text style={[styles({ orientation }).headerText, {}]} >{studentID} </Text>
                </View>

                <View style={styles({ orientation }).containerinfoPersonal}>
                    <View style={{}}>
                        {/* <Text style={styles({ orientation }).textInfoPersonal}>{name}</Text> */}
                        {/* <Text style={styles({ orientation }).textInfoPersonal}>ความน่าจะเป็น 97.2431%</Text> */}
                        <Text style={styles({ orientation }).textInfoPersonal}>{studentDetail.gender == "m" ? "เด็กชาย" : "เด็กหญิง"}  {studentDetail.name} {studentDetail.surname} </Text>
                        <Text style={styles({ orientation }).textInfoPersonal}>วันเกิด {studentDetail.birthday} </Text>
                        <Text style={styles({ orientation }).textInfoPersonal}>ชั้นประถามศึกษาที่ {studentDetail.education} </Text>
                    </View>
                    <View style={{ backgroundColor: "white", alignItems: "flex-end" }}>

                    </View>
                </View>


                <View style={styles({ orientation }).containerImagePersonal}>
                    <Text style={styles({ orientation }).titleImagePersonal}>แบบทดสอบ</Text>
                    <View style={styles({ orientation }).table}>
                        {
                            studentResult.length !== 0 ?

                                <>
                                    <View style={styles({ orientation }).containerTitleTable}>
                                        {DeviceInfo.isTablet() == true ?
                                            <>
                                                <Text style={styles({ orientation }).textTitleTable}>รอบที่</Text>
                                                <Text style={styles({ orientation }).textTitleTable}>เลขที่</Text>
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
                                    <FlatList
                                        data={studentResult}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item.id}
                                        horizontal={false}
                                    />
                                </>
                                :
                                null
                            // <Image source={image} fadeDuration={500000}/>
                        }
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
    containerItemTable: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        // flex:1,
        height: 52,
        alignItems: 'center',
        // justifyContent:"flex-end",
        // alignItems:"flex-end",
        // marginTop: "2%",
        // paddingBottom: "1%",
        borderBottomColor: Color.Gray,
        borderBottomWidth: 1,
    },
    itemTable: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: "center",
    },
    textItemTable: {
        color: Color.Black,
        fontSize: Device.fontSizer(FontSize.Body2)
    },
    table: {
        flex: 1,
        margin: "5%",
    },
    itemTableName: {
        flex: 4,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: "flex-end",
    },
    containerTitleTable: {
        margin: "1%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textTitleTable: {
        color: Color.Black,
        flex: 1,
        textAlign: "center",
        fontSize: Device.fontSizer(FontSize.Body2),
        fontWeight: "bold",
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

export default connect(mapStateToProps, mapDispatchToProps)(IndividualStudent);