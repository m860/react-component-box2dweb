import React from 'react'
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'

export default class BaseDef extends BaseComponent {
	hasValue(v) {
		if (v == null || v == undefined) {
			return false;
		}
		return true;
	}

	getRealValue(value) {
		if (value.hasOwnProperty('x') && value.hasOwnProperty('y')) {
			return new Box2D.Common.Math.b2Vec2(value.x, value.y);
		}
		return value;
	}

	shouldComponentUpdate() {
		return false;
	}
}