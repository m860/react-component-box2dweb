/**
 * Created by jean.h.ma on 2/6/17.
 */
import React from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNavigation";
import {Link} from "react-router";
import UploadFile from '../components/meta/UploadFile'
import PropTypes from 'prop-types'

export default class HttpDemo extends BasePage {
	static contextTypes = {
		http: PropTypes.func
	};

	constructor(props){
		super(props);
		this.state={
			done:false
		};
	}

	render() {
		return (
			<LayoutWithNav>
				<h5>Http Demo</h5>
				<button type="button" onClick={()=>{
					const fetchBaidu=async ()=>{
						const res= await this.context.http.get('http://39.108.11.254:8081/config');
						this.updateState({
							done:{$set:true}
						})
					}
					fetchBaidu();
				}}>fetch json
				</button>
				{this.state.done && <span>fetch complete</span>}
			</LayoutWithNav>
		);
	}
}
