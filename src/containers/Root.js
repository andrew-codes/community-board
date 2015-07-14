'use strict';

import React, {PropTypes} from 'react';
import Router from 'react-router';
import Routes from './../Routes';
import { Provider } from 'redux/react';

export default class Root extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		var {
			store
			} = this.props;
		return (
			<Provider store={store}>
				{getRoutes.bind(null, this.props.history, this.props.routerState)}
			</Provider>
		);
	}
}

function getRoutes(history, routerState) {
	return (
		<Router history={history} {...routerState}>
			{Routes}
		</Router>
	);
}
