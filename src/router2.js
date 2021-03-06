/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";

import WritingScene from './scene/WritingScene'
import HomeScene from './scene/HomeScene'
import GameFirstScene from './scene/GameFirstScene';
import GameSecondScene from './scene/GameSecondScene';
import GameThirdScene from './scene/GameThirdScene';
import LoginScene from './scene/LoginScene'
import RegistScene from './scene/RegistScene'
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
import LocalStorage from './utils/LocalStorage'
import { connect } from 'react-redux';

const Router2Component = (props) => {
    //console.log(props.scene)
    let history = useHistory();

    return (
        <NativeRouter>
            <React.Fragment>

                {
                    props.scene == -1 ? <Redirect to="login"></Redirect> :
                        props.scene == 0 ? <Redirect to="/home"></Redirect> :
                            props.scene == 1 ? <Redirect to="/gameFirstScene"></Redirect> :
                                props.scene == 2 ? <Redirect to="/gameSecondScene"></Redirect> :
                                    props.scene == 3 ? <Redirect to="/gameThirdScene"></Redirect> :
                                        props.scene == 4 ? <Redirect to="/home "></Redirect> :
                                            props.scene == 5 ? <Redirect to="/registScene"></Redirect> : null
                }
                <Route exact path="/home" render={props => <HomeScene />} />
                <Route path="/login" render={props => <LoginScene />} />
                <Route path="/gameFirstScene" render={props => <GameFirstScene />} />
                <Route path="/gameSecondScene" render={props => <GameSecondScene />} />
                <Route path="/gameThirdScene" render={props => <GameThirdScene />} />
                <Route path="/registScene" render={props => <RegistScene />} />
            </React.Fragment>
        </NativeRouter>

    );


}

const mapStateToProps = state => {
    return {
        text: state.global,
        scene: state.scene
    }
}


const mapDispatchToProps = dispatch => {
    return {
        upDateText: (text) => {
            dispatch({ type: 'EDIT_GLOBAL', payload: text })
        },
        upDateScene: (scene) => {
            dispatch({ type: 'EDIT_SCENE', payload: scene })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Router2Component);
