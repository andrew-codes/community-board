'use strict';

import Immutable from 'immutable';
import * as Board from './../modules/Board';
import {bindActionCreators} from 'redux';

export default function (redux, state) {
	if (isBoardSelected(state)) {
		var actions = bindActionCreators(Board.Actions, redux.dispatch);
		return actions.loadBoard('github', state.params.username, state.params.repoName)
			.then(()=>{
				return redux.getState();
			});
	}
	return Promise.resolve({});
}

function isBoardSelected(state) {
	return state.params.username && state.params.repoName;
}