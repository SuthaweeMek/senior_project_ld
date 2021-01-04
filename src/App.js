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
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,tt
} from 'react-native/Libraries/NewAppScreen';

import HomeScene from './scene/HomeScene';
import LoginScene from './scene/LoginScene';
import Test from './scene/TestSprite';
import TestSound from './scene/TestSound';
import WritingScene from './scene/WritingScene';
import ImageScene from './scene/ImageScene';
import GameFirstScene from './scene/GameFirstScene';
import GameSecondScene from './scene/GameSecondScene';
import GameThirdScene from './scene/GameThirdScene';
import Router2Component from './router2'
const App = () => {

return (
  <GameThirdScene/>
);
}



export default App;
