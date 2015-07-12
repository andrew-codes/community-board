'use strict';

import React, { PropTypes } from 'react';

export default function hydrateRoute(fn) {
	return DecoratedComponent =>
		class HydrateRouteDecorator extends React.Component {
			static hydrateRoute = fn;

			static contextTypes = {
				redux: PropTypes.object.isRequired
			};
			static propTypes = {
				params: PropTypes.object.isRequired,
				location: PropTypes.object.isRequired
			};

			render() {
				return (
					<DecoratedComponent {...this.props} />
				);
			}
		};
}