'use strict';

import React from 'react';
import Root from './../containers/Root';
import Router from 'react-router';
import Routes from './../Routes';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as stores from '../stores/index';

const redux = createRedux(stores, window.__APP_STATE__);

Router.run(Routes, Router.HistoryLocation, (Handler, state) => {
    React.render(<Root redux={redux} handler={Handler} {...state}/>, document.body);
});