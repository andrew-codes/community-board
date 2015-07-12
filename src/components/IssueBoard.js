'use strict';

import React from 'react';
import {Link} from 'react-router';
import BoardColumn from './BoardColumn';
import {fetchOnUpdate, hydrateRoute} from './../lib/decorators';
import * as Board from './../modules/Board';

@hydrateRoute(({redux, params, location})=> {
	return redux.dispatch(Board.Actions.loadBoard('github', params.username, params.repoName));
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
		const { issues } = this.props.currentBoard;
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
		return (
			<div>
				<h1>Board</h1>
				<ol style={styles.columns}>
					<li style={styles.column}><BoardColumn issues={issues} title="Backlog"/></li>
					<li style={styles.column}><BoardColumn issues={[]} title="Ready"/></li>
					<li style={styles.column}><BoardColumn issues={[]} title="In Progress"/></li>
					<li style={styles.column}><BoardColumn issues={[]} title="Done"/></li>
				</ol>
			</div>
		);
	}
}
export default IssueBoard;