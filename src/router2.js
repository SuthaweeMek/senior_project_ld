/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { useHistory } from "react-router-dom";
import HomeScene from './scene/HomeScene'
import GameFirstScene from './scene/GameFirstScene';
import GameSecondScene from './scene/GameSecondScene';
import GameThirdScene from './scene/GameThirdScene';
import LoginScene from './scene/LoginScene'
import RegistScene from './scene/RegistScene'
import GameTutorialScene from './scene/GameTutorialScene'
import { NativeRouter, Route, Redirect } from "react-router-native";
import { connect } from 'react-redux';

const Router2Component = (props) => {
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
                                            props.scene == 5 ? <Redirect to="/registScene"></Redirect> :
                                                props.scene == 6 ? <Redirect to="/gameTutorialScene"></Redirect> : null
                }
                <Route exact path="/home" render={props => <HomeScene />} />
                <Route path="/login" render={props => <LoginScene />} />
                <Route path="/gameFirstScene" render={props => <GameFirstScene />} />
                <Route path="/gameSecondScene" render={props => <GameSecondScene />} />
                <Route path="/gameThirdScene" render={props => <GameThirdScene />} />
                <Route path="/registScene" render={props => <RegistScene />} />
                <Route path="/gameTutorialScene" render={props => <GameTutorialScene />} />
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
