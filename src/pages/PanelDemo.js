/**
 * Created by jean.h.ma on 2/6/17.
 */
import React from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNavigation";
import {Link} from "react-router";
import {Panel,CollapsiblePanel} from 'react-component-panel'

export default class SimpleDataTable extends BasePage {
	constructor(props) {
		super(props);
	}

	get renderRightButton() {
		return function () {
			return (
				<div className="panel-right-button">
					<button type="button" className="pure-button pure-button-primary">button1</button>
					<button type="button" className="pure-button">button2</button>
				</div>
			);
		}
	}

	render() {
		return (
			<LayoutWithNav>
				<Panel title="Simple Panel" style={{marginTop:"10px"}}>
					<div>Hello Panel!</div>
				</Panel>
				<Panel title="Panel with button"
					   renderRight={this.renderRightButton}
					   style={{marginTop:"10px"}}>
					<div>Hello Panel!</div>
				</Panel>
				<CollapsiblePanel
					title="Panel with collapsible"
					renderRight={this.renderRightButton}
					style={{marginTop:"10px"}}>
					<div>Hello Panel!</div>
				</CollapsiblePanel>
			</LayoutWithNav>
		);
	}
}
