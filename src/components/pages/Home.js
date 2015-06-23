'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {Connector, connect} from 'redux/react';
import * as GitHub from './../../modules/GitHub';
import * as Boards from './../../modules/Boards';
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
        var mainContent = getMainContent.call(this);
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
            ({dispatch, issues, BoardStore})=> {
                if (!BoardStore.currentBoardId) {
                    return (
                        <AccountSources sources={sources} {...bindActionCreators(Boards.Actions, dispatch)}/>
                    );
                }

                return (
                    <Board issues={BoardStore.boards[BoardStore.currentBoardId]} {...bindActionCreators(GitHub.Actions, dispatch)} />
                );
            }
        }
        </Connector>
    );
}

function stateSelect(state) {
    return state;
}