'use strict';

import React, {PropTypes} from 'react';
import {contrastingTextColor} from './../lib/Styling';
import Avatar from './Avatar';

export default class extends React.Component {
	static defaultProps = {};
	static propTypes = {};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		var {
			title,
			displayId,
			assignee
			} = this.props;
		var styles = getStyles.call(this);
		var avatar = null;
		if (assignee){
			avatar = <Avatar {...assignee} />;
		}
		return (
			<section style={styles.root}>
				<header style={styles.header}>
					<span style={styles.displayId}>{displayId}</span>
					<h4 style={styles.title}>{title}</h4>
					<span style={styles.avatar}>{avatar}</span>
				</header>
				<div style={styles.body}>
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
			position: 'relative'
		},
		displayId: {
			background: headerBackgroundColor,
			padding: '3px 7px',
			display: 'block',
			color: contrastingTextColor(headerBackgroundColor)
		},
		avatar: {
			position: 'absolute',
			top: -7,
			right: -20
		},
		title: {
			margin: 0,
			fontWeight: 'normal',
			padding: '3px 7px'
		},
		body: {
			padding: 7,
			minHeight: 45
		}
	};
}