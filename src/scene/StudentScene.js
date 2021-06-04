/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { HOSTNAME } from "@env"
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Arrays from '../utils/Array'
import Device from '../utils/Device';
import Color from '../resource/color';
import Font from '../resource/font';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'
import LocalStorage from '../utils/LocalStorage'
import DeviceInfo from 'react-native-device-info';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import { FontSize, LayoutSize } from '../resource/dimension'

//component
import IndividualStudent from '../component/individualStudent'
import ResultStudent from '../component/resultStudent'


const ResultScene = (props) => {
    var orientation = props.orientation
    let studentScene = props.studentScene
    const [search, setSearch] = useState("");
    const [reportList, setReportList] = useState([1, 2, 3, 4, 5]);
    const [testId, setTestId] = useState([-1, ,]);
    const [selectedStudent, setSelectedStudent] = useState("")

    const queryStudent = async () => {
        if (search == "") {
            fetch(`${HOSTNAME}/students/`, {
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
                });
        }
        else {
            fetch(`${HOSTNAME}/students/?condition=${search}`, {
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
                });
        }
    }
    useEffect(() => {
        lor(props.upDateOrientation)
        return rol()
    }
        , [props.orientation])

    useEffect(() => {
        queryStudent()
    }, [])

    const handleTestID = (id, name, surname, created) => {
        setTestId([id, name, surname, created])
    }
    useEffect(() => {
        queryStudent()
    }, [search])

    const Item = ({ item, index, onPress }) => {
        return (
            DeviceInfo.isTablet() == true ?
                <TouchableOpacity onPress={onPress}>
                    <View style={styles({ orientation }).containerItemTable}>
                        <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.childrenID}</Text></View>
                        <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.name} {item.surname}</Text></View>
                        <View style={styles({ orientation }).itemTable} ></View>
                        <View style={styles({ orientation }).itemTable} ></View>
                        <View style={styles({ orientation }).itemTable} ></View>
                    </View>
                </TouchableOpacity> :
                <TouchableOpacity onPress={onPress}>
                    <View style={styles({ orientation }).containerItemTable}>
                        <View style={[styles({ orientation }).itemTable,{flexGrow:1}]} ><Text style={styles({ orientation }).textItemTable}>{item.childrenID}</Text></View>
                        <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.name} {item.surname} </Text></View>
                       
                    </View>
                </TouchableOpacity>
        )
    }

    const renderItem = ({ item, index }) => {
        return (
            <Item
                item={item}
                index={index}
                onPress={() => { props.upDateStudentScene(1), props.upDateStudentID(item.childrenID) }}
            />
        )
    }

    if (studentScene == 1) {
        return (<>
            <IndividualStudent handleTestID={handleTestID} />
        </>)
    }
    if (studentScene == 2) {
        return (<>
            <ResultStudent testId={testId} />
        </>)
    }
    // else is studentScene==0
    else {
        return (

            <>
                <View style={styles({ orientation }).container}>
                    <View style={styles({ orientation }).containerResult}>
                        {props.orientation == 'portrait' ?
                            <View style={styles({ orientation }).appBars} >
                                <TouchableOpacity onPress={() => { props.upDateMenuDrawer(true) }}>
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
                                        <Text style={styles({ orientation }).textTitleTable}>เลขที่</Text>
                                        <Text style={styles({ orientation }).textTitleTable}></Text>
                                        <Text style={styles({ orientation }).textTitleTable}>ชื่อ-สกุล</Text>
                                        <Text style={styles({ orientation }).textTitleTable}></Text>
                                        <Text></Text>
                                    </>
                                }
                            </View>
                            <FlatList
                                data={reportList}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.childrenID}
                                extraData={selectedStudent}
                                horizontal={false}
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
        flexDirection: 'column',
        marginVertical: hp("3%"),
        marginRight: props.orientation == "portrait" ? null : hp("3%"),
        paddingHorizontal: wp("4%"),
        paddingTop: hp("8%"),
        backgroundColor: Color.White,
        borderRadius: LayoutSize.ContainerRadius,
    },
    headerText: {
        color: Color.Black,
        fontSize: props.orientation == "portrait" ? Device.fontSizer(FontSize.H6) : Device.fontSizer(FontSize.H6),
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
        paddingHorizontal: LayoutSize.InputPaddingLeft,
        fontSize: Device.fontSizer(FontSize.Subtitle1),
        fontFamily: Font.Regular,
        borderRadius: LayoutSize.InputCurveRadius,
    },
    table: {
        flex: 1,
        margin: "5%",
    },
    containerTitleTable: {
        margin: "1%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textTitleTable: {
        flex: 1,
        textAlign: "center",
        marginHorizontal: 12,
        color: Color.Black,
        fontSize: Device.fontSizer(FontSize.Body2),
        fontWeight: "bold",

    },
    containerItemTable: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        height: 52,
        alignItems: 'center',
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
        studentScene: state.studentScene,
        studentID: state.studentID,
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
