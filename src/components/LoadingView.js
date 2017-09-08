import React from "react";
import BaseComponent from "./BaseComponent.js";
import PropTypes from "prop-types";
import Spinner from './meta/Spinner'
import classnames from 'classnames'

export default class LoadingView extends BaseComponent {
	static propTypes = {
		style: PropTypes.object,
		className: PropTypes.any,
		isRoot: PropTypes.bool,
		counter: PropTypes.number
	};
	static defaultProps = {
		isRoot: false,
		counter: 0
	};
	static childContextTypes = {
		loading: PropTypes.shape({
			show: PropTypes.func,
			hide: PropTypes.func
		})
	};

	constructor(props) {
		super(props);
		this.state = {
			counter: props.counter
		};
	}

	getChildContext() {
		return {
			loading: {
				show: this.showLoading.bind(this),
				hide: this.hideLoading.bind(this)
			}
		};
	}

	showLoading() {
		this.updateState({
			counter: {$set: this.state.counter + 1}
		});
	}

	hideLoading() {
		let counter = this.state.counter - 1;
		if (counter < 0) {
			counter = 0;
		}
		this.updateState({
			counter: {$set: counter}
		});
	}

	render() {
		return (
			<span className={classnames(this.props.isRoot?'':'loading-view',this.props.className)}
				  style={this.props.style}>
				{this.props.children}
				{this.state.counter > 0 && <div className="loading-active">
					<Spinner></Spinner>
				</div>}
			</span>
		);
	}

	componentWillReceiveProps(nextProps) {
		this.updateState({
			counter: {$set: nextProps.counter}
		});
	}
}
