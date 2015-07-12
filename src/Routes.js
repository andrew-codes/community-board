'use strict';

import React from 'react';
import Application from './containers/Application';
import {Home,Board} from './components/pages';
import {Router,Route} from 'react-router';
import IssueBoard from './components/IssueBoard';

export default (
    <Route component={Application}>
        <Route path="/" component={Home}/>
        <Route path="/github" component={Board}>
            <Route path=":username/:repoName" component={IssueBoard}></Route>
        </Route>
    </Route>
);