'use strict';

export default function thunk(getState) {
    return (next) => {
        const recurse = (action) => {
            if (typeof action === 'function') {
                var result = action(recurse, getState);
                if (result.promise instanceof Promise) {
                    const [REQUEST, SUCCESS, FAILURE] = result.types;
                    var {...rest} = result;
                    next({...rest, type: REQUEST});
                    return result.promise.then(
                        (result) => next({...rest, result, type: SUCCESS}),
                        (error) => next({...rest, error, type: FAILURE})
                    );
                }
            }
            next(action);
        };
        return recurse;
    };
}