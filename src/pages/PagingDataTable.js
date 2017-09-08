/**
 * Created by jean.h.ma on 2/6/17.
 */
import React from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNavigation";
import {DataTableWithPagination} from "react-component-data-table";

export default class PagingDataTable extends BasePage {
	constructor(props) {
		super(props);
		this.dataSource = [
			{name: "Jean", sex: "male"},
			{name: "Jean2", sex: "male"},
			{name: "Jean3", sex: "male"},
			{name: "Jean4", sex: "male"},
			{name: "Jean5", sex: "male"},
			{name: "Jean6", sex: "male"},
			{name: "Jean7", sex: "male"},
			{name: "Jean8", sex: "male"},
			{name: "Jean9", sex: "male"},
			{name: "Jean10", sex: "male"},
			{name: "Jean11", sex: "male"},
			{name: "Jean12", sex: "male"},
		];
		this.dataTableColumns = [{
			name: "Name",
			render: (rowData)=>rowData['name']
		}, {
			name: "Sex",
			render: (rowData)=>rowData['sex']
		}];
		this.state={
			dataSource:[],
			pageSize:5,
			pageIndex:0,
			startPageNumber:0
		};
	}

	render() {
		return (
			<LayoutWithNav>
				<h5>Paging DataTable</h5>
				<DataTableWithPagination
					dataTableClassName="pure-table pure-table-striped"
					onPageChange={filter=>{
						this.updateState({
							dataSource:{$set:this.dataSource.slice(filter.pageIndex*filter.pageSize,filter.pageIndex*filter.pageSize+filter.pageSize)}
						});
					}}
					total={this.dataSource.length}
					pageSize={this.state.pageSize}
					pageIndex={this.state.pageIndex}
					startPageNumber={this.state.startPageNumber}
					dataSource={this.state.dataSource}
					columns={this.dataTableColumns}/>
			</LayoutWithNav>
		);
	}

	componentDidMount(){
		super.componentDidMount();
		this.updateState({
			dataSource:{$set:this.dataSource.slice(this.state.pageIndex*this.state.pageSize,this.state.pageIndex*this.state.pageSize+this.state.pageSize)}
		});
	}
}
