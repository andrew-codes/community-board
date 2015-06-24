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
            ({dispatch, currentBoard})=> {
                if (!currentBoard) {
                    return (
                        <AccountSources sources={sources} {...bindActionCreators(Boards.Actions, dispatch)}/>
                    );
                }

                return (
                    <Board board={currentBoard} {...bindActionCreators(GitHub.Actions, dispatch)} />
                );
            }
        }
        </Connector>
    );
}

function stateSelect(state) {
    return {
        currentBoard: state.BoardStore.boards[state.BoardStore.currentBoardId]
    };
}