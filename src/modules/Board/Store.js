'use strict';

import {createStore, getActionIds} from './../../lib/utils/redux';
import Actions from './Actions';

const initialState = {
    currentBoardDoesNotExists: false,
    currentBoardId: null,
    boards: {}
};
const actions = getActionIds(Actions);

export default createStore(initialState, {
    [`${actions.loadBoard}-SUCCESS`]: (state = initialState, action) => {
        state.boards[action.result.boardId] = action.result;
        state.currentBoardId = action.result.boardId;
        return state;
    },
    [actions.selectBoard]: (state = initialState, action) => {
        state.currentBoardId = action.boardId;
        return state;
    }
});