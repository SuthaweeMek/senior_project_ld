import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Text,
  Switch
} from 'react-native';
import SpriteSheet from 'rn-sprite-sheet';
import Image from '../resource/sprite_sheet/mummy.png';

const TestSprite = () => {

  const [fps , setFps] = useState(16);
  const [loop , setLoop] = useState(false);
  const [resetAfterFinish , setResetAfterFinish] = useState(false);

  play = (type) => {  
    mummy.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('hi')
    });
  };

  stop = () => {
    mummy.stop(() => console.log('stopped'));
  };
  //const { fps, loop, resetAfterFinish } = this.state; 
    return (
        //<Text>Hello2</Text>  
     // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
     <View style={{flex : 1}}>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <SpriteSheet
              ref={ref => (mummy = ref)}
              source={require('../resource/sprite_sheet/player_character/player_character2.png')}
              columns={9}
              rows={6}
               //height={185} // set either, none, but not both
               //ywidth={281}
              imageStyle={{ marginTop: -1 }}
              animations={{
                idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                walk: Array.from({ length: 12 }, (v, i) => i + 18),
                die: Array.from({ length: 21 }, (v, i) => i + 33)
              }}
            />
          </View>
          <View style={{ paddingVertical: 30, paddingHorizontal: 30 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button onPress={() => play('idle')} title="idle" />
              <Button onPress={() => play('walk')} title="walk" />
              <Button onPress={() => play('die')} title="die" />
              <Button onPress={() => stop()} title="die same but need to stop" />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, marginRight: 10 }}>FPS</Text>
              <TextInput
                style={{ flex: 1, borderBottomWidth: 1, fontSize: 16 }}
                value={String(fps)}
                keyboardType="number-pad"
                onChangeText={fps => setFps( fps )}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, marginRight: 10 }}>Loop</Text>
              <Switch value={loop} onValueChange={loop => setLoop(loop)} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, marginRight: 10 }}>Reset After Finish</Text>
              <Switch
                value={resetAfterFinish}
                onValueChange={val => setResetAfterFinish(val )}
              />
            </View>
          </View>
        </View>
     // </KeyboardAvoidingView>
     );
    

 }
  // const TestSprite = () => {
  //   return (
  //     <Text>MARAMOO2222</Text>
  //   );
  // }

  // play = (type) => {
  //   const { fps, loop, resetAfterFinish } = this.state;

  //   this.mummy.play({
  //     type,
  //     fps: Number(fps),
  //     loop: loop,
  //     resetAfterFinish: resetAfterFinish,
  //     onFinish: () => console.log('hi')
  //   });
  // };

  // stop = () => {
  //   this.mummy.stop(() => console.log('stopped'));
  // };
  


  export default TestSprite;