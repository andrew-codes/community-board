'use strict';

import {createStore, getActionIds} from './../../lib/utils/redux';
import Actions from './Actions';

const initialState = {
    currentBoardId: null,
    boards: {}
};
const actions = getActionIds(Actions);

export default createStore(initialState, {
    [actions.addBoard]: (state = initialState, action) => {
        state.boards[action.boardId] = action;
        return state;
    },
    [actions.selectBoard]: (state = initialState, action) => {
        state.currentBoardId = action.boardId;
        return state;
    }
});