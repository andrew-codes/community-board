'use strict';

import {handleActions} from 'redux-actions';
import * as ActionTypes from './ActionTypes';

const initialState = [];

export default handleActions({
    [ActionTypes.LoadBoard]: (state, action) => {
        state = state.map(board=>({...board, isSelected: false}));
        action.payload.isSelected = true;
        return [...state, action.payload];
    }
}, initialState);
