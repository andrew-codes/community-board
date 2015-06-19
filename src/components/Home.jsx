'use strict';

import React from 'react';
import Login from './Login';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <Login />
            </div>
        );
    }
}