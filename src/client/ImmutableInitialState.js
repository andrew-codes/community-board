'use strict';

import Immutable from 'immutable';

export default function (state) {
    return {
        Boards: Immutable.fromJS(state.Boards)
    };
}