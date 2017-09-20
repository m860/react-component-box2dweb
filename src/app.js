import React, {PropTypes, PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory, IndexRoute, Link} from "react-router";

const routes = [{
	path: 'hello',
	component: require('./pages/Hello.js').default,
	name: 'hello'
}, {
	path: "camera",
	component: require('./pages/Camera').default,
	name: 'camera'
}, {
	path: "contactfilter",
	component: require('./pages/ContactFilter').default,
	name: 'contact filter'
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
				name: route.indexRoute.name,
				url: path
			});
		}
		if (route.childRoutes) {
			route.childRoutes.forEach(r=>displayRoute(r, path))
		}
		if (route.name) {
			paths.push({
				name: route.name,
				url: path
			});
		}
	}

	routes.forEach(r=>displayRoute(r));
	return paths;
}

const paths = getDefinedPaths();

class Index extends PureComponent {
	render() {
		return (
			<ol>
				{paths.map((p, index)=> {
					return (
						<li key={index}>
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