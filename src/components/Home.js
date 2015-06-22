'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {Connector, connect} from 'redux/react';
import * as GitHub from './../modules/GitHub';
import Board from './Board';

function select(state) {
    return {issues: state.GitHubStore.get('issues').toJS()}
}

export default class BoardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Connector select={select}>{
                ({dispatch, issues})=> {
                    return <Board issues={issues} {...bindActionCreators(GitHub.Actions, dispatch)} />
                }
            }
            </Connector>
        );
    }
}