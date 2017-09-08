import React, {PropTypes, PureComponent} from 'react'
import ReactDOM from 'react-dom'
import TestComponent from './components/TestComponent'
import {Router, Route, hashHistory, IndexRoute, Link} from "react-router";

const routes = [{
	path:'hello',
	component:require('./pages/Hello.js').default,
	name:'hello'
}];

function getDefinedPaths() {
	let paths = [];

	function displayRoute(route, parentPath) {
		let path = `/${route.path}`;
		if (parentPath) {
			path = parentPath + path;
		}
		if (route.indexRoute) {
			paths.push({
				name:route.indexRoute.name,
				url:path
			});
		}
		if (route.childRoutes) {
			route.childRoutes.forEach(r=>displayRoute(r, path))
		}
		if (route.name) {
			paths.push({
				name:route.name,
				url:path
			});
		}
	}

	routes.forEach(r=>displayRoute(r));
	return paths;
}

const paths=getDefinedPaths();

class Index extends PureComponent {
	render() {
		return (
			<ol>
				{paths.map((p,index)=>{
					return (
						<li>
							<Link to={p.url}>{p.name}</Link>
						</li>
					);
				})}

			</ol>
		);
	}
}

class App extends PureComponent {
	render() {
		return this.props.children
	}
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/"
			   childRoutes={routes}
			   component={App}>
			<IndexRoute component={Index}></IndexRoute>
		</Route>
	</Router>
	, document.getElementById("view"));