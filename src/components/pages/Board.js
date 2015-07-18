'use strict';

import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as BoardActions from './../../modules/Boards/Actions';
import BoardSelector from './../BoardSelector';
import _ from 'underscore';

@connect(state => {
    var currentBoard = _.first(state.Boards.filter(board=>board.isSelected));
    currentBoard.issues = currentBoard.issues.map(issue=> {
        if (issue.assignee) {
            issue.assignee = _.first(currentBoard.users.filter(user=>user.id ===issue.assignee.id))
        }
        return issue;
    });
    return {currentBoard};
}) class ViewBoard extends React.Component {
    static defaultProps = {};
    static propTypes = {};

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            dispatch
            } = this.props;
        const boardActions = bindActionCreators(BoardActions, dispatch);
        return (
            <div>
                <header>
                    <BoardSelector loadBoard={boardActions.loadBoard}/>
                </header>
                <main>
                    {this.props.children &&
                    React.cloneElement(this.props.children, {actions: boardActions, ...this.props })}
                </main>
            </div>
        );
    }
}
export default ViewBoard;
