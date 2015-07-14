'use strict';

import {createActions} from './../../lib/utils/redux';
import ajax from 'axios';
import uniqueId from 'uniqueid';

const apiRoot = '/api';

const Actions = createActions({
    loadBoard: function (accountType, username, repoName) {
        var boardId = createBoardId(accountType, username, repoName);
        return ajax.get(`${apiRoot}/issues/${boardId}`)
            .then(results=>Object.assign({}, results.data, {boardId}));
    },
    selectBoard: function (accountType, username, repoName) {
        var boardId = createBoardId(accountType, username, repoName);
        return {boardId};
    }
});
export default Actions;

function createBoardId(accountType, username, repoName) {
    return `${accountType}/${username}/${repoName}`;
}
