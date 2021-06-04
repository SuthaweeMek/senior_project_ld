/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import ResultScene from './scene/ResultScene'
import StudentScene from './scene/StudentScene'
import StartTestScene from './scene/StartTestScene'
import StatScene from  './scene/StatScene'
import {  Route} from "react-router-native";
const RouterComponent = (props) => {
  return (
    <React.Fragment>
      <Route exact path="/" render={() => <StartTestScene handleScene={props.setScene} handleTestId={props.handleTestId} />}/>
      <Route path="/test" render={() => <StartTestScene handleScene={props.setScene} handleTestId={props.handleTestId} />} />
      <Route path="/result" component={ResultScene} />
      <Route path="/student" component={StudentScene}/>
      <Route path="/stat" component={StatScene} />
    </React.Fragment>
  );
}
export default (RouterComponent);
