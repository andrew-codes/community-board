'use strict';

import React, {PropTypes} from 'react';

export default class extends React.Component {
	static defaultProps = {};
	static propTypes = {};
	static contextTypes = {
		router: PropTypes.func.isRequired
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div>
				<input ref="username" placeholder="username"/><span>/</span><input ref="repoName"
				                                                                   placeholder="repository name"/>
				<button onClick={loadBoard.bind(this)}>
					View
				</button>
			</div>
		);
	}
}


function loadBoard() {
	var {loadBoard, selectBoard} = this.props;
	var accountType = 'github';
	var username = this.refs.username.getDOMNode().value;
	var repoName = this.refs.repoName.getDOMNode().value;
	loadBoard(accountType, username, repoName)
		.then(selectBoard.bind(this, accountType, username, repoName))
		.then(() => {
			this.context.router.transitionTo(`/${accountType}/${username}/${repoName}`);
		})
}