/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import Router2Component from './router2'
import CollectingScene from './scene/CollectingScene'


import { Provider } from 'react-redux'; // <---- 
import { createStore } from 'redux';    // <----
import Reducer from './Reducer'
const App = () => {
console.disableYellowBox = true;


  const store = createStore(Reducer);     // <----
  return (
    <Provider store={store}>
      <Router2Component />
    </Provider>
  );
}



export default (App);
