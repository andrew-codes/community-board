'use strict';

import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Connector} from 'redux/react';
import * as Board from './../../modules/Board';
import BoardSelector from './../BoardSelector';
import IssueBoard from './../IssueBoard';

export default class extends React.Component {
	static defaultProps = {};
	static propTypes = {};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Connector select={selectState}>
				{
					({dispatch, currentBoard})=> {
						return (
							<div>
								<header>
									<BoardSelector {...bindActionCreators(Board.Actions, dispatch)} />
								</header>
								<main>
									<IssueBoard board={currentBoard}/>
								</main>
							</div>
						)
					}
				}
			</Connector>
		);
	}
}

function selectState(state) {
	return {
		currentBoard: state.BoardStore.boards[state.BoardStore.currentBoardId]
	};
}