'use strict';

import {createActions} from './../../lib/utils/redux';
import uniqueId from 'uniqueid';


const Actions = createActions({
    addBoard: function(accountType, username, repoName){
        return dispatch =>{
            var boardId = `${accountType}/${username}/${repoName}`;
            var issues = [{
                name: "Fake issue"
            }];
            dispatch(Actions.selectBoard(boardId));
            dispatch(Actions.addIssues(issues));
        };
    },
    selectBoard: function(boardId){
        return {boardId};
    },
    addIssues: function(issues){
        return {issues};
    }
});
export default Actions;