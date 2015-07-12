'use strict';

import React, {PropTypes} from 'react';
import Router from 'react-router';

export default class Application extends React.Component {
	constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}