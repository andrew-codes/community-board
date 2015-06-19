'use strict';

import ActionConstantsFactory from './ActionConstantsFactory';
import keyMirror from 'react/lib/keyMirror';

export default actionConstants();

function actionConstants() {
    var actionKeys = keyMirror({
        signInWithGitHub: ''
    });
    return Object.freeze(ActionConstantsFactory('Security', actionKeys));
}