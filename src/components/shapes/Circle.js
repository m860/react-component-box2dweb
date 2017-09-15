import React from 'react'
import Shape from './Shape'
import PropTypes from 'prop-types'

export default class Rect extends Shape {
	static propTypes = {
		radius: PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);
		this.shape = new Box2D.Collision.Shapes.b2CircleShape(this.props.radius);
	}
}