'use strict';

import React, {PropTypes} from 'react';

export default class extends React.Component {
	static defaultProps = {};
	static propTypes = {};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		const {
			avatarUrl,
			htmlUrl,
			login
			} = this.props;
		const styles = getStyles.apply(this);
		return (
			<span><a href={htmlUrl} style={styles.link}><img src={avatarUrl} style={styles.img}/><span
				style={styles.login}>{login}</span></a></span>
		);
	}
}

function getStyles() {
	var dimension = 35;
	return {
		link: {
			display: 'inline-block',
			width: dimension,
			height: dimension,
			borderRadius: '50%',
			background: '#fff',
			border: '2px solid lightblue'
		},
		img: {
			width: dimension,
			height: dimension,
			borderRadius: '50%'
		},
		login: {
			display: 'none'
		}
	};
}