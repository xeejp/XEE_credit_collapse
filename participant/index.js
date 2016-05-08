import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './App.js'

import reducer from './reducer'

const logger = createLogger();

let middlewares = [thunk, logger]

const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
)

var _experiment = new Experiment(_topic, _token);

_experiment.onReceiveMessage(({ action }) => {
    store.dispatch(action)
})

function sendData(action, params) {
    _experiment.send_data({ action, params });
}

window.sendData = sendData

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("content")
)
