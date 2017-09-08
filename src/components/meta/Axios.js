import React from "react";
import BaseComponent from "../BaseComponent.js";
import axios from 'axios'
import config from 'config'
import PropTypes from 'prop-types'

export default class Axios extends BaseComponent {
	static childContextTypes = {
		http: PropTypes.func
	};
	static contextTypes = {
		loading: PropTypes.object
	};

	getChildContext() {
		return {
			http: axios
		};
	}

	constructor(props) {
		super(props);
		axios.defaults.baseURL = config.baseURL;
		axios.defaults.timeout = config.requestTimeout;
		axios.interceptors.request.use((configuration)=> {
			this.context.loading.show();
			return configuration;
		}, (error)=> {
			return Promise.reject(error);
		});

		axios.interceptors.response.use((response)=> {
			this.context.loading.hide();
			return response;
		}, (error)=> {
			this.context.loading.hide();
			return Promise.reject(error);
		});
	}

	render() {
		return this.props.children;
	}
}