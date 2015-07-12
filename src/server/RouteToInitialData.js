'use strict';

import * as Board from './../modules/Board';
import {bindActionCreators} from 'redux';

export default function (redux, routerState) {
	if (!routerState){
		return [Promise.resolve(true)];
	}
	const { params, location } = routerState;
	return routerState.components
		.filter(component=>component.hydrateRoute)
		.map(component => {
			console.log(component);
			return component.hydrateRoute({redux, params, location})
		});
}