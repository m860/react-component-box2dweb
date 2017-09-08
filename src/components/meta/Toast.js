import React from "react";
import BaseComponent from "../BaseComponent.js";
import PropTypes from "prop-types";
import classnames from 'classnames'
import {ToastMessageType} from '../../types'

/**
 * Toast
 * */
export default class Toast extends BaseComponent {
	static propTypes = {
		style: PropTypes.object,
		className: PropTypes.string,
		timeout: PropTypes.number,
		renderMessage: PropTypes.func,
		messages: PropTypes.arrayOf(PropTypes.shape({
			type: PropTypes.oneOf(['error', 'warn', 'info']),
			message: PropTypes.string
		}))
	};
	static defaultProps = {
		timeout: 2.5 * 1000,
		renderMessage: message=>message.message,
		messages: []
	};


	constructor(props) {
		super(props);
		this._timer = null;
		this.state = {
			messages: props.messages
		};
	}

	pushMessage(message: ToastMessageType): void {
		this.updateState({
			messages: {$push: [message]}
		});
	}

	next() {
		const len = this.state.messages.length;
		if (len > 0) {
			if (this._timer) {
				clearTimeout(this._timer);
			}
			this._timer = setTimeout(()=> {
				this.updateState({
					messages: {$splice: [[0, 1]]}
				})
				//this.props.dispatch(popMessage());
			}, this.props.timeout);
		}
	}

	render() {
		let message: ToastMessageType;
		if (this.state.messages.length > 0) {
			message = this.state.messages[0];
		}
		if (message) {
			return (
				<div className={classnames('toast',this.props.className)} style={this.props.style}>
					<div className={classnames('toast-wrapper',`toast-message-${message.type}`)}>
						{this.props.renderMessage(message)}
					</div>
				</div>
			);
		}
		return null;
	}

	componentDidMount() {
		super.componentDidMount();
		this.next();
	}

	componentDidUpdate() {
		this.next();
	}

}
