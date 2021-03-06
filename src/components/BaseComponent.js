import React,{PureComponent} from 'react';
import update from 'immutability-helper'

export default class BaseComponent extends PureComponent{
	constructor(props){
		super(props);
		this._mounted=false;
	}
	componentDidMount(){
		// console.log(this.constructor.name)
		this._mounted=true;
	}
	componentWillUnmount(){
		this._mounted=false;
	}
	setState2(state:Object,callback:?Function):void{
		if(this._mounted){
			this.setState(state,callback);
		}
	}
	updateState(state:Object,callback:?Function):void{
		const newState=update(this.state,state);
		this.setState2(newState,callback);
	}
}