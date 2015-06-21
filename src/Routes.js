'use strict';

import React from 'react';
import Application from './containers/Application';
import * as components from './components';
import {Router,Route} from 'react-router';

const {
    Home,
    Login
    } = components;

export default (
    <Route handler={Application}>
        <Route path="/home" handler={Home}/>
        <Route path="/about" handler={Login}/>
    </Route>
);