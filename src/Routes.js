'use strict';

import React from 'react';
import Application from './containers/Application';
import {Home} from './components/pages';
import {Router,Route} from 'react-router';

export default (
    <Route handler={Application}>
        <Route path="/" handler={Home}/>
        <Route path="/github/:username/:repoName" handler={Home}/>
    </Route>
);