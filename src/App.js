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
<<<<<<< HEAD
  ReloadInstructions,
=======
  ReloadInstructions, tt
>>>>>>> ec1efef3e726aedbfd3b38f80a719e26de848b18
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
<<<<<<< HEAD
import CollectingScene from './scene/CollectingScene'

const App = () => {
  return (
      <CollectingScene/>
=======
import Pagination from './component/pagination'
import Input from './component/inputboxLogin'

import { Provider } from 'react-redux'; // <---- 
import { createStore } from 'redux';    // <----
import Reducer from './Reducer'
const App = () => {
  const store = createStore(Reducer);     // <----
  return (
     <Provider store={store}>
      <Router2Component />
     </Provider>
>>>>>>> ec1efef3e726aedbfd3b38f80a719e26de848b18
  );
}



export default App;
