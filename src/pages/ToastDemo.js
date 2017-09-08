/**
 * Created by jean.h.ma on 2/6/17.
 */
import React from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNavigation";
import {Link} from "react-router";
import LoadingView from '../components/LoadingView'
import {connect} from 'react-redux'
// import {pushMessage} from '../ar/toast.ar'
import PropTypes from 'prop-types'
import ToastView from '../components/ToastView'

export default class ToastDemo extends BasePage {
	static contextTypes = {
		pushMessage: PropTypes.func
	};

	render() {
		return (
			<LayoutWithNav>
				<ToastView>
					<h5>Toast Demo</h5>
					<div>
						<button
							onClick={()=>{
							this.context.pushMessage({
								type:"info",
								message:`new message : ${Math.random()}`
							})
							/*
							this.props.dispatch(pushMessage({
								type:"info",
								message:`new message : ${Math.random()}`
							}))
							*/
						}}
							type="button">show message
						</button>
					</div>
				</ToastView>
			</LayoutWithNav>
		);
	}
}
