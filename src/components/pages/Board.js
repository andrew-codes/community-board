'use strict';

import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'redux/react';
import * as Board from './../../modules/Board';
import BoardSelector from './../BoardSelector';

@connect(state => ({
	currentBoard: state.BoardStore.boards[state.BoardStore.currentBoardId]
})) class ViewBoard extends React.Component {
	static defaultProps = {};
	static propTypes = {};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		const {
			dispatch
			} = this.props;
		const boardActions = bindActionCreators(Board.Actions, dispatch);
		return (
			<div>
				<header>
					<BoardSelector loadBoard={boardActions.loadBoard} />
				</header>
				<main>
					{this.props.children &&
					React.cloneElement(this.props.children, {actions: boardActions, ...this.props })}
				</main>
			</div>
		);
	}
}
export default ViewBoard;