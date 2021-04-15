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
     TouchableOpacity,
     Alert
 } from 'react-native';
 import { NativeRouter, Route, Link } from "react-router-native";
 import backgroundLogin from '../resource/image/backgroundLogin.png'
 import imageOverlay from '../resource/image/LDSpotOverlay.png'
 import Router from '../router'
 import ButtonCurve from '../component/buttonCurve.js';
 import InputBoxLogin from '../component/inputboxLogin';
 import { connect } from 'react-redux';
 import InputBox from '../component/inputBox';
 import SelectionInput from '../component/picker';
 import Orientation from 'react-native-orientation';
 // import ButtonStart from '../component/buttonStart';
 import Device from '../utils/Device';
 import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
 import Color from '../resource/color';
 import Font from '../resource/font';
 import NegativeModal from '../component/negativeModal'
 import LocalStorage from '../utils/LocalStorage'
 import { Icon } from 'react-native-elements'
 import { FontSize, LayoutSize } from '../resource/dimension'


 import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  
 width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
 height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65
 
 console.log("is tablet ?", Device.isTablet())
 console.log("Device height = ", height, " and width = ", width)
 
 const StartTestScene = (props) => {
    const dataCharacterChart = {
        labels: ["January", "February", "March"],
        datasets: [
          {
            data: [20, 45, 28]
          }
        ]
      };

    const dataVowelChart = {
        labels: ["January", "February", "March"],
        datasets: [
          {
            data: [2, 5, 8]
          }
        ]
    };
  
    const dataPiechart = [
        {
          name: "ชาย",
          population: 423,
          color: "rgba(0, 173, 239)",
          legendFontColor: "black",
          legendFontSize: wp('1.3%')
        },
        {
          name: "หญิง",
          population: 120,
          color: "rgba(237, 0, 140)",
          legendFontColor: "black",
          legendFontSize: wp('1.3%')
          
        },
        
      ];

      const chartConfig = {
        alignSelf : 'flex-start',
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
        alignSelf : 'flex-start',

        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
       
        color: () => `green`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false // optional
      };

      const vowelChartConfig = {
        alignSelf : 'flex-start',

        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
       
        color: () => `red`,
        strokeWidth: 5, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false // optional
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

               <View style={styles(props.orientation).piechart}>
                <PieChart
                    data={dataPiechart}
                    width={width/3}
                    height={height/5}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"0"}
                    center={[20, 0]}
                    absolute
                />
                </View>
                <View  style={styles(props.orientation).containerChart} >
                    <View >
                    <BarChart
                    
                        data={dataCharacterChart}
                        width={width/3}
                        height={height/2}
                        fromZero = 'true'
                        showValuesOnTopOfBars = 'true'
                        chartConfig={charChartConfig}
                        verticalLabelRotation={0}
                    />
                    </View>  

                    <View >
                    <BarChart
                        
                        data={dataVowelChart}
                        width={width/3}
                        height={height/2}
                        fromZero = 'true'
                        showValuesOnTopOfBars = 'true'
                        chartConfig={vowelChartConfig}
                        verticalLabelRotation={0}
                    />
                    </View>     
                    </View>
             </View>
         </View>
 
     );
 }
 
 const styles = (props) => StyleSheet.create({
    containerChart: {
        flex: 1,
        justifyContent:'space-evenly',
        //width: width / 1.8,
        flexDirection: 'row',
        //margin: height - (height * 0.9),
        //marginVertical: hp("3%"),
       // marginRight: props == "portrait" ? null:hp("3%"),
       // paddingHorizontal: wp("4%"),
       // paddingTop: hp("8%"),
        backgroundColor: Color.White,
        // borderTopRightRadius:50,
        // borderBottomRightRadius:50,
       // borderRadius: LayoutSize.ContainerRadius,
        //justifyContent: 'center', 
        //alignItems: 'center'
        //flex: 1 1 auto, 
        //marginTop: 22
    },
    piechart: {
        justifyContent: 'flex-start', 
        // alignItems: 'flex-start',
        //alignSelf: 'flex-start',
        //flexDirection: 'row',
        // marginVertical:20,
        // marginHorizontal:40,
        //flex: 1 1 auto,
        //marginTop: 22
    },
    container: {
         flex: 1,
         // justifyContent: 'flex-start', 
         // alignItems: 'flex-start',
         // alignSelf:"flex-start",
         //flexDirection: 'row',
         // marginVertical:20,
         // marginHorizontal:40,
         backgroundColor: Color.Background
         //flex: 1 1 auto,
         //marginTop: 22
     },
     containerStartTest: {
         flex: 1,
         //width: width / 1.8,
         flexDirection: 'column',
         //margin: height - (height * 0.9),
         marginVertical: hp("3%"),
         marginRight: props == "portrait" ? null:hp("3%"),
         paddingHorizontal: wp("4%"),
         paddingTop: hp("8%"),
         backgroundColor: Color.White,
         // borderTopRightRadius:50,
         // borderBottomRightRadius:50,
         borderRadius: LayoutSize.ContainerRadius,
         //justifyContent: 'center', 
         //alignItems: 'center'
         //flex: 1 1 auto, 
         //marginTop: 22
     },
     appBars:{
         flexDirection: 'row' ,
         alignItems:"center",
     },
     containerStartTestInput: {
         flexDirection: 'column',
         backgroundColor: Color.white,
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
     StartPosition: {
         flex: 1,
         // alignSelf: "center",
         marginTop: 12,
         padding: 24,
         borderTopLeftRadius: LayoutSize.ContainerRadius,
         borderTopRightRadius: LayoutSize.ContainerRadius,
         justifyContent: "flex-start",
         // alignSelf:"flex-end",
         alignItems: props == "portrait" ? "center" : "flex-start",
         backgroundColor: Color.Sub_Background
     },
     ImageOverlay:{
         position:'absolute',
         width: props == "portrait" ? wp('92%'):wp('71%'),
         alignSelf:"center",
         // marginVertical: 200,
     },
     Picker: {
         flexDirection: "row",
         //  alignContent:"center",
         //  justifyContent:"center",
         padding: 12,
         alignSelf: "center",
         // alignItems:"center",
         // justifyContent:"flex-end",
         // alignItems: "flex-end",
         // backgroundColor:"red",
     },
     buttonStart: {
         height: hp('6%'),
         width: wp('50%'),
         padding: 200,
     },
     fontStartTest: {
         color: Color.Black,
         fontSize: props == "portrait" ? Device.fontSizer(FontSize.H6) : Device.fontSizer(FontSize.H6) ,
         // marginTop: 40,
         // marginBottom: 30,
         marginVertical: 12,
         alignSelf: "flex-start",
 
         fontFamily: Font.Bold,
     },
     fontStartTestInput: {
         // color: 'black',
         fontSize: Device.fontSizer(FontSize.H5),
         // marginLeft: 70,
         // marginTop: 10,
         marginVertical: 12,
         // alignItems: 'center',
         alignSelf: 'flex-start',
         fontFamily: Font.Bold,
         // justifyContent: 'center'
     },
     fontStartTestInfo: {
         // color: 'black',t
         fontSize: Device.fontSizer(FontSize.Body1),
         // marginLeft: 70,
         // marginTop: 10,
         marginVertical: 8,
 
         fontFamily: Font.Regular,
         // justifyContent: 'center'
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
 