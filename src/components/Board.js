'use strict';

import React from 'react';
import {Link} from 'react-router';

export default class extends React.Component {
    static defaultProps = {
        board: {
            issues: []
        }
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { issues } = this.props.board;
        return (
            <div>
                <h1>Board</h1>
                {issues.map((issue, index)=> <p key={index}>{issue.get('name')}</p>)}
            </div>
        );
    }
}