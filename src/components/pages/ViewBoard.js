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
						var styles = {
							error: {
								background: 'pink',
								color: 'red'
							},
							repo: {
								'fontWeight': 600
							}
						};
						var mainContent = currentBoard ?
							<IssueBoard board={currentBoard}/> :
							<p style={styles.error}>The board for the repository <span style={styles.repo}>{this.props.params.username}/{this.props.params.repoName}</span> could not load or could not be found.</p>
						return (
							<div>
								<header>
									<BoardSelector {...bindActionCreators(Board.Actions, dispatch)} />
								</header>
								<main>
									{mainContent}
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