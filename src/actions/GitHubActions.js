'use strict';

import {createActions} from './../lib/utils/redux';

const GitHubActions = createActions({
    loadIssues: function (issues) {
        return {issues};
    },
    fetchIssuesForUser: function (userName) {
        return dispatch => {
            var issues = [{
                name: 'Fake Issue'
            }];
            dispatch(GitHubActions.loadIssues(issues));
        }
    }
});
export default GitHubActions;