'use strict';

export default function (actionNamespace, actionObject) {
    Object.keys(actionObject)
        .forEach(actionKey => {
            return actionObject[actionKey] = `${actionNamespace}.${actionKey}`;
        });
    return actionObject;
}