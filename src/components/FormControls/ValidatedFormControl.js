'use strict';

import React from 'react';
import {Mixin} from 'formsy-react';

export default function (Component) {
	return React.createClass({
		mixins: [Mixin],
		render() {
			var errorMessage = !this.isPristine() ? this.getErrorMessage() : '';
			return (
				<Component isRequired={this.isRequired()} setValue={this.setValue} {...this.props} errorMessage={errorMessage} />
			);
		}
	});
}

