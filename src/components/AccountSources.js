'use strict';

'use strict';

import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Connector, connect} from 'redux/react';
import AccountSourceAuthorization from './AccountSourceAuthorization';

export default class extends React.Component {
    static defaultProps = {};
    static contextTypes = {
        router: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        var {
            sources
            } = this.props;
        return (
            <div>
                <section>
                    <h1>View a public board<span>*</span></h1>
                    <input ref="username" placeholder="username"/><span>/</span><input ref="repoName"
                                                                                       placeholder="repository name"/>
                    <button onClick={addBoard.bind(this)}>
                        View
                    </button>
                    <footer>
                        * read-only mode
                    </footer>
                </section>
                <Connector>
                    {({dispatch})=>
                        <section>
                            <h1>Connect an Account Source</h1>
                            <ul className="account-sources">
                                {sources.map((account, index)=> {
                                    return <li key={index}><AccountSourceAuthorization
                                        accountTypeName={account.name} {...bindActionCreators(account.actions, dispatch)} />
                                    </li>
                                })}
                            </ul>
                        </section>
                    }
                </Connector>
            </div>
        );
    }
}

function addBoard() {
    var {addBoard, selectBoard} = this.props;
    var accountType = 'github';
    var username = this.refs.username.getDOMNode().value;
    var repoName = this.refs.repoName.getDOMNode().value;
    addBoard(accountType, username, repoName)
        .then(selectBoard.bind(this, accountType, username, repoName))
        .then(() => {
            this.context.router.transitionTo(`/${accountType}/${username}/${repoName}`);
        })
}