'use strict';

'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {Connector, connect} from 'redux/react';
import AccountSourceAuthorization from './AccountSourceAuthorization';
import * as GitHub from './../modules/GitHub';

var sources = [
    {
        name: 'GitHub',
        actions: GitHub.Actions
    }
];

export default class extends React.Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Connector>
                {({dispatch})=>
                    <div>
                        <h1>Connect an Account Source</h1>
                        <ul className="account-sources">
                            {sources.map((account, index)=> {
                                return <li key={index}><AccountSourceAuthorization
                                    accountTypeName={account.name} {...bindActionCreators(account.actions, dispatch)} />
                                </li>
                            })}
                        </ul>
                    </div>
                }
            </Connector>
        );
    }
}