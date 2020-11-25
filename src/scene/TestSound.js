import React, { useCallback, useEffect, useState } from 'react';
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
import Image from '../resource/sprite_sheet/effect1.png';
import Array from '../utils/Array'
import Rand from '../utils/Rand'
// Import the react-native-sound module
import Sound from 'react-native-sound'
// Enable playback in silence mode
//Sound.setCategory('Playback');


var ary_th_alphabet = Array.CreatePlattern("th_alphabet_",44)
const TestSound = () => {
    
    //const [ary_th_alphabet, set_ary_th_alphabet] = useState(Array.CreatePlattern("th_alphabet_",44));
    const [index, setIndex] = useState(Rand.Int(0,ary_th_alphabet.length));
    const [sound,setSound] = useState(new Sound(ary_th_alphabet[0].concat(".mp3"), Sound.MAIN_BUNDLE))
    const [i,setI] = useState(0)
    //console.log(ary_th_alphabet)
    
   //sound.play()

//       // Reduce the volume by half
// whoosh.setVolume(1);
 
// // Position the sound to the full right in a stereo field
// whoosh.setPan(1);
 
// // Loop indefinitely until stop() is called
// whoosh.setNumberOfLoops(-1);

// // Get properties of the player instance
// // console.log('volume: ' + whoosh.getVolume());
// // console.log('pan: ' + whoosh.getPan());
// // console.log('loops: ' + whoosh.getNumberOfLoops());

// // Seek to a specific point in seconds
// //whoosh.setCurrentTime(2.5);
 
// // Get the current playback point in seconds
// whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));
 
// // Pause the sound
// //whoosh.pause();
 
// // Stop the sound and rewind to the beginning
// whoosh.stop(() => {
//   // Note: If you want to play a sound after stopping and rewinding it,
//   // it is important to call play() in a callback.
//   whoosh.play();
// });
 
// // Release the audio player resource
// whoosh.release();

  play = () => {  
    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };
  useEffect(() => {
    // code to run on component mount
  
    
    
  }, [ary_th_alphabet])

  playARemove = () => { 
   
    //randIndex = Rand.Int(0,ary_th_alphabet.length)
    setI(i+1)
    console.log("click : ",i)
    //randIndex = Rand.Int(0,ary_th_alphabet.length-1)
    //console.log("randIndex : ",randIndex ,"----- random by 0 to ",ary_th_alphabet.length-2)
    setIndex(i)//random 0 , ary_th_alphabet.length-1
    if(ary_th_alphabet.length > 1 ){
      //console.log("wowwwwwwwwwwwwwwwwwwwwwwww")
      var them = new Sound(ary_th_alphabet[0].concat(".mp3"), Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log("path : ",Sound.MAIN_BUNDLE)
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        //console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
        play();
        // Play the sound with an onEnd callback
        // whoosh.play((success) => {
        //   if (success) {
        //     console.log('successfully finished playing');
        //   } else {
        //     console.log('playback failed due to audio decoding errors');
        //   }
        // });
      });
      setSound(them)
      //console.log("useEffectIndex : ",index)
      //console.log("lengthArray : ",ary_th_alphabet.length)
      //console.log("array : ",ary_th_alphabet[index])
      Array.RemoveIndex(ary_th_alphabet,0)
      console.log("array All : ",ary_th_alphabet)
    }
    else {
      console.log("array is empty")
    }
    

  };

  stop = () => {
    console.log("array All : ",ary_th_alphabet)
  };
  //const { fps, loop, resetAfterFinish } = this.state; 
    return (
    <>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button onPress={() => play()} title="play" />
          <Button onPress={() => playARemove()} title="Play And Remove" />
          <Button onPress={() => stop()} title="stop" />
        </View>

     </>
     );
     
 }
  
  


  export default TestSound;