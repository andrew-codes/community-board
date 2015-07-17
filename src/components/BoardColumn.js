'use strict';

import React, {PropTypes} from 'react';
import Card from './Card';
import Label from './Label';

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
		var styles = getStyles.apply(this);
		return (
			<div style={styles.root}>
				<h2 style={styles.heading}>
					<span style={styles.headingText}>{title}</span><Label text={issues.length.toString()}
					                                                      style={styles.issueCount}/>
				</h2>
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
		root: {
			padding: '0.75em'
		},
		list: {
			listStyle: 'none',
			margin: 0,
			padding: 0
		},
		listItem: {
			display: 'flex',
			flexDirection: 'column'
		},
		heading: {
			display: 'flex'
		},
		headingText: {
			flex: '1'
		},
		issueCount: {}
	};
}