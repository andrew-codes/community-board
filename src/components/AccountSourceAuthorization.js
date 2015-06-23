'use strict';

import React from 'react';
import Icon from './Icon';

export default class extends React.Component {
    static defaultProps = {
        accountTypeName: ''
    };

    constructor(props) {
        super(props);
    }

    render() {
        var {
            accountTypeName,
            initiateAccountAuthorization
            } = this.props;
        return (
            <div>
                <button onClick={initiateAccountAuthorization}><Icon
                    name={accountTypeName}/> {accountTypeName}</button>
            </div>
        );
    }
}