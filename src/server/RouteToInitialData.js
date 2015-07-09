'use strict';

import Immutable from 'immutable';
import * as Boards from './../modules/Boards';
import {bindActionCreators} from 'redux';

export default function (redux, state) {
	if (isBoardSelected(state)) {
		var actions = bindActionCreators(Boards.Actions, redux.dispatch);
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