'use strict';

import React from 'react';

export default class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Oops...</h1>

                <p>How embarrassing! Um, this is not the page you are looking for...</p>
            </div>
        );
    }
}