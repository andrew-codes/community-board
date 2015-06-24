'use strict';

import ajax from 'axios';
import moment from 'moment';
import _ from 'lodash';
import {camelCase} from './../../lib/utils/dataTransforms';

const apiRoot = 'http://api.github.com';

export function getIssues(username, repoName) {
    return ajax.get(`${apiRoot}/repos/${username}/${repoName}/issues`)
        .then(result=>result.data)
        .then(transformToGitHubData);
}

function transformToGitHubData(gitHubIssues) {
    var issues = gitHubIssues.map(issue=> {
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
    });
    var users = _.chain(gitHubIssues.map(issue=> {
        var output = [
            {
                id: issue.user.id,
                avatarUrl: issue.user.avatar_url,
                gravatarId: issue.user.gravatar_id,
                login: issue.user.login,
                url: issue.user.url
            }];
        if (issue.assignee) {
            output.push({
                id: issue.assignee.id,
                avatarUrl: issue.assignee.avatar_url,
                gravatarId: issue.assignee.gravatar_id,
                login: issue.assignee.login,
                url: issue.assignee.url
            });
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
            return {
                id: issue.milestone.id,
                url: issue.milestone.url,
                displayId: issue.milestone.number,
                state: issue.milestone.state,
                title: issue.milestone.title,
                description: issue.milestone.description
            };
        }
    ))
        .filter(milestone=> {
            return milestone !== null;
        })
        .unique()
        .value();
    return {issues, users, milestones};
}