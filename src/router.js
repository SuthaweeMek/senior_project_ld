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
import ThirdScene from './scene/ThirdScene'
import { Router ,Scene, Stack } from 'react-native-router-flux';

const RouterComponent = () => {

return (
        <Router >
          <Stack key="root">
            <Scene key="SecondScene" component={SecondScene} title="SecondScene" initial/>
            <Scene key="thirdscene" component={ThirdScene} title="ThirdScene" />
            <Scene key="writingscene" component={WritingScene} title="WritingScene" />
          </Stack>
        </Router>
);

}

export default RouterComponent;
