'use strict';

import AuthorizationCallback from './AuthorizationCallback';
import StaticAssets from './StaticAssets';
import GitHubIssueApi from './api/GitHub/GitHubIssues';
import Application from './Application';

export default [
    AuthorizationCallback,
    StaticAssets,
    GitHubIssueApi,
    Application
];