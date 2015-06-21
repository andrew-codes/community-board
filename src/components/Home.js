'use strict';

import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <Link to="/about">About</Link>
            </div>
        );
    }
}