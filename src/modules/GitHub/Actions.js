'use strict';

import {createActions} from './../../lib/utils/redux';
import uniqueId from 'uniqueid';
import config from './../../../build/config';

var clientId = '09850bb56f0dd0f714b9';
var authorizationRedirectUrl = `${config.host}/callback/github`;
var scopes = 'public_repo';

const Actions = createActions({
    initiateAccountAuthorization: function () {
        var gitHubRequestState = `${clientId}+${uniqueId()}`;
        var gitHubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scopes=${scopes}&redirect_uri=${authorizationRedirectUrl}&state=${gitHubRequestState}`;
        window.location.href = gitHubUrl;
    },
    loadIssues: function (issues) {
        return {issues};
    },
    fetchIssuesForUser: function (userName) {
        return dispatch => {
            var issues = [{
                name: 'Fake Issue'
            }];
            dispatch(Actions.loadIssues(issues));
        }
    }
});
export default Actions;