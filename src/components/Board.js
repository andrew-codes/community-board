'use strict';

import React from 'react';
import {Link} from 'react-router';

export default class extends React.Component {
    static defaultProps = {
        issues: []
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { fetchIssuesForUser, issues } = this.props;
        return (
            <div>
                <h1 onClick={fetchIssuesForUser.bind(this, 'username')}>Board</h1>
                {issues.map((issue, index)=> <p key={index}>{issue.name}</p>)}
            </div>
        );
    }
}