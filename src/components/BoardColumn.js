'use strict';

import React, {PropTypes} from 'react';

export default class extends React.Component {
	static defaultProps = {
		title: '',
		issues: []
	};
	static propTypes = {
		title: PropTypes.string.isRequired,
		issues: PropTypes.arrayOf(PropTypes.object)
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		var {
			title,
			issues
			} = this.props;
		return (
			<div>
				<h2>{title}</h2>
				{issues.map((issue, index)=> <p key={index}>{issue.title}</p>)}
			</div>
		);
	}
}