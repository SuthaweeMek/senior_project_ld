/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import Router2Component from './router2'


import { Provider } from 'react-redux'; // <---- 
import { createStore } from 'redux';    // <----
import Reducer from './Reducer'
const App = () => {



  const store = createStore(Reducer);     // <----
  return (
    <Provider store={store}>
      <Router2Component />
    </Provider>
  );
}



export default (App);
