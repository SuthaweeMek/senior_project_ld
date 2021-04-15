/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';



import ResultScene from './scene/ResultScene'
import StudentScene from './scene/StudentScene'
import HomeScene from './scene/HomeScene'
import GameFirstScene from './scene/GameFirstScene'
import StartTestScene from './scene/StartTestScene'
import StatScene from  './scene/StatScene'
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
import { connect } from 'react-redux';

function Home() {
  return <Text >Home</Text>;
}

function Result() {
  return <Text >Result</Text>;
}

function Stat() {
  return <Text >Stat</Text>;
}



const RouterComponent = (props) => {



  return (
    <React.Fragment>
      <Route exact path="/" render={() => <StartTestScene handleScene={props.setScene} handleTestId={props.handleTestId} />}/>
      <Route path="/test" render={() => <StartTestScene handleScene={props.setScene} handleTestId={props.handleTestId} />} />
      <Route path="/result" component={ResultScene} />
      <Route path="/student" component={StudentScene}/>
      <Route path="/stat" component={StatScene} />
    </React.Fragment>
  );

}

export default (RouterComponent);
