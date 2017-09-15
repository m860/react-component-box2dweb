import React from 'react'
import Shape from './Shape'
import PropTypes from 'prop-types'

export default class Polygon extends Shape {
	static propTypes = {
		vertices: PropTypes.arrayOf(PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number
		})).isRequired
	};

	constructor(props) {
		super(props);
		this.shape = new Box2D.Collision.Shapes.b2PolygonShape();
		this.shape.SetAsArray(this.props.vertices.map(v=> {
			return new Box2D.Common.Math.b2Vec2(v.x, v.y);
		}), this.props.vertices.length);
	}
}