'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <main>
                    <RouteHandler />
                </main>
            </div>
        );
    }
}