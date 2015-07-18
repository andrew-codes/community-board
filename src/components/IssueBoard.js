'use strict';

import React from 'react';
import {Link} from 'react-router';
import BoardColumn from './BoardColumn';
import {fetchOnUpdate, hydrateRoute} from './../lib/decorators';
import * as BoardActions from './../modules/Boards/Actions';
import _ from 'underscore';

@hydrateRoute(({redux, params: {username, repoName}, location})=> {
	return redux.dispatch(BoardActions.loadBoard('github', username, repoName));
})
@fetchOnUpdate(['username', 'repoName'], (params, actions) => {
	const { username, repoName } = params;
	actions.loadBoard('github', username, repoName);
}) class IssueBoard extends React.Component {
	static defaultProps = {
		currentBoard: {
			issues: []
		}
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		var { currentBoard: {issues} } = this.props;
		const styles = {
			columns: {
				display: 'flex',
				listStyle: 'none',
				margin: 0,
				padding: 0
			},
			column: {
				flex: '1',
				padding: '10px'
			}
		};
		var readyFilter = (issue)=>(issue.labels.filter(label=>label.name === 'ready').length > 0);
		var inProgressFilter = (issue)=>(issue.labels.filter(label=>label.name === 'in progress').length > 0);
		var doneFilter = (issue) =>(issue.state === 'closed');
		var backlogFilter = (issue) => (!readyFilter(issue) && !inProgressFilter(issue) && !doneFilter(issue));
		return (
			<div>
				<h1>Board</h1>
				<ol style={styles.columns}>
					<li style={styles.column}><BoardColumn issues={issues.filter(backlogFilter)} title="Backlog"/></li>
					<li style={styles.column}><BoardColumn issues={issues.filter(readyFilter)} title="Ready"/></li>
					<li style={styles.column}><BoardColumn issues={issues.filter(inProgressFilter)}
					                                       title="In Progress"/></li>
					<li style={styles.column}><BoardColumn issues={issues.filter(doneFilter)} title="Done"/></li>
				</ol>
			</div>
		);
	}
}
export default IssueBoard;
