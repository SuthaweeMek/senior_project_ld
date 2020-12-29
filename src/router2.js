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


const Router2Component = () => {
    let history = useHistory();
    const [scene, setScene] = useState(0);
    const [testId, setTestId] = useState(0);
    return (
        <NativeRouter>
            <React.Fragment>

                {
               scene == 0 ? <Redirect to="/home"></Redirect> :
               scene == 1 ? <Redirect to="/gameFirstScene"></Redirect> : 
               scene == 2 ? <Redirect to="/gameSecondScene"></Redirect> :
               scene == 3 ? <Redirect to="/gameThirdScene"></Redirect> :
               scene == 4 ? <Redirect to="/home "></Redirect> : null
                }
                <Route exact path="/home" render={props => <HomeScene handleScene = {setScene} testId = {testId} handleTestId = {setTestId}/>}  />
                <Route path="/gameFirstScene" render={props => <GameFirstScene handleScene = {setScene} testId = {testId} />} />
                <Route path="/gameSecondScene" render={props => <GameSecondScene handleScene = {setScene} testId = {testId} />} />
                <Route path="/gameThirdScene" render={props => <GameThirdScene handleScene = {setScene} testId = {testId} />} />
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

export default Router2Component;
