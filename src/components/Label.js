'use strict';

import React, {PropTypes} from 'react';
import {contrastingTextColor} from './../lib/Styling';

export default class extends React.Component {
	static defaultProps = {};
	static propTypes = {
		text: PropTypes.string.isRequired,
		color: PropTypes.string,
		style: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		const styles = getStyles.apply(this);
		return (
			<span style={styles.root}>{this.props.text}</span>
		);
	}
}

function getStyles() {
	const styles = this.props.styles;
	const backgroundColor = this.props.color || '#acacac';
	return {
		root: {
			borderRadius: 5,
			padding: '0.1em 0.25em',
			background: backgroundColor,
			color: contrastingTextColor(backgroundColor),
			...styles
		}
	};
}