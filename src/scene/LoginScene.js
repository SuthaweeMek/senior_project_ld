/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  ImageBackground,
  Image,
  Alert,
  Dimensions
} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import backgroundLogin from '../resource/image/backgroundLogin.png'
import Router from '../router'
import ButtonCurve from '../component/buttonCurve';
import InputBox from '../component/inputBox';
import AsyncStorage from '@react-native-community/async-storage'

import { connect } from 'react-redux'; 

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const LoginScene = (props) => {
  const [token, setToken] = useState('5')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const saveData = async (STORAGE_KEY, value) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value)
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const readData = async () => {
    try {
      const userToken = await AsyncStorage.getItem(STORAGE_KEY)

      if (userToken !== null) {
        setToken(userToken)
        console.log('checkcheck')

      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  const onPress = () => {
    fetch('http://10.0.2.2:8000/api/token/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.detail === undefined) {
          setToken(responseJson.access)
          saveData('@token', responseJson.access)
          saveData('@refreshtoken', responseJson.refresh)
          props.upDateScene(0)
        }
        else {
          alert("Login failed")
        }

      })
      ;
  }
  const handleUser = (text) => {
    setUsername(text)
  }

  const handlePassword = (text) => {
    setPassword(text)
  }


  return (
    <NativeRouter>
      <ImageBackground source={backgroundLogin} style={styles.background}>
        <View style={styles.card}>
          <View style={{ marginBottom: 28 }}>
            <Text style={{ fontWeight: "bold", fontSize: 27 }}>เข้าสู่ระบบ</Text>
          </View>
          <View style={{ marginRight: 140, marginBottom: 7 }}>
            <Text >ชื่อ</Text>
          </View>
          <InputBox text={username} onChangeText={handleUser} placeholder="Username" />
          <View style={{ marginRight: 110, marginBottom: 7, marginTop: 7 }}>
            <Text>รหัสผ่าน</Text>
          </View>
          <InputBox text={password} onChangeText={handlePassword} placeholder="Password" />
          <Text style={{ marginLeft: 0, marginBottom: 7, marginTop: 7 }} onPress={onPress}  > ลืมรหัสผ่าน?</Text>
          <ButtonCurve onPress={onPress} text="เข้าสู่ระบบ" />
          <Text onPress={onPress} > สมัครสมาชิกใหม่</Text>
        </View>
      </ImageBackground>
    </NativeRouter>
  );

}

const styles = StyleSheet.create({
  container: {

    //flex: 1,
    //justifyContent: 'center', 
    //alignItems: 'center',
    flexDirection: 'row',
    //backgroundColor : "gray"
    //flex: 1 1 auto,
    //marginTop: 22
  },
  card: {
    fontFamily: "lucida grande",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10,
    width: width / 1.6,
    height: height / 1.8,
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: "cover",
  }
});


const mapDispatchToProps = dispatch => {
  return {
      upDateScene: (scene) => {
        dispatch({type: 'EDIT_SCENE', payload: scene})
    }


  }
}

export default connect(null, mapDispatchToProps)(LoginScene);
