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
import {Actions} from 'react-native-router-flux';

const SecondScene = () => {
  function handleClick (input)
  {
    if(input == 'HomeScene') Actions.homescene();
    if(input == 'WritingScene') Actions.writingscene();
  }

return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Button title="Go to  HomeScene" onPress={() => {handleClick('HomeScene')}}/>
      <Button title="Go to  WritingScene" onPress={() => {handleClick('WritingScene')}}/>
    </View>
);
}


export default SecondScene;
