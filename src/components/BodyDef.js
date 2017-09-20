import React from 'react'
import BaseDef from './BaseDef'
import PropTypes from 'prop-types'
import FixtureDef from './FixtureDef'

export const BodyType = {
	dynamicBody: Box2D.Dynamics.b2Body.b2_dynamicBody,
	staticBody: Box2D.Dynamics.b2Body.b2_staticBody,
	kinematicBody: Box2D.Dynamics.b2Body.b2_kinematicBody,
};

export default class BodyDef extends BaseDef {
	static propTypes = {
		type: PropTypes.number,
		position: PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number
		}).isRequired,
		userData: PropTypes.any,
		children: function (props, propName, componentName) {
			if (!props.children) {
				return new Error('BodyDef children must not be `null`')
			}
			const typeName = props.children.constructor.name;
			if (typeName === "Object") {
				const childrenType = props.children.type;
				if (childrenType !== FixtureDef) {
					return new Error('BodyDef children must be FixtureDef');
				}
			}
			else {
				props.children.forEach(c=> {
					const itemType = c.type;
					if (itemType !== FixtureDef) {
						return new Error('BodyDef children must be FixtureDef');
					}
				})
			}
		}
	};
	static defaultProps = {
		type: Box2D.Dynamics.b2Body.b2_dynamicBody
	};

	constructor(props) {
		super(props);
		this.bodyDef = new Box2D.Dynamics.b2BodyDef();
		this.bodyDef.type = props.type;
		this.bodyDef.position = this.getRealValue(props.position);
		this.bodyDef.userData = props.userData;
		if (this.hasValue(props.active)) {
			this.bodyDef.active = this.getRealValue(props.active);
		}
		if (this.hasValue(props.allowSleep)) {
			this.bodyDef.allowSleep = this.getRealValue(props.allowSleep);
		}
		if (this.hasValue(props.angle)) {
			this.bodyDef.angle = this.getRealValue(props.angle);
		}
		if (this.hasValue(props.angularDamping)) {
			this.bodyDef.angularDamping = this.getRealValue(props.angularDamping);
		}
		if (this.hasValue(props.angularVelocity)) {
			this.bodyDef.angularVelocity = this.getRealValue(props.angularVelocity);
		}
		if (this.hasValue(props.awake)) {
			this.bodyDef.awake = this.getRealValue(props.awake);
		}
		if (this.hasValue(props.bullet)) {
			this.bodyDef.bullet = this.getRealValue(props.bullet);
		}
		if (this.hasValue(props.fixedRotation)) {
			this.bodyDef.fixedRotation = this.getRealValue(props.fixedRotation);
		}
		if (this.hasValue(props.inertiaScale)) {
			this.bodyDef.inertiaScale = this.getRealValue(props.inertiaScale);
		}
		if (this.hasValue(props.linearDamping)) {
			this.bodyDef.linearDamping = this.getRealValue(props.linearDamping);
		}
		if (this.hasValue(props.linearVelocity)) {
			this.bodyDef.linearVelocity = props.linearVelocity;
		}

		this.fixtureDefs = [];
		this.body = null;
	}

	setBody(body) {
		this.body = body;
	}

	render() {
		return (
			<span>
				{React.Children.map(this.props.children, (child, index)=> {
					return React.cloneElement(child, {
						ref: (component)=> {
							this.fixtureDefs.push(component);
						},
						key: `fixture-${index}`
					});
				})}
			</span>
		);
	}
}