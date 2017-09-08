import React from 'react'
import BasePage from './BasePage'
import LayoutWithNavigation from '../components/LayoutWithNavigation'

export default class NoMatch extends BasePage {
	render() {
		return (
			<LayoutWithNavigation>
				<div>404</div>
			</LayoutWithNavigation>
		);
	}
}

