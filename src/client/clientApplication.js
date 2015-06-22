'use strict';

import React from 'react';
import Root from './../containers/Root';
import Router from 'react-router';
import Routes from './../Routes';
import {createDispatcher, createRedux, composeStores} from 'redux'
import {Provider} from 'redux/react';
import * as stores from '../stores/index';
import * as middlewares from './../middleware';

const {loggerMiddleware, thunkMiddleware, promiseMiddleware} = middlewares;
const dispatcher = createDispatcher(
    composeStores(stores),
        getState => [promiseMiddleware, thunkMiddleware(getState), loggerMiddleware]
);
const redux = createRedux(dispatcher);

Router.run(Routes, Router.HistoryLocation, (Handler, state) => {
    React.render(<Root redux={redux} handler={Handler} {...state}/>, document.body);
});