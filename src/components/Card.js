'use strict';

import React, {PropTypes} from 'react';
import {contrastingTextColor} from './../lib/Styling';

export default class extends React.Component {
	static defaultProps = {};
	static propTypes = {};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		var {
			title,
			displayId
			} = this.props;
		var styles = getStyles.call(this);
		return (
			<section style={styles.root}>
				<header style={styles.header}>
					<span style={styles.displayId}>{displayId}</span>
				</header>
				<div style={styles.body}>
					<h4 style={styles.title}>{title}</h4>
				</div>
			</section>
		);
	}
}

function getStyles() {
	const headerBackgroundColor = '#357';
	return {
		root: {
			flex: '0 0 auto',
			background: '#fff',
			border: '1px solid #aaa',
			boxShadow: '0 0 0.25rem 0 rgba(75,75,75,0.75)',
			margin: '7px 0'
		},
		header: {
			background: headerBackgroundColor,
			padding: '3px 7px'
		},
		displayId: {
			color: contrastingTextColor(headerBackgroundColor)
		},
		title: {
			margin: 0,
			padding: 0,
			fontWeight: 'normal'
		},
		body: {
			padding: 7,
			minHeight: 45
		}
	};
}