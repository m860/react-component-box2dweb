import React from 'react'
import BaseDef from './BaseDef'
import PropTypes from 'prop-types'

export default class FixtureDef extends BaseDef {
	static propTypes = {
		density: PropTypes.number,
		friction: PropTypes.number,
		restitution: PropTypes.number,
		//shape: PropTypes.object.isRequired,
		userData: PropTypes.any,
		children:PropTypes.node.isRequired
	};
	static defaultProps = {
		density: 1.0,
		friction: 0.5,
		restitution: 0.2,
	};

	constructor(props) {
		super(props);
		this.fixtureDef = new Box2D.Dynamics.b2FixtureDef();
		this.fixtureDef.userData = this.props.userData;
		this.fixtureDef.density = this.props.density;
		this.fixtureDef.restitution = this.props.restitution;
		this.fixtureDef.friction = this.props.friction;
		//this.fixtureDef.shape = this.props.shape;
		this.fixture = null;
	}

	setFixture(fixture) {
		this.fixture = fixture;
	}

	render() {
		return React.cloneElement(this.props.children,{
			ref:'shape'
		});
	}

	componentDidMount(){
		super.componentDidMount();
		this.fixtureDef.shape=this.refs['shape'].shape;
	}
}