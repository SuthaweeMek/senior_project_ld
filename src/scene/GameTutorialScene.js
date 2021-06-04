import React, {  useRef, useState, useEffect } from 'react';
import {
  View,
  Modal,
  Animated,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import SpriteSheet from 'rn-sprite-sheet'
import StatusHP from '../component/statusHP'
import Rand from '../utils/Rand';
import Writing from '../component/tutorial'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'
//alphabet
const ary_th_tutorial = ['th_alphabet_01','th_alphabet_02','th_vowel_01','th_vocab_01','th_alphabet_end']
//image
import imagePlayer from '../resource/image/player_circle.png'
import imageEnemy from '../resource/image/enemy0_circle.png'
import imageGameSceneBG0 from '../resource/games/LDSpotGameSceneBG0.png'
import imageGameSceneFG0 from '../resource/games/LDSpotGameSceneFG0.png'

//sprite
import spritePlayer from '../resource/sprite_sheet/player_character.png'
import spriteEnemy from '../resource/sprite_sheet/enemy0_character.png'
import spriteEffect1 from '../resource/sprite_sheet/effect1.png'


//const spriteSize = height
const GameFirstScene = (props) => {
  //HP Parameters
  const playerHeart = 3
  const enemyHeart = 1
  //State
  const [fps, setFps] = useState(16);
  const [loop, setLoop] = useState(false);
  const [resetAfterFinish, setResetAfterFinish] = useState(false);
  const [playerHeartEmpty, setPlayerHeartEmpty] = useState(0);
  const [enemyHeartEmpty, setEnemyHeartEmpty] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0)
  //Animation Parameters
  const effectFade = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const effectSpeed = useRef(new Animated.Value(0)).current;
  const enemyFade = useRef(new Animated.Value(1)).current;
  const backgroundTransition = useRef(new Animated.Value(0)).current;

  var orientation = props.orientation
  useEffect(()=>{
    lor(props.upDateOrientation)
    return rol()
  },[])
  useEffect(() => {
    playPlayer("idle")
    playEnemy("idle")
  }, [])

  useEffect(() => {
    // code to run on component mount
    const time = 1000 // 1 second per loop
    var round = 0
    setLoop(true)
    playPlayer("idle")
    playEnemy("idle")
    if (enemyHeartEmpty == enemyHeart) {
      Animated.timing(
        enemyFade,
        {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false
        }
      ).start();
      bgTransition()
    }
    else {
      const interval = setInterval(() => {
        round = round + 1
        if (round == 2) {
          setModalVisible(true)
          setLoop(true)
          playPlayer("idle")
          playEnemy("idle")
          //clearInterval(interval)
          //play('idle')
        }
        return () => clearInterval(interval)
      }, time);
    }
  }, [enemyHeartEmpty])

  useEffect(() => {
    // code to run on component mount
    var multiplier = 4;
    if (index == multiplier || index == multiplier * 2 || index == multiplier * 3 || index == multiplier * 4 || index == multiplier * 5
      || index == multiplier * 6 || index == multiplier * 7 || index == multiplier * 8 || index == multiplier * 9 || index == multiplier * 10
      || index == multiplier * 11) {
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
    });
  };

  playEffect = (type) => {
    effect.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
    });
  };

  playEnemy = (type) => {
    enemy.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
    });
  };

  bgTransition = () => {
    Animated.timing(
      backgroundTransition,
      {
        toValue: -wp('100%'),
        duration: 5000,
        useNativeDriver: false
      }

    ).start();
    playPlayer('walk')
    setTimeout(() => props.upDateScene(1),
      5000
    )
  };

  Attack = () => {
    var loop = 0
    const time = 1000 // 1 second per loop
    const effectArrays = [["redstart", "redidle", "redend"], ["bluestart", "blueidle", "blueend"]];
    const effectProb = Rand.Int(0, 2) //random 0 , 1
    playPlayer('attack')
    const interval = setInterval(() => {
      loop = loop + 1
      //effectFade
      if (loop == 1) {
        Animated.timing(effectFade, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
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
        Animated.timing(effectSpeed, {
          toValue: wp('100%'),
          duration: 2000,
          useNativeDriver: false
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
        Animated.timing(effectSpeed, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false
        }).start()
        Animated.timing(effectFade, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false
        }).start()
        setEnemyHeartEmpty(enemyHeartEmpty + 1)
        clearInterval(interval)
      }
      return () => clearInterval(interval)
    }, time);

  };
  const HandleCloseModal = () => {
    setModalVisible(false)
  }

  const SetArrayIndex = () => {
    setIndex(index + 1)

  }
  return (
    // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
    // resizeMode cover stretch
    <View style={styles(orientation).container}>
      <StatusBar hidden={true} />
      <Modal animationType="fade" transparent={true} visible={modalVisible} >
        <Writing modalState={modalVisible} closeModal={HandleCloseModal} arrSound={ary_th_tutorial} setArrIndex={SetArrayIndex} arrIndex={index} />
      </Modal>
      <Animated.View style={[styles(orientation).fadingContainer, { left: backgroundTransition }]}>
        <Image source={imageGameSceneBG0} resizeMode="stretch" style={[styles(orientation).background]} />
      </Animated.View>
      <View style={styles(orientation).statusHP} >
        <View style={{ flexDirection: 'row' }}>
          <Image source={imagePlayer} style={styles(orientation).imageCircle} />
          <StatusHP heart={playerHeart} heartEmpty={playerHeartEmpty} side={"left"} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <StatusHP heart={enemyHeart} heartEmpty={enemyHeartEmpty} side={"right"} />
          <Image source={imageEnemy} style={styles(orientation).imageCircle} />
        </View>
      </View>

      <View style={styles(orientation).field}>
        <View style={{left : orientation=="landscape"?'30%':null}}>
          <SpriteSheet
            ref={ref => (player = ref)}
            source={spritePlayer}
            columns={9}
            rows={6}
            // height={height / 2.76} // set either, none, but not both
            width={wp('15%')}
            //ywidth={281}
            imageStyle={{ marginTop: -1 }}
            animations={{
              idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
              walk: Array.from({ length: 12 }, (v, i) => i + 18),
              attack: Array.from({ length: 15 }, (v, i) => i + 30)
            }}
          />
        </View>
        <Animated.View style={[styles(orientation).effect, { left: effectSpeed, opacity: effectFade }]}>
          <SpriteSheet
            ref={ref => (effect = ref)}
            source={spriteEffect1}
            columns={9}
            rows={6}
            // height={height / 2.76} // set either, none, but not both
            width={wp('15%')}
            imageStyle={{ marginTop: -1, }}
            animations={{
              red: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,],
              redstart: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,],
              redidle: Array.from({ length: 5 }, (v, i) => i + 5),
              redend: Array.from({ length: 7 }, (v, i) => i + 10),
              blue: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,],
              bluestart: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
              blueidle: Array.from({ length: 5 }, (v, i) => i + 23),
              blueend: Array.from({ length: 7 }, (v, i) => i + 28)
            }}
          />
        </Animated.View>
        <Animated.View style={[styles(orientation).enemy, { opacity: enemyFade }]}>
          <SpriteSheet
            ref={ref => (enemy = ref)}
            source={spriteEnemy}
            columns={9}
            rows={6}
            // height={height / 2.76} // set either, none, but not both
            width={wp('15%')}
            imageStyle={{ marginTop: -1 }}
            animations={{
              idle: [0],
              attacked: Array.from({ length: 5 }, (v, i) => i + 1),
              die: Array.from({ length: 18 }, (v, i) => i + 36)
            }}
          />
        </Animated.View>


      </View>
      <Image source={imageGameSceneFG0} resizeMode="stretch" style={[styles(orientation).foreground]} />




      {/* <View style={{ paddingVertical: 30, paddingHorizontal: 30, position: 'absolute' }}>
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
      </View> */}

    </View>
    // </KeyboardAvoidingView>
  );
}

const styles = (orientation) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  statusHP: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  field: {
    flex: 1,
    elevation: (Platform.OS === 'android') ? 3 : 0,
    top: hp('1%'),
    zIndex: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  effect: {
    transform: [{ rotate: '-90deg' }, { scale: 1 }],
    top: '5%',
    zIndex: 3,
    elevation: (Platform.OS === 'android') ? 3 : 0,

  },
  enemy: {
    alignItems: "flex-end",
    flex: 1,
    right : orientation=="landscape"?'30%':null
  },
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    width: wp('200%'),
    height: hp('100%'),
  },
  foreground: {
    zIndex: -1,
    width: wp('200'),
    height: hp('23%')
  },
  imageCircle: {
    width : orientation=="landscape"?wp('10%'):wp('20%'),
    height : orientation=="landscape"?wp('10%'):wp('20%'),
    margin: 10,
    borderRadius: 50
  },
});

const mapStateToProps = state => {
  return {
    scene: state.scene,
    orientation: state.orientation
  }
}


const mapDispatchToProps = dispatch => {
  return {

    upDateScene: (scene) => {
      dispatch({ type: 'EDIT_SCENE', payload: scene })
    },
    upDateOrientation: (orientation) => {
      dispatch({ type: 'EDIT_ORIENTATION', payload: orientation })
    }

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameFirstScene);