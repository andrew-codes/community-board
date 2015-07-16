'use strict';

import {createAction} from 'redux-actions';
import ajax from 'axios';
import * as Types from './ActionTypes';

const apiRoot = '/api';

export const loadBoard = createAction(Types.LoadBoard, (accountType, username, repoName) => {
    return ajax.get(`${apiRoot}/issues/${accountType}/${username}/${repoName}`)
        .then(result=>result.data)
        .then(result=>({...result, accountType, username, repoName}));
});
