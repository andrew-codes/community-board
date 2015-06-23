'use strict';

import {default as Immutable, Map, List} from 'immutable';
import {createStore, getActionIds} from './../../lib/utils/redux';
import Actions from './Actions';

const initialState = Map({
    authorizationState: 'hello world'
});
const actions = getActionIds(Actions);

export default createStore(initialState, {

});