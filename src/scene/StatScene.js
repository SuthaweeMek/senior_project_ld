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
    ScrollView,
    View,
    Text,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Device from '../utils/Device';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import Color from '../resource/color';
import Font from '../resource/font';
import LocalStorage from '../utils/LocalStorage'
import { FontSize, LayoutSize } from '../resource/dimension'


import {
    BarChart,
    PieChart,
} from "react-native-chart-kit";

width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65


const StartTestScene = (props) => {
    const [stat, setStat] = useState(null)
    const [statGender, setStatGender] = useState(null)
    const [statCharacterChart, setStatCharacterChart] = useState(null)
    const [statVowelChart, setStatVowelChart] = useState(null)
    const [statVocabChart, setStatVocabChart] = useState(null)
    const [cardWidth, setCardWidth] = useState(wp('63%'))

    useEffect(() => {
        queryStat()
    }, [])

    const queryStat = async () => {
        fetch(`${HOSTNAME}/stat`, {
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
                setStat(responseJson)
                intitialState(responseJson)
            }).catch((error) => {
                setStat({})
            });
    }

    const intitialState = (stat) => {
        setStatGender([
            {
                name: "ชาย",
                population: stat.maleCount,
                color: Color.Male,
                legendFontColor: "black",
                legendFontSize: wp('1.3%')
            },
            {
                name: "หญิง",
                population: stat.femaleCount,
                color: Color.Female,
                legendFontColor: "black",
                legendFontSize: wp('1.3%')

            },
        ]
        )
        setStatCharacterChart(
            {
                labels: [stat.mostAlphabetFalse[0][2], stat.mostAlphabetFalse[1][2], stat.mostAlphabetFalse[2][2]],
                datasets: [
                    {
                        data: [stat.mostAlphabetFalse[0][1], stat.mostAlphabetFalse[1][1], stat.mostAlphabetFalse[2][1]]
                    }
                ]
            }
        )
        setStatVowelChart(
            {
                labels: [stat.mostVowelFalse[0][2], stat.mostVowelFalse[1][2], stat.mostVowelFalse[2][2]],
                datasets: [
                    {
                        data: [stat.mostVowelFalse[0][1], stat.mostVowelFalse[1][1], stat.mostAlphabetFalse[2][1]]
                    }
                ]
            }
        )
        setStatVocabChart(
            {
                labels: [stat.mostVocabFalse[0][2]],
                datasets: [
                    {
                        data: [stat.mostVowelFalse[0][1]]
                    }
                ]
            }
        )
    }
    // const dataCharacterChart = {
    //     labels: ["January", "February", "March"],
    //     datasets: [
    //         {
    //             data: [20, 45, 28]
    //         }
    //     ]
    // };

    const chartConfig = {
        alignSelf: 'flex-start',
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false // optional
    };

    const charChartConfig = {
        alignSelf: 'flex-start',

        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        color: () => `green`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false, // optional
        fillShadowGradientOpacity: 1,
        
    };

    const vowelChartConfig = {
        alignSelf: 'flex-start',
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        color: () => `red`,
        strokeWidth: 5, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false, // optional
        fillShadowGradientOpacity: 1,

    };
    const vocabChartConfig = {
        alignSelf: 'flex-start',
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        color: () => `red`,
        strokeWidth: 5, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false, // optional
        fillShadowGradientOpacity: 1,

    };
    return (
        <View style={styles(props.orientation).container}>

            <View style={styles(props.orientation).containerStartTest} >
                {props.orientation == 'portrait' ?
                    <View style={styles(props.orientation).appBars} >


                        <Text style={[styles(props.orientation).fontStartTest, {}]} >สถิติ</Text>
                    </View>
                    :
                    <Text style={styles(props.orientation).fontStartTest} >สถิติ</Text>
                }
                <ScrollView>
                    <View style={styles(props.orientation).containerChart} onLayout={(e) => { setCardWidth(e.nativeEvent.layout.width) }}>
                        <View >
                            {statGender ?
                                <>
                                    <Text style={[styles(props.orientation).fontStat]} >จำนวนเพศที่ใช้แอปพลิเคชัน</Text>
                                    <PieChart
                                        data={statGender}
                                        width={width/3 }
                                        height={hp('15%')}
                                        chartConfig={chartConfig}
                                        accessor={"population"}
                                        backgroundColor={"transparent"}
                                        paddingLeft={"0"}
                                        center={[20, 0]}
                                        absolute
                                    />
                                </>
                                //ตรงนี้รอใส่ loading
                                : null}
                        </View>
                    </View>
                    <View style={styles(props.orientation).containerChart} >
                        <View >
                            {statCharacterChart ?
                                <>
                                    <Text style={styles(props.orientation).fontStat} >พยัญชนะที่ผิดมากที่สุด</Text>

                                    <BarChart
                                        data={statCharacterChart}
                                        width={width / 3}
                                        height={height / 2}
                                        fromZero='true'
                                        showValuesOnTopOfBars='true'
                                        chartConfig={charChartConfig}
                                        verticalLabelRotation={0}
                                    />
                                </>
                                : null}

                        </View>

                        <View >
                            {stat ?
                                <View style={styles(props.orientation).containerCount}>
                                    <Text style={styles(props.orientation).fontStat2} >จำนวนพยัญชนะทั้งหมด {stat.countAlphabet} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >เขียนถูกทั้งหมด {stat.countAlphabetTrue} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >เขียนผิดทั้งหมด {stat.countAlphabetFalse} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >เขียนกลับด้านทั้งหมด {stat.countAlphabetMirror} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >รอตรวจ {stat.countAlphabet - stat.countVowelTrue - stat.countAlphabetFalse - stat.countAlphabetMirror} ตัว</Text>
                                </View>
                                : null}
                        </View>
                    </View>
                    <View style={styles(props.orientation).containerChart} >
                        <View >
                            {statVowelChart ?
                                <>
                                    <Text style={styles(props.orientation).fontStat} >สระที่ผิดมากที่สุด</Text>

                                    <BarChart
                                        data={statVowelChart}
                                        width={width / 3}
                                        height={height / 2}
                                        fromZero='true'
                                        showValuesOnTopOfBars='true'
                                        chartConfig={vowelChartConfig}
                                        verticalLabelRotation={0}
                                    />
                                </>
                                : null}

                        </View>

                        <View >
                            {stat ?
                                <View style={styles(props.orientation).containerCount}>
                                    <Text style={styles(props.orientation).fontStat2} >จำนวนสระทั้งหมด {stat.countVowel} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >เขียนสระถูกทั้งหมด {stat.countVowelTrue} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >เขียนสระผิดทั้งหมด {stat.countVowelFalse} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >เขียนสระกลับด้านทั้งหมด {stat.countVowelMirror} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >รอตรวจ {stat.countVowel - stat.countVowelTrue - stat.countVowelFalse - stat.countVowelMirror} ตัว</Text>

                                </View>
                                : null}
                        </View>
                    </View>
                    <View style={styles(props.orientation).containerChart} >
                        <View >
                            {statVocabChart ?
                                <>
                                    <Text style={styles(props.orientation).fontStat} >คำที่ผิดมากที่สุด</Text>

                                    <BarChart
                                        data={statVocabChart}
                                        width={width / 3}
                                        height={height / 2}
                                        fromZero='true'
                                        showValuesOnTopOfBars='true'
                                        chartConfig={vocabChartConfig}
                                        verticalLabelRotation={0}
                                    />
                                </>
                                : null}

                        </View>

                        <View >
                            {stat ?
                                <View style={styles(props.orientation).containerCount}>
                                    <Text style={styles(props.orientation).fontStat2} >จำนวนสระทั้งหมด {stat.countVocab} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >เขียนสระถูกทั้งหมด {stat.countVocabTrue} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >เขียนสระผิดทั้งหมด {stat.countVocabFalse} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >เขียนสระกลับด้านทั้งหมด {stat.countVocabMirror} ตัว</Text>
                                    <Text style={styles(props.orientation).fontStat2} >รอตรวจ {stat.countVocab - stat.countVocabTrue - stat.countVocabFalse - stat.countVocabMirror} ตัว</Text>

                                </View>
                                : null}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>

    );
}

const styles = (props) => StyleSheet.create({
    containerCount: {
        flex: 1,
        justifyContent: 'center',
    },
    containerChart: {
        flex: 1,
        justifyContent: 'flex-start',
        flexWrap :'wrap',
        flexDirection: 'row',
        backgroundColor: Color.White,
    },
    piechart: {
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        backgroundColor: Color.Background
    },
    containerStartTest: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: hp("3%"),
        marginRight: props == "portrait" ? null : hp("3%"),
        paddingHorizontal: wp("4%"),
        paddingTop: hp("8%"),
        backgroundColor: Color.White,
        borderRadius: LayoutSize.ContainerRadius,
    },
    appBars: {
        flexDirection: 'row',
        alignItems: "center",
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
    ImageOverlay: {
        position: 'absolute',
        width: props == "portrait" ? wp('92%') : wp('71%'),
        alignSelf: "center",
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
        fontSize: Device.fontSizer(FontSize.H6),
        marginVertical: 12,
        alignSelf: "flex-start",

        fontFamily: Font.Bold,
    },
    fontStat: {
        color: Color.Black,
        fontSize: Device.fontSizer(FontSize.H6),
        margin: 'auto',
        marginVertical: 12,
        alignSelf: "center",
        fontFamily: Font.Bold,
    },
    fontStat2: {
        color: Color.Black,
        fontSize: Device.fontSizer(FontSize.H6),
        marginLeft: 30,
        marginVertical: 6,
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
    chart: {
        flex: 1
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartTestScene);
