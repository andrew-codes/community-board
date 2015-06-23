'use strict';

import React from 'react';

export default class extends React.Component {
    static defaultProps = {
        name: ''
    };

    constructor(props) {
        super(props);
    }

    render() {
        var name = formatIconName(this.props.name);
        return (
            <span className="icon icon-{name}">{this.props.name}</span>
        );
    }
}

function formatIconName(name){
    return name.replace(/\s/g, '-').toLowerCase();
}