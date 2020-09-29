/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  ImageBackground,
  Image
} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import backgroundMenu from '../resource/image/backgroundMenu.png';
import imageProfile from '../resource/image/dummyProfile.jpg';
import WritingScene from './WritingScene'
const image = { uri: "https://reactjs.org/logo-og.png" };
import Router from '../router'


const HomeScene = () => {
  return (
    <NativeRouter>
      <View style={styles.container}>

        <ImageBackground source={backgroundMenu} style={styles.backgroundMenu}>
          <View style={styles.containerMenuProfile}>

          
              <Image source={imageProfile} style={styles.imageProfile}></Image>
              <Link to="/" >
              <Text style={styles.fontMenuProfile}>Pig Piggy</Text>
            </Link>
          </View>

          <View style={styles.containerMenuContent}>
            <View style={styles.containerMenuContentRow}>
              
                <Image source={imageProfile} style={styles.icon}></Image>
                <Link to="/test" >
                <Text style={styles.fontMenuContent}>ทำแบบทดสอบ</Text>
              </Link>
            </View>
            <View style={styles.containerMenuContentRow}>
              
                <Image source={imageProfile} style={styles.icon}></Image>
                <Link to="/result" >
                <Text style={styles.fontMenuContent}>ผลลัพท์</Text>
              </Link>
            </View>
            <View style={styles.containerMenuContentRow}>
              
                <Image source={imageProfile} style={styles.icon}></Image>
                <Link to="/stat" >
                <Text style={styles.fontMenuContent}>สถิติ</Text>
              </Link>
            </View>

            <View style={styles.containerMenuFooter}>
              <View style={styles.containerMenuContentRow}>
               
                  <Image source={imageProfile} style={styles.icon}></Image>
                  <Link to="/logout" >

                  <Text style={styles.fontMenuContent}>ออกจากระบบ</Text>
                </Link>
              </View>
            </View>

          </View>



        </ImageBackground>
        <View style={styles.containerContent}>
          <Router/>
        </View>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center', 
    //alignItems: 'center',
    flexDirection: 'row',
    //backgroundColor : "gray"
    //flex: 1 1 auto,
    //marginTop: 22
  },
  containerMenuProfile: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  fontMenuProfile: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fontMenuContent: {
    color: 'white',
    fontSize: 15,
    alignItems: 'center',
    paddingLeft: 5,
  },
  containerMenuContent: {
    marginTop: 10,
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerMenuContentRow: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  containerMenuFooter: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerContent: {
    backgroundColor: "blue",
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: "cover",
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
});


export default HomeScene;
