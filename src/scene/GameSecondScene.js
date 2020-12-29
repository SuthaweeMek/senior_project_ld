import React, { useCallback,useRef, useState, useEffect ,componentDidMount} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  Modal,
  Animated,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Switch
} from 'react-native';
import SpriteSheet from 'rn-sprite-sheet'
import StatusHP from '../component/statusHP'
import Orientation from 'react-native-orientation';
import Device from '../utils/Device';
import Rand from '../utils/Rand';
import Arrays from '../utils/Array'
import Writing from '../component/writing'

//alphabet
var ary_th_vowel = Arrays.CreatePlattern("th_vowel_",36)
//image
import imageBackground from '../resource/image/LDSpotGameScene1.png'
import imageHeart from '../resource/image/heartEmpty.png'
import imagePlayer from '../resource/image/player_circle.png'
import imageEnemy from '../resource/image/enemy1_circle.png'
import imageGameSceneBG2 from '../resource/games/LDSpotGameSceneBG2.png'
import imageGameSceneFG2 from '../resource/games/LDSpotGameSceneFG2.png'

//sprite
import spritePlayer from '../resource/sprite_sheet/player_character.png'
import spriteEnemy from '../resource/sprite_sheet/enemy1_character.png'
import spriteEffect1 from '../resource/sprite_sheet/effect1.png'

//dimesions
width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

console.log("is tablet ?",Device.isTablet())
console.log("Device height = ", height, " and width = ", width)

//const spriteSize = height
const GameFirstScene = (props) => {
  //HP Parameters
  const playerHeart = 5
  const enemyHeart = 1
  //State
  const [Transition, SetTransition] = useState(1);
  const [fps, setFps] = useState(16);
  const [loop, setLoop] = useState(false);
  const [resetAfterFinish, setResetAfterFinish] = useState(false);
  const [playerHeartEmpty, setPlayerHeartEmpty] = useState(0);
  const [enemyHeartEmpty, setEnemyHeartEmpty] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [index,setIndex] = useState(0)
  //Animation Parameters
  const effectFade = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const effectSpeed = useRef(new Animated.Value(0)).current;
  const enemyFade = useRef(new Animated.Value(1)).current; 
  const backgroundTransition = useRef(new Animated.Value(0)).current;
  //TH_alphabet
  index ==0 ? Arrays.Shuffle(ary_th_vowel) : null
  index ==0 ? ary_th_vowel.push("th_alphabet_45") : null
  
  useEffect(() => {
    // code to run on component mount
    const time = 1000 // 1 second per loop
    var round = 0
    Orientation.lockToLandscape();
    playPlayer("idle")
    playEnemy("idle")
    if(enemyHeartEmpty == enemyHeart ){
      console.log("The enemy is dead")
      Animated.timing(
        enemyFade,
        {
          toValue: 0,
          duration: 1000,
          useNativeDriver:false
        }
      ).start();
      setLoop(true)
      bgTransition()
    }
    else{
      const interval = setInterval(() => {
        round = round + 1
        if (round == 2) {
          setModalVisible(true)
          clearInterval(interval)
          //play('idle')
        }
        return () => clearInterval(interval)
      }, time);
    }
    return () => {
      Orientation.unlockAllOrientations();
    }
  }, [enemyHeartEmpty])

  useEffect(() => {
    // code to run on component mount
    var multiplier = 4;
    console.log("index = ",index)
    if(index == multiplier || index == multiplier*2 || index == multiplier*3 || index == multiplier*4 || index == multiplier*5 
      || index == multiplier*6 || index == multiplier*7 || index == multiplier*8 || index == multiplier*9 ){
      setModalVisible(false)
      Attack()
    }
  }, [index])

  playPlayer = (type) => {
    player.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('Player Play')
    });
  };

  playEffect = (type) => {
    effect.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('Effect Play')  
    });
  };

  playEnemy = (type) => {
    enemy.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('Enemy Play')
    });
  };

  bgTransition = () => {
    Animated.timing(
      backgroundTransition,
      {
        toValue: -width,
        duration: 5000,
        useNativeDriver:false
      }
    ).start();
    playPlayer('walk')
    setTimeout(() => props.handleScene(3),
      5000
    )
    // const interval = setInterval(() => {
    //   setBackgroundTransition({ left: -speed })

    //   loop = loop + 1
    //   speed = speed + 5

    //   //console.log('This 1 second',-speed)//-Dimensions.get('window').width
    //   if (speed >= width) {
    //     clearInterval(interval)
    //     play('idle')
    //   }
    //   return () => clearInterval(interval)
    // }, time);

  };

  Attack = () => {
    var loop = 0
    const time = 1000 // 1 second per loop
    const effectArrays = [["redstart","redidle","redend"],["bluestart","blueidle","blueend"]];
    const effectProb = Rand.Int(0,2) //random 0 , 1
    //mummy.stop(() => console.log('stopped'));
    console.log("effect1 ",effectArrays[effectProb][0],"effect2 ",effectArrays[effectProb][1],"effect3 ",effectArrays[effectProb][2])
    playPlayer('attack')
    const interval = setInterval(() => {
      loop = loop + 1
      //effectFade
      if (loop == 1) {
        Animated.timing(effectFade,{
          toValue:1,
          duration:1000,
          useNativeDriver:false
        }).start()
        setLoop(true)
        playPlayer('idle')
        setLoop(false)
        setFps(11)
        playEffect(effectArrays[effectProb][0])
      }
      if (loop == 2) {
        setLoop(true)
        setFps(16)
        playEffect(effectArrays[effectProb][1])
      }
      if (loop == 3) {
        Animated.timing(effectSpeed,{
          toValue:width,
          duration:2000,
          useNativeDriver:false
        }).start()
        setLoop(true)
        playPlayer('idle')
        
      }
      if (loop == 4) {
        playEnemy('attacked')
        playEffect(effectArrays[effectProb][2])
      }
      if (loop == 5) {
        setLoop(true)
        playEnemy('idle')
        Animated.timing(effectSpeed,{
          toValue:0,
          duration:0,
          useNativeDriver:false
        }).start()
        Animated.timing(effectFade,{
          toValue:0,
          duration:0,
          useNativeDriver:false
        }).start()
        setEnemyHeartEmpty(enemyHeartEmpty+1)
        clearInterval(interval)
      }
      return () => clearInterval(interval)
    }, time);

  };
  const modalOpen = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    setModalVisible(true)
    // return (
    //   <Writing modal={true}/>
    // );
  };

  const HandleCloseModal = () => {
    console.log("modal closed")
    setModalVisible(false)
  }

  const SetArrayIndex = () =>{
    console.log("index : ",index)
    setIndex(index+1)
  }

  const FadeInView = (props) => {
     const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    // React.useEffect(() => {
      console.log("fadeAnim = ",props)
      Animated.timing(
        fadeAnim,
        {
          toValue: width,
          duration: 2000,
          useNativeDriver:false
        }
      ).start();
    // }, [fadeAnim])
    
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          left: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
      
    );
  }




  return (
    // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
    // resizeMode cover stretch
    <View style={styles.container}>
      <Animated.View style={[styles.fadingContainer,{ left:backgroundTransition}]}>  
        <Image source={imageGameSceneBG2} resizeMode="stretch" style={[styles.background]} />
      </Animated.View>
      <View style={styles.statusHP} >
        <View style={{ flexDirection: 'row' }}>
          <Image source={imagePlayer} style={styles.imageCircle} />
          <StatusHP heart={playerHeart} heartEmpty={playerHeartEmpty} side={"left"} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <StatusHP heart={enemyHeart} heartEmpty={enemyHeartEmpty} side={"right"} />
          <Image source={imageEnemy} style={styles.imageCircle} />
        </View>
      </View>

      <View style={styles.field}>
        <View style={{left:"50%"}}>
          <SpriteSheet
            ref={ref => (player = ref)}
            source={spritePlayer}
            columns={9}
            rows={6}
            height={height / 2.76} // set either, none, but not both
            //ywidth={281}
            imageStyle={{ marginTop: -1 }}
            animations={{
              idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
              walk: Array.from({ length: 12 }, (v, i) => i + 18),
              attack: Array.from({ length: 15 }, (v, i) => i + 30)
            }}
          />
        </View>
        <Animated.View style={[styles.effect,{left:effectSpeed ,opacity:effectFade}]}>
            <SpriteSheet
              ref={ref => (effect = ref)}
              source={spriteEffect1}
              columns={9}
              rows={6}
              height={height / 2.76} // set either, none, but not both
              //width={100}
              imageStyle={{ marginTop: -1 }}
              animations={{
                red : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,],
                redstart: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,],
                redidle: Array.from({ length: 5 }, (v, i) => i + 5),
                redend: Array.from({ length: 7 }, (v, i) => i + 10),
                blue : [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,],
                bluestart: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
                blueidle: Array.from({ length: 5 }, (v, i) => i + 23),
                blueend: Array.from({ length: 7 }, (v, i) => i + 28)
              }}
            />
            </Animated.View>
        <Animated.View style={[styles.enemy,{opacity:enemyFade}]}>
          <SpriteSheet
            ref={ref => (enemy = ref)}
            source={spriteEnemy}
            columns={9}
            rows={6}
            height={height / 2.76} // set either, none, but not both
            //width={100}
            imageStyle={{ marginTop: -1 }}
            animations={{
              idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
              attacked: Array.from({ length: 5 }, (v, i) => i + 16),
              die: Array.from({ length: 18 }, (v, i) => i + 36)
            }}
          />
        </Animated.View>
        
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <Writing modalState = {modalVisible} closeModal={HandleCloseModal} arrSound={ary_th_vowel} setArrIndex={SetArrayIndex} arrIndex={index}/>
        </Modal>
        
      </View>



      <Image source={imageGameSceneFG2} resizeMode="stretch" style={[styles.foreground]} />

      <View style={{ paddingVertical: 30, paddingHorizontal: 30, position: 'absolute' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button onPress={() => playPlayer('idle')} title="Player" />
          <Button onPress={() => playEnemy('attacked')} title="Enemy" />
          <Button onPress={() => bgTransition()} title="BG Move" />
          <Button onPress={() => setModalVisible(true)} title="Modal" />
          <Button onPress={() => Attack()} title="Attack" />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, marginRight: 10 }}>FPS</Text>
          <TextInput
            style={{ flex: 1, borderBottomWidth: 1, fontSize: 16 }}
            value={String(fps)}
            keyboardType="number-pad"
            onChangeText={fps => setFps(fps)}
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
            onValueChange={val => setResetAfterFinish(val)}
          />
        </View>
      </View>

    </View>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "green",
    flexDirection: "column"
    //justifyContent: 'center', 
    //alignItems: 'center',
    //backgroundColor : "gray"
    //flex: 1 1 auto,
    //marginTop: 22
  },
  statusHP: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  field: {
    flex: 1,
    //backgroundColor:"red",
    top: 7,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    //justifyContent: 'space-around'
  },
  effect:{
    transform: [{ rotate: '-90deg'},{scale: 1}],
    top : '5%',
    zIndex : 3
  },
  enemy:{
    alignItems:"flex-end",
    flex:1,
    right:"50%"
  },
  background: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    // resizeMode: "cover",
    position: "absolute",
    left: 0,
    width: width * 2,
    height: height,
  },
  foreground: {
    // justifyContent: 'center',
    // alignItems: 'center',

    // resizeMode: "cover",
    backgroundColor: 'black',
    justifyContent: 'flex-end',
    width: width * 2,
    height: height / 4.26,
    opacity:1,
  },
  imageCircle: {
    width: height / 5,
    height: height / 5,
    margin: 10,
    borderRadius: 50
  },
});


export default GameFirstScene;