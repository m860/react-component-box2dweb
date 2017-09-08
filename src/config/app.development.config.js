import React from 'react';

export default {
	// 启动页
	index: ()=> {
		return async(location, callback)=> {
			let module = await System.import("../pages/Index");
			callback(null, module.default);
		}
	},
	// Nav 全局配置
	navOptions: {
		title: "React Practise",
		logo:(
			<div className="logo">
				<i className="fa fa-bug fa-2x"></i>
			</div>
		)
	},
	// 版本
	version: "1.1.0",
	toastTimeout: 5 * 1000,
	baseURL: 'http://39.108.11.254:8081/',
	requestTimeout: 60 * 1000,
	ackTimeout: 2 * 60 * 1000,
	// 页面transition
	// 页面transition timeout
	transitionTimeout: 0.5 * 1000,
	// transition class name,详细配置在page-transition.sass
	getTransitionName: (location)=> {
		if (location.action === "POP") {
			return "page-pop";
		}
		return "page-push";
	}
}