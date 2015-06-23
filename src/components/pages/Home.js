'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {Connector, connect} from 'redux/react';
import * as GitHub from './../../modules/GitHub';
import * as Issues from './../../modules/Boards';
import Board from './../Board';
import AccountSources from './../AccountSources';

var sources = [
    GitHub.AccountSource
];
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
    return (
        <Connector select={stateSelect}>{
            ({dispatch, issues, boardId})=> {
                if (!boardId) {
                    return (
                        <AccountSources sources={sources} {...bindActionCreators(Issues.Actions, dispatch)}/>
                    );
                }

                return (
                    <Board issues={issues} {...bindActionCreators(GitHub.Actions, dispatch)} />
                );
            }
        }
        </Connector>
    );
}

function stateSelect(state) {
    var boardId = state.Boards.get('currentBoardId');
    var issues = state.Boards.getIn(['boards', boardId, 'issues']);
    return {
        boardId,
        issues
    }
}