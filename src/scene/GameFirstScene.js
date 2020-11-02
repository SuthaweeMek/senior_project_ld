import React, { useCallback, useState,useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Switch
} from 'react-native';
import SpriteSheet from 'rn-sprite-sheet'
import StatusHP from '../component/statusHP'

//image
import imageBackground from '../resource/image/LDSpotGameScene1.png'
import imageHeart from '../resource/image/heartEmpty.png'
import imagePlayer from '../resource/image/player_circle.png'
import imageEnemy from '../resource/image/enemy1_circle.png'

//dimesions
const height = Dimensions.get('window').height //1:4.65
const width = Dimensions.get('window').width
//const spriteSize = height
const GameFirstScene = () => {
  console.log("Device height = ",height," and width = ",width)
  const [backgroundTransition,setBackgroundTransition] = useState({left : 0});
  const [Transition,SetTransition] = useState(1);
  const [fps , setFps] = useState(16);
  const [loop , setLoop] = useState(true);
  const [resetAfterFinish , setResetAfterFinish] = useState(false);
  const [playerHeartEmpty , setPlayerHeartEmpty] = useState(0);
  const [enemyHeartEmpty , setEnemyHeartEmpty] = useState(0);

  play = (type) => {  
    enemy.play({ 
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('hi')
    });
    player.play({ 
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('hi')
    });
  };

  stop = () => {
    var loop = 0
    var speed = 0
    const time = 0.1 // 1 second per loop
    //mummy.stop(() => console.log('stopped'));
    play('idle')
    const interval = setInterval(()=>{
        setBackgroundTransition({left : -speed})
        
        loop = loop+1
        speed = speed+5
        
        console.log('This 1 second',-Transition)//-Dimensions.get('window').width
        if (speed >= Dimensions.get('window').width){
          clearInterval(interval)
          play('walk')
        }
        return () => clearInterval(interval)
       },time);
       
  };
    return (
     // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
     // resizeMode cover stretch
     <View style={styles.container}>

       <Image source={imageBackground} resizeMode="stretch" style = {[styles.background]}/>

        <View style={styles.statusHP} >
          <View style={{flexDirection : 'row'}}>
            <Image source={imagePlayer} style={styles.imageCircle}/>
            <StatusHP heart = {5} heartEmpty={0} side={"left"} />
          </View>
          <View style={{flexDirection : 'row'}}>
            <StatusHP heart = {5 } heartEmpty={1} side={"right"} />
            <Image source={imageEnemy} style={styles.imageCircle}/>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection:'row',backgroundColor:'red',justifyContent:'space-around'}}>
         
          <View>
            <SpriteSheet
              ref={ref => (player = ref)}
              source={require('../resource/sprite_sheet/player_character.png')}
              columns={9}
              rows={6}
              height={height/2.76} // set either, none, but not both
              //ywidth={281}
              imageStyle={{ marginTop: -1 }}
              animations={{
                idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                walk: Array.from({ length: 18 }, (v, i) => i + 18),
                die: Array.from({ length: 18 }, (v, i) => i + 36)
              }}
            />
          </View>
          <View>
            <SpriteSheet
              ref={ref => (enemy = ref)}
              source={require('../resource/sprite_sheet/enemy1_character.png')}
              columns={9}
              rows={6}
              height={height/2.76} // set either, none, but not both
              //width={100}
              imageStyle={{ marginTop: -1 }}
              animations={{
                idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                walk: Array.from({ length: 18 }, (v, i) => i + 18),
                die: Array.from({ length: 18 }, (v, i) => i + 36)
              }}
            />
          </View>

          
        </View>

        <View style={{ height:height/5.6 ,flexDirection:'row'}}></View>
          {/* <View style={{ paddingVertical: 30, paddingHorizontal: 30 }}>
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
          </View> */}
      </View>
     // </KeyboardAvoidingView>
     );
    

 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "green", 
    //justifyContent: 'center', 
    //alignItems: 'center',
    //backgroundColor : "gray"
    //flex: 1 1 auto,
    //marginTop: 22
  },
  statusHP : {
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  background: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    // resizeMode: "cover",
    position : "absolute",
    left : 0,
    width: width*2,
    height: height,
  },
  imageCircle: {
    width: height/5,
    height: height/5,
    margin : 10,
    borderRadius: 50
  },
});
  export default GameFirstScene;