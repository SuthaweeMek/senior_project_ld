import React, { useEffect, useState } from "react";
import { HOSTNAME } from "@env"
import { View, StyleSheet, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList, Image, Button, ScrollView } from "react-native";
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
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

const IndividualStudent = (props) => {
    let studentID = props.studentID
    // console.log("tets",testId)
    const [studentDetail, setStudentDetail] = useState([])
    const [studentResult, setStudentResult] = useState([])
    const [studentStat, setStudentStat] = useState([])
    const [studentMenu, setStudentMenu] = useState(2)
    const [cardWidth, setCardWidth] = useState(wp('63%'))
    const [countAlphabetFalse, setCountAlphabetFalse] = useState([])
    const [countAlphabetMirror, setCountAlphabetMirror] = useState([])
    const [countAlphabetTrue, setCountAlphabetTrue] = useState([])
    const [countAlphabetWaitDoctor, setCountAlphabetWaitDoctor] = useState([])
    const [statAlphabet, setStatAlphabet] = useState(null)
    const [statVowel, setStatVowel] = useState(null)
    const [statVocab, setStatVocab] = useState(null)
    const [statTime, setStatTime] = useState(null)




    // let selectDate = props.selectDate
    // let name = props.name
    let orientation = props.orientation

    const queryStudentDetail = async () => {
        fetch(`${HOSTNAME}/students/?condition=${studentID}`, {
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
                console.log('error2: ' + error);
            });
    }

    const queryStudentStat = async () => {
        fetch(`${HOSTNAME}/classificationsresultindividual/?childrenId=${studentID}`, {
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
                console.log("responseJson ", responseJson)
                setStudentStat(responseJson)
                initialState(responseJson)
            }).catch((error) => {
                setStudentStat([])
                console.log('error: ' + error);
            });
    }


    const chartConfig = {
        backgroundColor: Color.Correct,
        backgroundGradientFrom: Color.White,
        backgroundGradientTo: Color.White,
        decimalPlaces: 0, // optional, defaults to 2dp
        color: () => `${Color.Background}`,
        labelColor: (opacity = 1) => `${Color.Black}`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: `${Color.Sub_Background}`,
        }
    }

    const Item = ({ item, index, onPress }) => {
        return (
            <>
                < View style={styles({ orientation }).containerItemTable}>
                    {DeviceInfo.isTablet() == true ?
                        <>
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{index + 1}</Text></View>
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.testId} - {studentID}</Text></View>
                            {/* <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}></Text></View> */}
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.createdAt === undefined ? "Pending" : item.createdAt.split("T")[0]}</Text></View>
                            <View style={styles({ orientation }).itemTable} >
                                <TouchableOpacity
                                    onPress={() => {
                                        props.handleTestID(item.testId, studentDetail.name, studentDetail.surname, item.createdAt.split("T")[0])
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
                                    <Text style={[styles({ orientation }).textItemTable, { color: Color.Cover }]}>{studentID} ({index + 1})</Text>
                                    <Text style={styles({ orientation }).textItemTable}>{studentDetail.name + " " + studentDetail.surname}</Text>
                                </View>
                            </View>
                            <View style={styles({ orientation }).itemTable} ><Text style={styles({ orientation }).textItemTable}>{item.createdAt === undefined ? "Pending" : item.createdAt.split("T")[0]}</Text></View>
                            <View style={styles({ orientation }).itemTable} >
                                <TouchableOpacity
                                    onPress={async () => {
                                        setImageList([])
                                        await getTestResult(item.testId)
                                        setSelectItem(1)
                                        setSelectTab(0)
                                        setSelectDate(item.createdAt.split("T")[0])
                                        setName(studentDetail.name + " " + studentDetail.surname)
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
    const data = {
        labels: studentStat.map((stat, index) => (`รอบ ${index}`)),
        datasets:
            [
                {
                    data: [24, 34, 44, 39, 38],
                    color: (opacity = 1) => `${Color.Correct}`, // optional
                    strokeWidth: 2 // optional
                },
                {
                    data: [18, 6, 0, 1, 2],
                    color: (opacity = 1) => `${Color.Wrong}`, // optional
                    strokeWidth: 2 // optional
                },
                {
                    data: [1, 2, 0, 1, 2],
                    color: (opacity = 1) => `${Color.Dot}`, // optional
                    strokeWidth: 2 // optional
                },
                {
                    data: [1, 2, 0, 1, 2],
                    color: (opacity = 1) => `${Color.Dot}`, // optional
                    strokeWidth: 2 // optional
                }
            ]
        ,
        legend: [`เขียนถูก`, "เขียนผิด", "เขียนกลับด้าน", "รอคุณหมอ"] // optional
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

    const initialState = (studentStat) => {
        setStatAlphabet(
            {
                labels: studentStat.map((stat, index) => (`รอบ ${index + 1}`)),
                datasets:
                    [
                        {
                            data: studentStat.map((stat) => (stat.countAlphabetTrue)),
                            color: (opacity = 1) => `${Color.Dot1}`,
                            strokeWidth: 2,
                        },
                        {
                            data: studentStat.map((stat) => (stat.countAlphabetFalse)),
                            color: (opacity = 1) => `${Color.Dot2}`,
                            strokeWidth: 2,
                        },
                        {
                            data: studentStat.map((stat) => (stat.countAlphabetMirror)),
                            color: (opacity = 1) => `${Color.Dot3}`,
                            strokeWidth: 2,
                        },
                        {
                            data: studentStat.map((stat) => (stat.countAlphabetWaitDoctor)),
                            color: (opacity = 1) => `${Color.Dot4}`,
                            strokeWidth: 2,
                        }
                    ]
                ,
                legend: [`เขียนถูก`, "เขียนผิด", "เขียนกลับด้าน", "รอคุณหมอ"] // optional
            })
        setStatVowel(
            {
                labels: studentStat.map((stat, index) => (`รอบ ${index + 1}`)),
                datasets:
                    [
                        {
                            data: studentStat.map((stat) => (stat.countVowelTrue)),
                            color: (opacity = 1) => `${Color.Dot1}`,
                            strokeWidth: 2,
                        },
                        {
                            data: studentStat.map((stat) => (stat.countVowelFalse)),
                            color: (opacity = 1) => `${Color.Dot2}`,
                            strokeWidth: 2,
                        },
                        {
                            data: studentStat.map((stat) => (stat.countVowelMirror)),
                            color: (opacity = 1) => `${Color.Dot3}`,
                            strokeWidth: 2,
                        },
                        {
                            data: studentStat.map((stat) => (stat.countVowelWaitDoctor)),
                            color: (opacity = 1) => `${Color.Dot4}`,
                            strokeWidth: 2,
                        }
                    ]
                ,
                legend: [`เขียนถูก`, "เขียนผิด", "เขียนกลับด้าน", "รอคุณหมอ"] // optional
            })
        setStatVocab(
            {
                labels: studentStat.map((stat, index) => (`รอบ ${index + 1}`)),
                datasets:
                    [
                        {
                            data: studentStat.map((stat) => (stat.countVocabTrue)),
                            color: (opacity = 1) => `${Color.Dot1}`,
                            strokeWidth: 2,
                        },
                        {
                            data: studentStat.map((stat) => (stat.countVocabFalse)),
                            color: (opacity = 1) => `${Color.Dot2}`,
                            strokeWidth: 2,
                        },
                        {
                            data: studentStat.map((stat) => (stat.countVocabMirror)),
                            color: (opacity = 1) => `${Color.Dot3}`,
                            strokeWidth: 2,
                        },
                        {
                            data: studentStat.map((stat) => (stat.countVocabWaitDoctor)),
                            color: (opacity = 1) => `${Color.Dot4}`,
                            strokeWidth: 2,
                        }
                    ]
                ,
                legend: [`เขียนถูก`, "เขียนผิด", "เขียนกลับด้าน", "รอคุณหมอ"] // optional
            })
        setStatTime(
            {
                labels: studentStat.map((stat, index) => (`รอบ ${index + 1}`)),
                datasets:
                    [
                        {
                            data: studentStat.map((stat) => {
                                const startAt = new Date(stat.createdAt).getTime()
                                const stopAt = new Date(stat.lastCreatedAt).getTime()
                                const result = (stopAt - startAt) / 60000 < 0 ? 0 : (stopAt - startAt) / 60000
                                return (result)
                            }),
                            color: (opacity = 1) => `${Color.Dot1}`,
                            strokeWidth: 2,
                        },
                    ]
                ,
                legend: [`เวลาการทำแบบทดสอบ`,] // optional
            })
    }

    useEffect(() => {
        queryStudentDetail()
        // queryStudentResult()
        queryStudentStat()
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
                        <Text style={styles({ orientation }).textInfoPersonal}>เด็ก{studentDetail.gender == "m" ? "ชาย" : studentDetail.gender == "W" ? "หญิง" : null}  {studentDetail.name} {studentDetail.surname} </Text>
                        <Text style={styles({ orientation }).textInfoPersonal}>วันเกิด {studentDetail.birthday} </Text>
                        <Text style={styles({ orientation }).textInfoPersonal}>ชั้นประถามศึกษาที่ {studentDetail.education} </Text>
                    </View>
                    <View style={{ backgroundColor: "white", alignItems: "flex-end" }}>

                    </View>
                </View>
                <View style={styles({ orientation }).navbarIndividual}>
                    {/* <Button style={styles({ orientation }).navbarIndividualText}>แบบทดสอบ</Button> */}
                    <MenuButton color="coral" text="กราฟ" onPress={() => { setStudentMenu(1) }} />
                    <MenuButton color="coral" text="แบบทดสอบ" onPress={() => { setStudentMenu(2) }} />
                </View>
                {
                    studentMenu == 1 &&
                    <View style={styles({ orientation }).containerImagePersonal}>
                        <Text style={styles({ orientation }).titleImagePersonal}>กราฟ</Text>
                        <ScrollView>
                            <Text style={styles({ orientation }).titleCard}>พยัญชนะ</Text>
                            <View style={styles({ orientation }).card} onLayout={(e) => { setCardWidth(e.nativeEvent.layout.width) }}>
                                {statAlphabet &&
                                    <LineChart
                                        data={statAlphabet}
                                        width={cardWidth - 20}
                                        yAxisSuffix="ตัว"
                                        height={180}
                                        chartConfig={chartConfig}
                                        segments={3}
                                    />}

                            </View>
                            <Text style={styles({ orientation }).titleCard}>สระ</Text>
                            <View style={styles({ orientation }).card} onLayout={(e) => { setCardWidth(e.nativeEvent.layout.width) }}>
                                {statVowel &&
                                    <LineChart
                                        fromZero
                                        data={statVowel}
                                        width={cardWidth - 20}
                                        yAxisSuffix="ตัว"
                                        height={180}
                                        chartConfig={chartConfig}
                                        segments={3}
                                    />}
                            </View>
                            <Text style={styles({ orientation }).titleCard}>คำสะกด</Text>
                            <View style={styles({ orientation }).card} onLayout={(e) => { setCardWidth(e.nativeEvent.layout.width) }}>
                                {statVocab &&
                                    <LineChart
                                        fromZero
                                        data={statVocab}
                                        width={cardWidth - 20}
                                        yAxisSuffix="คำ"
                                        height={180}
                                        chartConfig={chartConfig}
                                        segments={3}
                                    />}
                            </View>
                            <Text style={styles({ orientation }).titleCard}>เวลาการทำแบบทดสอบ</Text>
                            <View style={styles({ orientation }).card} onLayout={(e) => { setCardWidth(e.nativeEvent.layout.width) }}>
                                {statTime &&
                                    <LineChart
                                        fromZero={true}
                                        data={statTime}
                                        width={cardWidth - 20}
                                        yAxisSuffix="นาที"
                                        height={180}
                                        chartConfig={chartConfig}
                                    />}
                            </View>
                        </ScrollView>
                    </View>
                }{
                    studentMenu == 2 &&
                    <View style={styles({ orientation }).containerImagePersonal}>
                        <Text style={styles({ orientation }).titleImagePersonal}>แบบทดสอบ</Text>
                        <View style={styles({ orientation }).table}>
                            {
                                studentStat ?

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
                                            data={studentStat}
                                            renderItem={renderItem}
                                            keyExtractor={(item) => item.id}
                                            horizontal={false}
                                            // style={{  transform: [{ scaleY: -1 }] }}
                                        />
                                    </>
                                    :
                                    null
                                // <Image source={image} fadeDuration={500000}/>
                            }
                        </View>
                    </View>
                }
            </View>
        </>
    );
}

const MenuButton = ({ color, text, onPress }) => {
    return (
        <View style={{ marginRight: 10 }}>
            <Button
                onPress={onPress}
                title={text}
                color={color}
            />
        </View>
    )
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
    navbarIndividual: {
        marginLeft: 30,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8,
        alignItems: 'baseline'
    },
    navbarIndividualText: {
        padding: 6,
        color: Color.Black,
        fontSize: Device.fontSizer(FontSize.Body1),
        backgroundColor: Color.Gray,
        borderRadius: LayoutSize.PaginationBorderRadius,
    },
    titleCard: {
        marginLeft: 30,
        fontSize: Device.fontSizer(FontSize.Body1),
        fontFamily: Font.Regular
    },
    card: {
        height: 220,
        alignSelf: 'center',
        width: "95%",
        marginVertical: wp('1%'),
        marginHorizontal: 15,
        marginBottom: 25,
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 10,
        padding: 10
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