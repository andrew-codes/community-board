'use strict';

import 'babel-core/polyfill';
import React from 'react';
import Root from './../containers/Root';
import Router from 'react-router';
import Routes from './../Routes';
import BrowserHistory from 'react-router/lib/BrowserHistory'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as middlewares from './../lib/middleware';
import * as reducers from './../modules/reducers';
const {loggerMiddleware, promiseMiddleware} = middlewares;
import thunkMiddleware from 'redux-thunk';

export default function (el, initialState) {
    const reducer = combineReducers(reducers);
    const createStoreWithMiddleware = applyMiddleware(loggerMiddleware, thunkMiddleware, promiseMiddleware)(createStore);
    const store = createStoreWithMiddleware(reducer, initialState);
	React.render(<Root store={store} history={new BrowserHistory()}/>, el);
}
