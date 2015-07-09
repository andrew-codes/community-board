'use strict';

import React from 'react';
import {Link} from 'react-router';
import BoardColumn from './BoardColumn';

export default class extends React.Component {
	static defaultProps = {
		board: {
			issues: []
		}
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { issues } = this.props.board;
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