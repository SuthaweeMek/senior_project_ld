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
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import SideMenu from 'react-native-side-menu'

import imageProfile from '../resource/image/logo.png';
const image = { uri: "https://reactjs.org/logo-og.png" };
import Router from '../router'
import { connect } from 'react-redux';
import LocalStorage from '../utils/LocalStorage'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
import { Icon } from 'react-native-elements'
import Color from '../resource/color';
import Font from '../resource/font';
import Device from '../utils/Device'
import { FontSize, LayoutSize } from '../resource/dimension'
const width = Dimensions.get('window').width


const HomeScene = (props) => {
  userrole = props.userrole
  useEffect(() => {
    lor(props.upDateOrientation)
    return rol()
  }
    , [])
  const [onClick, setOnclick] = useState("test_scene")
  props.upDateText("testtext")
  const containerScene = ({ navigation }) => {
    return (
      <View style={styles(props.orientation).containerContent}>
        <Router setScene={props.handleScene} handleTestId={props.handleTestId} />
      </View>
    )
  }

  const HomeScreen = ({ navigation }) => {
    return (
      // <View style={{flex:1}}>
      <View style={styles(props.orientation).containerMenu}>

        <View style={styles(props.orientation).containerMenuProfile}>
          <Image source={imageProfile} style={styles(props.orientation).imageProfile}></Image>
          <Link to="/" >
            <Text style={styles(props.orientation).fontMenuProfile}>{props.firstname}</Text>
          </Link>
        </View>

        <View style={styles(props.orientation).containerMenuContent}>

          <Link style={styles(props.orientation).link} to="/test" onPress={() => { setOnclick("test_scene") }} >
            <View style={[styles(props.orientation).containerMenuContentRow, newStyle("test_scene").BG]} >
              <Icon
                //reverse
                name={"pen"}
                type='font-awesome-5'
                color={newStyle("test_scene").LG.logocolor}
                size={LayoutSize.MunuIcon}
                style={styles(props.orientation).icon}
              />
              <Text style={[styles(props.orientation).fontMenuContent, newStyle("test_scene").TX]} numberOfLines={1} >แบบทดสอบ </Text>
            </View>
          </Link>


          {userrole == "teacher" ?
            <>
              <Link style={styles(props.orientation).link} to="/result" onPress={() => { setOnclick("result_scene") }}>
                <View style={[styles(props.orientation).containerMenuContentRow, newStyle("result_scene").BG]} >
                  <Icon
                    //reverse
                    name={"file-contract"}
                    type='font-awesome-5'
                    color={newStyle("result_scene").LG.logocolor}
                    size={LayoutSize.MunuIcon}
                    style={styles(props.orientation).icon}
                  />
                  <Text style={[styles(props.orientation).fontMenuContent, newStyle("result_scene").TX]} numberOfLines={1} >ผลลัพธ์</Text>
                </View>
              </Link>

              <Link style={styles(props.orientation).link} to="/student" onPress={() => { setOnclick("student_scene") }} >
                <View style={[styles(props.orientation).containerMenuContentRow, newStyle("student_scene").BG]} >
                  <Icon
                    //reverse
                    name={"user-md"}
                    type='font-awesome-5'
                    color={newStyle("student_scene").LG.logocolor}
                    size={LayoutSize.MunuIcon}
                    style={styles(props.orientation).icon}
                  />
                  <Text style={[styles(props.orientation).fontMenuContent, newStyle("student_scene").TX]} numberOfLines={1} >บุคคล</Text>
                </View>
              </Link>

              <Link style={styles(props.orientation).link} to="/stat" onPress={() => { setOnclick("stat_scene") }} >
                <View style={[styles(props.orientation).containerMenuContentRow, newStyle("stat_scene").BG]} >
                  <Icon
                    //reverse
                    name={"chart-bar"}
                    type='font-awesome-5'
                    color={newStyle("stat_scene").LG.logocolor}
                    size={LayoutSize.MunuIcon}
                    style={styles(props.orientation).icon}
                  />
                  <Text style={[styles(props.orientation).fontMenuContent, newStyle("stat_scene").TX]} numberOfLines={1} >สถิติ</Text>
                </View>
              </Link>

             
            </>
            : null}

          <View style={styles(props.orientation).containerMenuFooter}>
            <View style={[styles(props.orientation).containerMenuContentRow, newStyle("exit_scene").BG]}>
              <Icon
                //reverse
                name={"door-open"}
                type='font-awesome-5'
                color={newStyle("exit_scene").LG.logocolor}
                size={LayoutSize.MunuIcon}
                style={styles(props.orientation).icon}
              />
              <TouchableOpacity
                onPress={() => {
                  LocalStorage.clearStorage()

                  props.upDateScene(-1)
                }

                }
              >
                <Text style={[styles(props.orientation).fontMenuContent, newStyle("exit_scene").TX]} numberOfLines={1} >ออกจากระบบ</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>

      // </View>

    );
  }

  function NotificationsScreen({ navigation }) {
    return (
        HomeScreen(props.orientation)
    );
  }
  const newStyle = (fromscene) => {
    var new_style = {}
    const menu_clicked = {
      BG: { backgroundColor: Color.White, borderColor: Color.White, },
      LG: { logocolor: Color.Background },
      TX: { color: Color.Black, fontFamily: "EkkamaiNew-Bold" }
    }
    const menu_unclick = {
      BG: { backgroundColor: Color.Background, borderColor: Color.Background },
      LG: { logocolor: Color.Sub_Surface },
      TX: { color: Color.White }
    }

    switch (fromscene) {
      case 'test_scene':
        onClick == fromscene ? new_style = menu_clicked : new_style = menu_unclick
        break
      case 'result_scene':
        onClick == fromscene ? new_style = menu_clicked : new_style = menu_unclick
        break
      case 'stat_scene':
        onClick == fromscene ? new_style = menu_clicked : new_style = menu_unclick
        break
      case 'student_scene':
        onClick == fromscene ? new_style = menu_clicked : new_style = menu_unclick
        break
      case 'exit_scene':
        onClick == fromscene ? new_style = menu_clicked : new_style = menu_unclick
        break
      default:
        null
        break
    }


    return (new_style)

  }

  return (
    <NativeRouter>
      <StatusBar translucent={false} barStyle={"light-content"} backgroundColor={Color.Background} />
      <SafeAreaView style={{ flex: 1 }}>

        <View style={styles(props.orientation).container}>

          {
            props.orientation == "landscape" ?
              <>
                {HomeScreen(props.orientation)}
                {containerScene(props.orientation)}
              </>
              :
              // แนวตั้ง
              <SideMenu menu={NotificationsScreen(props.orientation)} openMenuOffset={width<=400?width/2:width/4} isOpen={props.menuDrawer} onChange={()=>{props.upDateMenuDrawer(!props.menuDrawer)}}>
                {containerScene(props.orientation)}
              </SideMenu>
          }
        </View>
      </SafeAreaView>
    </NativeRouter>
  );
}

const styles = (props) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Background,
    height: hp("100%")
  },
  containerMenu: {

    flex : props=="portrait" ? 1:null,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: props=="portrait" ? null : wp("19%"),
  },
  containerMenuProfile: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  fontMenuProfile: {
    color: Color.White,
    fontSize: Device.fontSizer(FontSize.H5),
    paddingTop: 16,
    alignItems: 'center',
    fontFamily: Font.Bold,
    justifyContent: 'center'
  },
  fontMenuContent: {
    color: Color.White,
    fontSize: Device.fontSizer(FontSize.Body2),
    width: props=="portrait"?153:wp("16%"),
    textAlignVertical: "auto",
    fontFamily: Font.Regular,
  },
  containerMenuContent: {
    marginTop: 10,
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerMenuContentRow: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: LayoutSize.MenuHeight,
    width: props=="portrait"?LayoutSize.MenuWidth:wp("16%"),
    paddingLeft: LayoutSize.MunuPaddingLeft,
    borderTopLeftRadius: wp("16%") / 2,
    borderBottomLeftRadius: wp("16%") / 2,
  },
  containerMenuFooter: {
    flex: 1,
    paddingBottom: hp("7%"),
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  containerContent: {
    flex: 2,
  },
  backgroundMenu: {
  },
  imageProfile: {
    width: wp('10%'),
    height: wp('11%'),
    resizeMode: 'stretch'
  },
  icon: {
    height: LayoutSize.MunuIcon,
    width: LayoutSize.MunuIcon,
    marginHorizontal : LayoutSize.MunuIconMarginHorizontal,
    justifyContent: 'center'
  },
  link: {
    flexDirection: 'row',
    marginVertical: 4,
    borderTopLeftRadius: wp("16%") / 2,
    borderBottomLeftRadius: wp("16%") / 2,
  }
});

const mapStateToProps = state => {
  return {
    userrole: state.userrole,
    text: state.global,
    scene: state.scene,
    orientation: state.orientation,
    firstname: state.firstname,
    menuDrawer : state.menuDrawer,
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
    },
    upDateUserrole: (userrole) => {
      dispatch({ type: 'EDIT_USERROLE', payload: userrole })
    },
    upDateMenuDrawer: (menuDrawer) => {
      dispatch({ type: 'EDIT_DRAWER', payload: menuDrawer })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
