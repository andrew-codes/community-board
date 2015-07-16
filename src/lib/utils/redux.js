'use strict';

import _ from 'underscore';
import uniqueId from 'uniqueid';

export const createActions = (actionObj) => {
    const baseId = uniqueId();
    return _.object(_.map(actionObj, (actionCreator, key) => {
        const actionId = `${baseId}-${key}`;
        const method = (...args) => {
            const result = actionCreator(...args);

            if (result instanceof Promise) {
                // Promise (async)
                return {
                    types: ['BEGIN', 'SUCCESS', 'FAILURE'].map( (state) => `${actionId}-${state}`),
                    promise: result,
                }
            } else if (typeof result === 'function') {
                // Function (async)
                return (...args) => {
                    return {
                        type: actionId,
                        ...(result(...args) || {})
                };
            }
        } else {
            // Object (sync)
            return {
                type: actionId,
                ...(result || {})
        };
    }
};
method._id = actionId;
return [key, method];
}));
};

export const getActionIds = (actionCreators) => {
    return _.mapObject(actionCreators, (value, key) => {
        return value._id;
    });
};

export const createStore = (initialState, handlers) => {
    return (state = initialState, action) => {
        return handlers[action.type] ?
            handlers[action.type](state, action) :
            state;
    };
};
