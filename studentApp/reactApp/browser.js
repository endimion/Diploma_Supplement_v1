import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import { hydrate } from 'react-dom';


// import Store from './store.js'

import Container from './src/components/container.jsx'
import TweetList from './src/components/tweetList.jsx'


import {applyMiddleware, createStore } from "redux"
import { logger } from 'redux-logger'
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import reducer from "./src/reducers/"
const middleware = applyMiddleware(thunk, logger)


// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__
console.log("preloaded");
console.log(preloadedState);
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = createStore(reducer,preloadedState,middleware)

hydrate(
//linking with redux
 <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
);

//PS: You need to create and export this "container component" in src to work ok?
