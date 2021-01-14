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
import {widthPercentageToDP as wp, heightPercentageToDP as hp,listenOrientationChange as lor,removeOrientationListener as rol} from '../utils/Device'
import { Icon } from 'react-native-elements'

const HomeScene = (props) => {
  const [onClick,setOnclick] = useState("test_scene")
  // console.log("test", props.text)

  props.upDateText("testtext")

  const newStyle = (fromscene) =>{
    var new_style = {}
    console.log("onClick vs fromscene",onClick , "and ", fromscene,": ",onClick==fromscene)
    const menu_clicked = {BG:{backgroundColor:"white",borderColor:"white"},
    FG:{logocolor:"#24A0ED",color:"black"}}
    const menu_unclick = {BG:{backgroundColor:"#24A0ED",borderColor:"#24A0ED"},
    FG:{logocolor:"white",color:"white"}}

    switch (fromscene) {
      case 'test_scene':
        onClick==fromscene ? new_style = menu_clicked: new_style = menu_unclick
      case 'result_scene':
        onClick==fromscene ? new_style = menu_clicked: new_style = menu_unclick
      case 'stat_scene':
        onClick==fromscene ? new_style = menu_clicked: new_style =menu_unclick
      }
  return (new_style)
  
}

  return (
    <NativeRouter>
      <StatusBar translucent={true} barStyle={"dark-content"} backgroundColor={"#00000000"} />
      <View style={styles.container}>

        {/* <ImageBackground source={backgroundMenu} style={styles.backgroundMenu}> */}
        <View style={styles.containerMenu}>

          <View style={styles.containerMenuProfile}>
            <Image source={imageProfile} style={styles.imageProfile}></Image>
            <Link to="/" >
              <Text style={styles.fontMenuProfile}>Pig Piggy</Text>
            </Link>
          </View>

          <View style={styles.containerMenuContent}>

            <Link to="/test" onPress={()=>{setOnclick("test_scene")}} >
            <View style={[styles.containerMenuContentRow,newStyle("test_scene").BG]} >
            <Icon
              //reverse
              name={"pen"}
              type='font-awesome-5'
              color= {newStyle("test_scene").FG.logocolor} 
              size={wp('2.5%')}
              style={styles.icon}
            />
                <Text style={[styles.fontMenuContent,{color:newStyle("test_scene").FG.color}]}>แบบทดสอบ</Text>
            </View>
            </Link>

            <Link to="/result" onPress={()=>{setOnclick("result_scene")}}>
            <View style={[styles.containerMenuContentRow,newStyle("result_scene").BG]} >
            <Icon
              //reverse
              name={"file-contract"}
              type='font-awesome-5'
              color= {newStyle("result_scene").FG.logocolor} 
              size={wp('2.5%')}
              style={styles.icon}
            />              
                <Text style={[styles.fontMenuContent,{color:newStyle("result_scene").FG.color}]}>ผลลัพท์</Text>
            </View>
            </Link>

            <Link to="/stat" onPress={()=>{setOnclick("stat_scene")}} >
            <View style={[styles.containerMenuContentRow,newStyle("stat_scene").BG]} >
            <Icon
              //reverse
              name={"chart-bar"}
              type='font-awesome-5'
              color= {newStyle("stat_scene").FG.logocolor} 
              size={wp('2.5%')}
              style={styles.icon}
            /> 
                <Text style={[styles.fontMenuContent,{color:newStyle("stat_scene").FG.color}]}>สถิติ</Text>
            </View>
            </Link>

            <View style={styles.containerMenuFooter}>
              <View style={styles.containerMenuContentRow}>
              <Icon
              //reverse
              name={"door-open"}
              type='font-awesome-5'
              color= {"white"} 
              size={wp('2.5%')}
              style={styles.icon}
            /> 
                <TouchableOpacity
                  onPress={() => props.upDateScene(-1)}
                >
                  <Text style={styles.fontMenuContent}>ออกจากระบบ</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
        {/* </ImageBackground> */}
        <View style={styles.containerContent}>
          <Router setScene={props.handleScene} handleTestId={props.handleTestId} />
        </View>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    //justifyContent: 'center', 
    //alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "#24A0ED",
    // width : wp("25%"),
    // height : hp ("100%")
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf:'center'
    // backgroundColor:"red"
  },
  fontMenuProfile: {
    color: 'white',
    fontSize: wp('3%'),
    // fontWeight: "bold",
    paddingTop: 12,
    alignItems: 'center',
    fontFamily:"EkkamaiNew-Bold",
    justifyContent: 'center'
  },
  fontMenuContent: {
    color: 'white',
    fontSize: wp('1.8%'),
    alignItems: 'center',
    fontFamily:"EkkamaiNew-Regular",
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
    marginVertical: 12,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // alignSelf:"flex-start",
    alignSelf: 'center',
    flexDirection: 'row',
    width : wp("16%"),
    backgroundColor:"white",
    paddingLeft: wp("1%"),
    borderTopLeftRadius: wp(1.8),
    borderBottomLeftRadius: wp(1.8),
    borderWidth: 2,
    borderColor:"white",
  },
  containerMenuFooter: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  containerContent: {
    flex: 2,
    backgroundColor:"white"
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
    borderColor:"white",
    borderWidth:3,
  },
  icon: {
    width: wp(3.2),

  },
});

const mapStateToProps = state => {
  return {
    text: state.global,
    scene: state.scene
  }
}


const mapDispatchToProps = dispatch => {
  return {
    upDateText: (text) => {
      dispatch({ type: 'EDIT_GLOBAL', payload: text })
    },
    upDateScene: (scene) => {
      dispatch({ type: 'EDIT_SCENE', payload: scene })
    }


  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
