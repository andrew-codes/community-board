'use strict';

import {createActions} from './../../lib/utils/redux';
import * as GitHubApi from './../GitHub/Api';
import uniqueId from 'uniqueid';


const Actions = createActions({
    addBoard: function (accountType, username, repoName) {
        var boardId = createBoardId(accountType, username, repoName);
        return GitHubApi.getIssues(username, repoName)
            .then((issues=>{
                return {accountType, repoName, boardId, issues};
            }));
    },
    selectBoard: function (accountType, username, repoName) {
        var boardId = createBoardId(accountType, username, repoName);
        return {boardId};
    }
});
export default Actions;

function createBoardId(accountType, username, repoName){
    return `${accountType}/${username}/${repoName}`;
}