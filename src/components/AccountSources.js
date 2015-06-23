'use strict';

'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {Connector, connect} from 'redux/react';
import AccountSourceAuthorization from './AccountSourceAuthorization';

export default class extends React.Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        var {
            sources,
            addBoard
            } = this.props;
        return (
            <Connector>
                {({dispatch})=>
                    <div>
                        <section>
                            <h1>View a public board<span>*</span></h1>
                            <input ref="username" placeholder="username"/><span>/</span><input ref="repoName"
                                                                                               placeholder="repository name"/>
                            <button onClick={addBoard.bind(this, 'GitHub', this.refs.username, this.refs.repoName)}>
                                View
                            </button>
                            <footer>
                                * read-only mode
                            </footer>
                        </section>
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
                    </div>
                }
            </Connector>
        );
    }
}