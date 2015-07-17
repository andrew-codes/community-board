'use strict';

import {createAction} from 'redux-actions';
import ajax from 'axios';
import * as Types from './ActionTypes';
import config from './../../../build/config';

const apiRoot = `http://${config.apiHost}:${config.apiPort}/api`;

export const loadBoard = createAction(Types.LoadBoard, (accountType, username, repoName) => {
    return ajax.get(`${apiRoot}/issues/${accountType}/${username}/${repoName}`, {withCredentials: false})
        .then(result=>result.data)
        .then(result=>({...result, accountType, username, repoName}));
});
