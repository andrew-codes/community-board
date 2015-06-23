'use strict';

import {default as Immutable, Map, List} from 'immutable';
import {createStore, getActionIds} from './../../lib/utils/redux';
import Actions from './Actions';

const initialState = Map({
    authorizationState: 'hello world',
    issues: List()
});
const actions = getActionIds(Actions);

export default createStore(initialState, {
    [actions.loadIssues]: (state, action) => {
        return state.withMutations(s =>
                s.set('isLoaded', true)
                    .set('issues', Immutable.fromJS(action.issues))
        );
    }
});