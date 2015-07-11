'use strict';

import {createActions} from './../../lib/utils/redux';
import * as GitHub from './../GitHub';
import uniqueId from 'uniqueid';


const Actions = createActions({
    loadBoard: function (accountType, username, repoName) {
        var boardId = createBoardId(accountType, username, repoName);
        return GitHub.Api.getIssues(username, repoName)
            .then(data=> {
                return Object.assign({}, data,{boardId});
            });
    }
});
export default Actions;

function createBoardId(accountType, username, repoName) {
    return `${accountType}/${username}/${repoName}`;
}