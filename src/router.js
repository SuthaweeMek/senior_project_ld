/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';



import WritingScene from './scene/WritingScene'
import HomeScene from './scene/HomeScene'
//import TestSprite from './scene/TestSprite'
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


function Home() {
  return <Text style={styles.header}>Home</Text>;
}

function Test() {
  return WritingScene;
}


function Result() {
  return <Text style={styles.header}>Result</Text>;
}

function Stat() {
  return <Text style={styles.header}>Stat</Text>;
}

function Logout() {
  return <Text style={styles.header}>Logout</Text>;
}

const RouterComponent = () => {

  return (
    <React.Fragment>
      <Route exact path="/" component={HomeScene} />
      <Route path="/testSprote" component={Home} />
      <Route path="/result" component={Result} />
      <Route path="/stat" component={Stat} />
      <Route path="/logout" component={Logout} />
    </React.Fragment>
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

export default RouterComponent;
