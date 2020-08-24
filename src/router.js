/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';



import writingscene from './scene/WritingScene'
import App from './App'
import { Router ,Scene, Stack } from 'react-native-router-flux';

const RouterComponent = () => {

return (
        <Router >
          <Scene key="root">
            <Scene key="WritingScene" component={writingscene} title="Register" />
          </Scene>
        </Router>
);

}

export default RouterComponent;
