/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
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
  TouchableOpacity
} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import backgroundMenu from '../resource/image/backgroundMenu.png';
import imageProfile from '../resource/image/dummyProfile.jpg';
import WritingScene from './WritingScene'
const image = { uri: "https://reactjs.org/logo-og.png" };
import Router from '../router'
import { connect } from 'react-redux';
import LocalStorage from '../utils/LocalStorage'
import {widthPercentageToDP as wp, heightPercentageToDP as hp,listenOrientationChange as lor,removeOrientationListener as rol} from '../utils/Device'
import { Icon } from 'react-native-elements'
import Color from '../resource/color';
import Font from '../resource/font';
const HomeScene = (props) => {

  useEffect(()=>{
    lor(props.upDateOrientation)
    return rol()
  }
  ,[])
  const [onClick,setOnclick] = useState("test_scene")
  // console.log("test", Color.White)

  props.upDateText("testtext")

  const newStyle = (fromscene) =>{
    var new_style = {}
    // console.log("onClick vs fromscene",onClick , "and ", fromscene,": ",onClick==fromscene)
    const menu_clicked = {BG:{backgroundColor:Color.White,borderColor:Color.White,},
    LG:{logocolor:Color.Background},
    TX:{color:Color.Black,fontFamily:"EkkamaiNew-Bold"}}
    const menu_unclick = {BG:{backgroundColor:Color.Background,borderColor:Color.Background},
    LG:{logocolor:Color.Sub_Surface},
    TX:{color:Color.White}}

    switch (fromscene) {
      case 'test_scene':
        onClick==fromscene ? new_style = menu_clicked: new_style = menu_unclick
      case 'result_scene':
        onClick==fromscene ? new_style = menu_clicked: new_style = menu_unclick
      case 'stat_scene':
        onClick==fromscene ? new_style = menu_clicked: new_style =menu_unclick
      case 'exit_scene':
        onClick==fromscene ? new_style = menu_clicked: new_style =menu_unclick
      default:
        null
      }
      

  return (new_style)
  
}

  return (
    <NativeRouter>
      <StatusBar translucent={false} barStyle={"light-content"} backgroundColor={Color.Background} />
      <SafeAreaView style={{flex:1}}>

      <View style={styles(props.orientation).container}>

        {/* <ImageBackground source={backgroundMenu} style={styles.backgroundMenu}> */}
        <View style={styles(props.orientation).containerMenu}>

          <View style={styles(props.orientation).containerMenuProfile}>
            <Image source={imageProfile} style={styles(props.orientation).imageProfile}></Image>
            <Link to="/" >
              <Text style={styles(props.orientation).fontMenuProfile}>Pig Piggy</Text>
            </Link>
          </View>

          <View style={styles(props.orientation).containerMenuContent}>

          <Link style={styles(props.orientation).link} to="/test" onPress={()=>{setOnclick("test_scene")}} >
            <View style={[styles(props.orientation).containerMenuContentRow,newStyle("test_scene").BG]} >
            <Icon
              //reverse
              name={"pen"}
              type='font-awesome-5'
              color= {newStyle("test_scene").LG.logocolor} 
              size={wp('2.5%')}
              style={styles(props.orientation).icon}
            />
                <Text style={[styles(props.orientation).fontMenuContent,newStyle("test_scene").TX]}>แบบทดสอบ</Text>
            </View>
            </Link>


            <Link style={styles(props.orientation).link} to="/result" onPress={()=>{setOnclick("result_scene")}}>
            <View style={[styles(props.orientation).containerMenuContentRow,newStyle("result_scene").BG]} >
            <Icon
              //reverse
              name={"file-contract"}
              type='font-awesome-5'
              color= {newStyle("result_scene").LG.logocolor} 
              size={wp('2.5%')}
              style={styles(props.orientation).icon}
            />              
                <Text style={[styles(props.orientation).fontMenuContent,newStyle("result_scene").TX]}>ผลลัพท์</Text>
            </View>
            </Link>

            <Link style={styles(props.orientation).link} to="/stat" onPress={()=>{setOnclick("stat_scene")}} >
            <View style={[styles(props.orientation).containerMenuContentRow,newStyle("stat_scene").BG]} >
            <Icon
              //reverse
              name={"chart-bar"}
              type='font-awesome-5'
              color= {newStyle("stat_scene").LG.logocolor} 
              size={wp('2.5%')}
              style={styles(props.orientation).icon}
            /> 
                <Text style={[styles(props.orientation).fontMenuContent,newStyle("stat_scene").TX]}>สถิติ</Text>
            </View>
            </Link>

            <View style={styles(props.orientation).containerMenuFooter}>
              <View style={[styles(props.orientation).containerMenuContentRow,newStyle("exit_scene").BG]}>
              <Icon
              //reverse
              name={"door-open"}
              type='font-awesome-5'
              color= {newStyle("exit_scene").LG.logocolor} 
              size={wp('2.5%')}
              style={styles(props.orientation).icon}
            /> 
                <TouchableOpacity
                  onPress={() => {
                    LocalStorage.clearStorage()

                    props.upDateScene(-1)
                  }

                  }
                >
                  <Text style={[styles(props.orientation).fontMenuContent,newStyle("exit_scene").TX]}>ออกจากระบบ</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
        {/* </ImageBackground> */}
        <View style={styles(props.orientation).containerContent}>
          <Router setScene={props.handleScene} handleTestId={props.handleTestId} />
        </View>
      </View>
      </SafeAreaView>
    </NativeRouter>
  );
}

const styles = (props) => StyleSheet.create({
  container: {
    //flex:1,
    //justifyContent: 'center', 
    //alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : Color.Background,
    // width : wp("25%"),
    height : hp ("100%")
    //flex: 1 1 auto,
    //marginTop: 22
  },
  containerMenu :{
    // flex:1,
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'flex-end',
    // backgroundColor:"green",
    width : wp("19%"),
    // height : hp ("100%")
  },
  containerMenuProfile: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
  },
  fontMenuProfile: {
    color: Color.White,
    fontSize: wp('3%'),
    // fontWeight: "bold",
    paddingTop: 12,
    alignItems: 'center',
    fontFamily:Font.Bold,
    justifyContent: 'center'
  },
  fontMenuContent: {
    color: Color.White,
    fontSize: wp('1.8%'),
    alignItems: 'center',
    fontFamily:Font.Regular,
    paddingLeft: 5,
    // backgroundColor:"green",
  },
  containerMenuContent: {
    marginTop: 10,
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerMenuContentRow: {
    // marginVertical: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // alignSelf:"flex-start",
    // alignSelf: 'center',
    flexDirection: 'row',
    width : wp("16%"),
    backgroundColor:Color.White,
    paddingLeft: wp("1%"),
    borderTopLeftRadius: wp("16%")/2,
    borderBottomLeftRadius: wp("16%")/2,
    borderWidth: 2,
    // borderColor:"white",
  },
  containerMenuFooter: {
    flex: 1,
    paddingBottom: hp("2.7%"),
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  containerContent: {
    flex: 2,
    // backgroundColor:"white"
  },
  backgroundMenu: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // flex: 1,
    // resizeMode: "cover",
  },
  imageProfile: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('11%')/2,
    borderColor:Color.White,
    borderWidth:3,
  },
  icon: {
    height: wp("4%"),
    width: wp("4%"),
    justifyContent:'center'
  },
  link:{
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf:'center',
    flexDirection: 'row',
    marginVertical:8,
    borderTopLeftRadius: wp("16%")/2,
    borderBottomLeftRadius: wp("16%")/2,
  }
});

const mapStateToProps = state => {
  return {
    text: state.global,
    scene: state.scene,
    orientation: state.orientation,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    upDateText: (text) => {
      dispatch({ type: 'EDIT_GLOBAL', payload: text })
    },
    upDateScene: (scene) => {
      dispatch({ type: 'EDIT_SCENE', payload: scene })
    },
    upDateOrientation: (orientation) => {
      dispatch({ type: 'EDIT_ORIENTATION', payload: orientation })
    }

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
