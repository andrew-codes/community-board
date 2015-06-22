'use strict';

import {default as Immutable, Map, List} from 'immutable';
import {createStore, getActionIds} from './../lib/utils/redux';
import GitHubActions from './../actions/GitHubActions';

const initialState = Map({
    isLoaded: false,
    issues: List()
});
const actions = getActionIds(GitHubActions);
export default createStore(initialState, {
    [actions.loadIssues]: (state, action) => {
        return state.withMutations(s =>
                s.set('isLoaded', true)
                    .set('issues', Immutable.fromJS(action.issues))
        );
    }
});