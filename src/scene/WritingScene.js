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
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';


const WritingScene = () => {
  const canvasRef = React.createRef()

  const Undo = () => { 
    canvasRef.current.undo()
  }
  

return (
  <View style={styles.container}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <SketchCanvas
        style={{ flex: 1 }}
        strokeColor={'black'}
        strokeWidth={3}
        ref={canvasRef}
      />
    </View>
    <Button
      onPress={Undo}
      title="Undo"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
});

export default WritingScene;
