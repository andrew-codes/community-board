'use strict';

import React from 'react';
import Router from 'react-router';
import Routes from './../Routes';
import { Provider } from 'redux/react';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var Handler = this.props.handler;
        return (
            <Provider redux={this.props.redux}>
                {() => <Handler /> }
            </Provider>
        );
    }
}