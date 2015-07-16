'use strict';

import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as BoardActions from './../../modules/Boards/Actions';
import BoardSelector from './../BoardSelector';

@connect(state => ({})) class Home extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		var {
			dispatch
			} = this.props;
        var boardActions = bindActionCreators(BoardActions, dispatch);
		return (
			<main>
				<h1>Community Board</h1>

				<p>Community board is a kanban style board powered by GitHub Issues.</p>

				<h2>View a GitHub Issue Board</h2>
				<BoardSelector loadBoard={boardActions.loadBoard} />
			</main>
		);
	}
}
export default Home;
