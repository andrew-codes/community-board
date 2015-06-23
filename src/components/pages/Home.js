'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {Connector, connect} from 'redux/react';
import * as GitHub from './../../modules/GitHub';
import Board from './../Board';
import AccountSources from './../AccountSources';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var mainContent = getMainContent();
        return (
            <main>
                {mainContent}
            </main>
        );
    }
}

function getMainContent() {
    if (!haveAccountSources()) {
        return (
            <AccountSources />
        );
    }
    return (
        <Connector select={stateSelect}>{
            ({dispatch, issues})=> {
                return (
                    <Board issues={issues} {...bindActionCreators(GitHub.Actions, dispatch)} />
                );
            }
        }
        </Connector>
    );
}

function haveAccountSources() {
    return false;
}

function stateSelect(state) {
    return {issues: state.GitHubStore.get('issues')}
}

function notLoggedInStateSelect(state){
    return {
        supportedAccountSources: ['GitHub']
    }
}