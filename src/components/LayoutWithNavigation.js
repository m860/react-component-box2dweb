import React from "react";
import BaseComponent from "./BaseComponent.js";
import Nav from "./meta/Navigation";
import Layout from "./meta/Layout";
import PropTypes from "prop-types";
import config from "config";
import LoadingView from './LoadingView'
import {connect} from 'react-redux'

export default class LayoutWithNavigation extends BaseComponent {
	static propTypes = {
		navOptions: PropTypes.object
	};
	static defaultProps = {
		navOptions: config.navOptions
	};

	render() {
		return (
			<Layout>
				<Nav {...this.props.navOptions}/>
				<div className="wrapper">
					{this.props.children}
				</div>
			</Layout>
		);
	}
}
