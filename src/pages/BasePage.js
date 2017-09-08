/**
 * Created by jean.h.ma on 2/22/17.
 */
import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'

export default class BasePage extends Base {
	static childContextTypes = {
		location: PropTypes.object
	};
	getChildContext() {
		return {
			location: this.props.location
		};
	}
}