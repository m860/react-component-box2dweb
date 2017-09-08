/**
 * Created by jean.h.ma on 2/6/17.
 */
import React, {PureComponent} from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNavigation";
import {Link} from "react-router";
import LoadingView from '../components/LoadingView'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class LoadingViewContent extends PureComponent {
	static contextTypes = {
		loading: PropTypes.object
	};

	render() {
		return (
			<button type="button" onClick={()=>{
				this.context.loading.show();
				setTimeout(()=>{
					this.context.loading.hide();
				},2*1000);
			}}>show loading with context</button>
		);
	}
}

export default class UploadFileDemo extends BasePage {
	static contextTypes = {
		loading: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			counter: 0
		};
	}

	render() {
		return (
			<LayoutWithNav>
				<h5>Loading View Demo</h5>
				<button
					onClick={()=>{
							this.context.loading.show();
							setTimeout(()=>{
								this.context.loading.hide();
							},2*1000);
						}}
					type="button">show global loading
				</button>
				<LoadingView visible={this.state.visible}>
					<LoadingViewContent></LoadingViewContent>
				</LoadingView>
				<LoadingView counter={this.state.counter}>
					<button type="button" onClick={()=>{
						this.updateState({
							counter:{$set:1}
						});
						setTimeout(()=>{
							this.updateState({
								counter:{$set:0}
							});
						},2*1000);
					}}>show loading with props
					</button>
				</LoadingView>
			</LayoutWithNav>
		);
	}
}
