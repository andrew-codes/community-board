'use strict';

import React from 'react';

export default class Html extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <title ref="title">{this.props.title}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no"/>
                <meta name="HandheldFriendly" content="True"/>
            </head>
            <body dangerouslySetInnerHTML={{__html: this.props.bodyHtml}} ref="bodyEl"/>
            </html>
        );
    }
}