'use strict';

import {default as Immutable} from 'immutable';
import {createStore, getActionIds} from './../../lib/utils/redux';
import Actions from './Actions';

const initialState = Immutable.fromJS({
    currentBoardId: null,
    boards: {}
});
const actions = getActionIds(Actions);

export default createStore(initialState, {
    [actions.addIssues]: (state, action) => {
        var boardId = state.get('currentBoardId');
        if (!boardId){
            throw new Error('A board has been selected. Cannot add issues without a currently selected board');
        }
        return state.withMutations(s =>
                s.updateIn(['boards', boardId, 'issues'], ()=>action.issues)
        );
    },
    [actions.selectBoard]: (state, action) => {
        return state.withMutations(s =>
                s.set('currentBoardId', action.boardId)
        );
    }
});