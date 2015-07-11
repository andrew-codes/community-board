'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {Connector} from 'redux/react';
import * as Board from './../../modules/Board';
import BoardSelector from './../BoardSelector';

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Connector>
				{
					({dispatch})=> {
						return (
							<main>
								<h1>Community Board</h1>

								<p>Community board is a kanban style board powered by GitHub Issues.</p>
								<h2>View a GitHub Issue Board</h2>
								<BoardSelector {...bindActionCreators(Board.Actions, dispatch)} />
							</main>
						)
					}
				}
			</Connector>
		);
	}
}