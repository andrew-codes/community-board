'use strict';

import React from 'react';
import Router from 'react-router';
var RouteHandler = Router.RouteHandler;

export default class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <RouteHandler />
            </div>
        );
    }
}