'use strict';

import Immutable from 'immutable';
import * as Boards from './../modules/Boards';

export default function(redux, state){
    if (isBoardSelected(state)) {
        redux.dispatch(Boards.Actions.selectBoard('github', state.params.username, state.params.repoName));
        return redux.getState();
    }
    return {};
}

function isBoardSelected(state){
    return state.params.username && state.params.repoName;
}