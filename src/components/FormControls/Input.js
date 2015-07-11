'use strict';

import React, {PropTypes} from 'react';
import ValidatedFormControl from './ValidatedFormControl';

class Input extends React.Component {
	static defaultProps = {};
	static propTypes = {};

	constructor(props, context) {
		super(props, context);
		this.state = {value: ''};
	}

	render() {
		var {
			errorMessage,
			placeholder,
			defaultValue,
			className,
			isRequired,
			isInline
			} = this.props;
		var styles = {
			root: {
				display: isInline ? 'inline-block' : 'block'
			}
		};
		return (
			<div className={className} style={styles.root}>
				<input type="text" defaultValue={defaultValue} placeholder={placeholder}
				       onChange={changeValue.bind(this)}
				       value={this.state.value}/> <span>{errorMessage}</span>
			</div>
		);
	}
}
function changeValue(e) {
	var value = e.currentTarget.value;
	this.setState({value});
	this.props.setValue(value);
}

export default ValidatedFormControl(Input);