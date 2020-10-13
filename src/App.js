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
const App = () => {

return (
  <LoginScene/>
);
}



export default App;
