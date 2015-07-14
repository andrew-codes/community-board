'use strict';

import request from 'axios';
import moment from 'moment';
import _ from 'underscore';
import {getAllPagedResults} from './GitHubApiUtils';
import {clientId, clientSecret} from './../../../../../user.json';

const apiRoot = 'https://api.github.com';
const matchingUrl = '/api/issues/github';

export default function* (next) {
	if (!match(this.request)) {
		return yield next;
	}
	try {
		var urlParams = this.request.path.replace(new RegExp(`^${matchingUrl}/`), '').split('/');
		var apiResult = getAllPagedResults(request.get(`${apiRoot}/repos/${urlParams[0]}/${urlParams[1]}/issues`, {
			params: {
				state: 'all',
				client_id: clientId,
				client_secret: clientSecret
			}
		}))
			.then(transformToGitHubData);
		var content = yield apiResult;
		this.body = content;
	}
	catch (error) {
		this.throw(500, error);
	}
}

function match(request) {
	return request.path.indexOf(matchingUrl) === 0;
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
