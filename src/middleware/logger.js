'use strict';

export default function(next) {
    return (action) => {
        console.log(action);
        next(action);
    };
};