/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import WritingScene from './scene/WritingScene'
import HomeScene from './scene/HomeScene'
import GameFirstScene from './scene/GameFirstScene';
import GameSecondScene from './scene/GameSecondScene';
import GameThirdScene from './scene/GameThirdScene';
//import TestSprite from './scene/TestSprite'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    ImageBackground,
    Image
} from 'react-native';
import { NativeRouter, Route, Link, Redirect } from "react-router-native";

import { connect } from 'react-redux'; 

const Router2Component = (props) => {
    console.log(props.scene)
    let history = useHistory();
    const [testId, setTestId] = useState(0);
    return (    
        <NativeRouter>
            <React.Fragment>

                {
               props.scene == 0 ? <Redirect to="/home"></Redirect> :
               props.scene == 1 ? <Redirect to="/gameFirstScene"></Redirect> : 
               props.scene == 2 ? <Redirect to="/gameSecondScene"></Redirect> :
               props.scene == 3 ? <Redirect to="/gameThirdScene"></Redirect> :
               props.scene == 4 ? <Redirect to="/home "></Redirect> : null
                }
                <Route exact path="/home" render={props => <HomeScene/>}  />
                <Route path="/gameFirstScene" render={props => <GameFirstScene/>} />
                <Route path="/gameSecondScene" render={props => <GameSecondScene/>} />
                <Route path="/gameThirdScene" render={props => <GameThirdScene/>} />
            </React.Fragment>
        </NativeRouter>

    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center', 
        //alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor : "gray"
        //flex: 1 1 auto,
        //marginTop: 22
    },
    containerMenuProfile: {
        flex: 4,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    fontMenuProfile: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontMenuContent: {
        color: 'white',
        fontSize: 15,
        alignItems: 'center',
        paddingLeft: 5,
    },
    containerMenuContent: {
        marginTop: 10,
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    containerMenuContentRow: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    containerMenuFooter: {
        flex: 1,
        paddingBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    containerContent: {
        backgroundColor: "blue",
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        resizeMode: "cover",
    },
    imageProfile: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
});
const mapStateToProps = state => {
  return {
      text: state.global,
      scene: state.scene
  }
}


const mapDispatchToProps = dispatch => {
  return {
      upDateText: (text) => {
          dispatch({type: 'EDIT_GLOBAL', payload: text})
      },
      upDateScene: (scene) => {
          dispatch({type: 'EDIT_SCENE', payload: scene})
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Router2Component);
