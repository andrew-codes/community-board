'use strict';

import promiseMiddleware from 'redux-promise';

export default function ({dispatch, getState}) {
    return promiseMiddleware;
}
