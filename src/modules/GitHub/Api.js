'use strict';

import ajax from 'axios';
import moment from 'moment';
import _ from 'lodash';
import {camelCase} from './../../lib/utils/dataTransforms';

const apiRoot = 'https://api.github.com';

export function getIssues(username, repoName) {
    return ajax.get(`${apiRoot}/repos/${username}/${repoName}/issues`)
        .then(result=>result.data)
        .then(transformToGitHubData);
}

function transformToGitHubData(gitHubIssues) {
    var issues = gitHubIssues.map(transformIssue);
    var users = _.chain(gitHubIssues.map(issue=> {
        var output = [transformUser(issue.user)];
        if (issue.assignee) {
            output.push(transformUser(issue.assignee));
        }
        return output;
    }))
        .flatten()
        .unique()
        .value();

    var milestones = _.chain(gitHubIssues.map(issue=> {
            if (!issue.milestone) {
                return null;
            }
            return transformMilestone(issue.milestone);
        }
    ))
        .filter(milestone=> {
            return milestone !== null;
        })
        .unique()
        .value();
    return {issues, users, milestones};
}

function transformIssue(issue) {
    return {
        id: issue.id,
        displayId: issue.number,
        url: issue.url,
        title: issue.title,
        description: issue.body,
        state: issue.state,
        labels: issue.labels,
        comments: issue.comments,
        closedAt: moment(issue.closed_at),
        assignee: issue.assignee ? {
            id: issue.assignee.id
        } : null,
        milestone: issue.milestone ? {
            id: issue.milestone.id
        } : null
    };
}

function transformUser(user) {
    return {
        id: user.id,
        avatarUrl: user.avatar_url,
        gravatarId: user.gravatar_id,
        login: user.login,
        url: user.url
    };
}

function transformMilestone(milestone) {
    return {
        id: milestone.id,
        url: milestone.url,
        displayId: milestone.number,
        state: milestone.state,
        title: milestone.title,
        description: milestone.description
    };
}