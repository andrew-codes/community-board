'use strict';

import actionConstants from './../constants/SecurityActions';

const actions = {
    signInWithGitHub
};

export default actions;

function signInWithGitHub() {
    console.log(actionConstants.signInWithGitHub);
}