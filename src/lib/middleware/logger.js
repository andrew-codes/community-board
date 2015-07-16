'use strict';

export default function ({dispatch, getState}) {
    return next => action => {
        console.log(action);
        return next(action);
    };
};
