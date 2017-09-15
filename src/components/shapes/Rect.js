import React from 'react'
import Shape from './Shape'
import PropTypes from 'prop-types'

export default class Rect extends Shape {
	static propTypes = {
		ww: PropTypes.number.isRequired,
		hh: PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);
		this.shape=new Box2D.Collision.Shapes.b2PolygonShape();
		this.shape.SetAsBox(this.props.ww, this.props.hh)
	}
}