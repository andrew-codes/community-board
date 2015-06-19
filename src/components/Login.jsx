'use strict';

import React from 'react';
import SecurityActions from './../actions/Security';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button onClick={signInWithGitHub.bind(this)}>Sign-In with GitHub</button>
            </div>
        );
    }
}

function signInWithGitHub() {
    SecurityActions.signInWithGitHub();
}