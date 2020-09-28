/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';



import WritingScene from './scene/WritingScene'
import SecondScene from './scene/SecondScene'
import HomeScene from './scene/HomeScene'
import { Router ,Scene, Stack } from 'react-native-router-flux';

const RouterComponent = () => {

return (
        <Router >
          <Stack key="root">
            <Scene key="SecondScene" component={SecondScene} title="SecondScene" initial/>
            <Scene key="homescene" component={HomeScene} title="HomeScene" />
            <Scene key="writingscene" component={WritingScene} title="WritingScene" />
          </Stack>
        </Router>
);

}

export default RouterComponent;
