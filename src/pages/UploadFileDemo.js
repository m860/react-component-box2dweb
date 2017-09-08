/**
 * Created by jean.h.ma on 2/6/17.
 */
import React from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNavigation";
import {Link} from "react-router";
import UploadFile from '../components/meta/UploadFile'

export default class UploadFileDemo extends BasePage {
	render() {
		return (
			<LayoutWithNav>
				<h5>Simple Upload File</h5>
				<UploadFile onChange={(changedFiles,files)=>{
					console.log('change file',changedFiles);
					console.log('files',files)
				}}/>
			</LayoutWithNav>
		);
	}
}
