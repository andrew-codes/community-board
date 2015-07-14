'use strict';

import 'babel-core/polyfill';
import React from 'react';
import Root from './../containers/Root';
import Router from 'react-router';
import Routes from './../Routes';
import BrowserHistory from 'react-router/lib/BrowserHistory'
import {createStore, composeReducers} from 'redux';
import {Provider} from 'redux/react';
import * as middlewares from './../lib/middleware';
import * as stores from './../modules/stores';
const {loggerMiddleware, thunkMiddleware, promiseMiddleware} = middlewares;

export default function (el, initialState) {
	const redux = createStore(stores, initialState, ({getState, dispatch}) => [loggerMiddleware, thunkMiddleware(getState), promiseMiddleware]);
	React.render(<Root store={redux} history={new BrowserHistory()}/>, el);
}
