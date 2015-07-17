'use strict';

import React, {PropTypes} from 'react';
import Card from './Card';

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
		var styles = getStyles.call(this);
		return (
			<div>
				<h2>{title} <small>{issues.length}</small></h2>
				<ol style={styles.list}>
					{issues.map((issue, index)=> (
						<li key={index} style={styles.listItem}>
							<Card {...issue} />
						</li>
					))}
				</ol>
			</div>
		);
	}
}

function getStyles() {
	return {
		list: {
			listStyle: 'none',
			margin: 0,
			padding: 0
		},
		listItem: {
			display: 'flex',
			flexDirection: 'column'
		}
	};
}