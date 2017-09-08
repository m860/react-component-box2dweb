/**
 * Created by jean.h.ma on 2/6/17.
 */
import React from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNavigation";
import {Link} from "react-router";
// import DataTable from "../components/meta/DataTable";
// import DataTable from "react-component-data-table/components/DataTable";
import {DataTable} from "react-component-data-table";


class SimpleDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[
			{name:"name1",sex:"male"},
			{name:"name2",sex:"female"}
		];
		const columns=[
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable className="pure-table pure-table-striped" columns={columns} dataSource={dataSource}></DataTable>
	}
}

class EmptyDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[];
		const columns=[
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable className="pure-table pure-table-striped" columns={columns} dataSource={dataSource}></DataTable>
	}
}

class RadioDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[
			{name:"name1",sex:"male"},
			{name:"name2",sex:"female"}
		];
		const columns=[
			{name:"",render:rowData=>{
				return <input type="radio" value={rowData['name']} name="radio-data-table"/>
			}},
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable className="pure-table pure-table-striped" columns={columns} dataSource={dataSource}></DataTable>
	}
}

class CheckboxDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[
			{name:"name1",sex:"male"},
			{name:"name2",sex:"female"}
		];
		const columns=[
			{name:"",render:rowData=>{
				return <input type="checkbox" value={rowData['name']}/>
			}},
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable className="pure-table pure-table-striped" columns={columns} dataSource={dataSource}></DataTable>
	}
}

export default class SimpleDataTable extends BasePage {
	render() {
		return (
			<LayoutWithNav>
				<h5>Simple DataTable</h5>
				<SimpleDataTableDemo/>
				<h5>Empty DataTable</h5>
				<EmptyDataTableDemo/>
				<h5>Radio DataTable</h5>
				<RadioDataTableDemo/>
				<h5>Checkbox DataTable</h5>
				<CheckboxDataTableDemo/>
			</LayoutWithNav>
		);
	}
}
