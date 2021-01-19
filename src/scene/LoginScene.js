/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
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
import ButtonCurveLogin from '../component/buttonCurveLogin';
import InputBoxLogin from '../component/inputboxLogin';
import LocalStorage from '../utils/LocalStorage'
import { connect } from 'react-redux';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const LoginScene = (props) => {
  const [token, setToken] = useState('5')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onPress = () => {
    fetch('http://10.0.2.2:8000/api/token/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userid: username,
        password: password
      })
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      else throw new Error(response.status);
    })
      .then((responseJson) => {
        LocalStorage.saveData("token", JSON.stringify(responseJson))
        props.upDateScene(0)
      }).catch((error) => {
        console.log('error: ' + error);
      });
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
        <View style={styles.container2}>
          <Text style={styles.fontTopic}>เข้าสู่ระบบ</Text>
          <Text style={styles.fontInput}>ชื่อ</Text>
          <InputBoxLogin text={username} onChangeText={handleUser} placeholder="Username" />
          <Text style={styles.fontInput}>รหัสผ่าน</Text>
          <InputBoxLogin text={password} onChangeText={handlePassword} placeholder="Password" />
          <Text style={styles.fontForget} onPress={onPress}  > ลืมรหัสผ่าน?</Text>
          <View style={styles.Login}>
            <ButtonCurveLogin onPress={onPress} text="เข้าสู่ระบบ" />
          </View>
          <Text style={styles.fontRegis} onPress={onPress} > สมัครสมาชิกใหม่</Text>
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
  container2: {
    flex: 1,
    width: width / 2,
    flexDirection: 'column',
    backgroundColor: "white",
    margin: height - (height * 0.9),
    borderRadius: width / 50
    //justifyContent: 'center', 
    //alignItems: 'center'
    //flex: 1 1 auto, 
    //marginTop: 22
  },
  Login: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20
    //justifyContent: 'center', 
    //alignItems: 'center'
    //flex: 1 1 auto, 
    //marginTop: 22
  },
  fontTopic: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 50,
    margin: height - (height * 0.95)
    //justifyContent: 'center', 
    //alignItems: 'center'
    //flex: 1 1 auto, 
    //marginTop: 22
  },
  fontInput: {
    fontSize: 20,
    left: "10%"
    //justifyContent: 'center', 
    //alignItems: 'center'
    //flex: 1 1 auto, 
    //marginTop: 22
  },
  fontForget: {
    fontSize: 18,
    left: "72%"
    //justifyContent: 'center', 
    //alignItems: 'center'
    //flex: 1 1 auto, 
    //marginTop: 22
  },
  fontRegis: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 20
    //justifyContent: 'center', 
    //alignItems: 'center'
    //flex: 1 1 auto, 
    //marginTop: 22
  },
  containerStartTestInput: {
    flexDirection: 'row',
    backgroundColor: "white",
    justifyContent: 'space-around',
    //alignItems: 'center',
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
      dispatch({ type: 'EDIT_SCENE', payload: scene })
    },


  }
}

export default connect(null, mapDispatchToProps)(LoginScene);
