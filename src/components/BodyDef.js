import React from 'react'
import BaseDef from './BaseDef'
import PropTypes from 'prop-types'
import FixtureDef from './FixtureDef'

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
		type: Box2D.Dynamics.b2Body.b2_dynamicBody,
	};

	constructor(props) {
		super(props);
		this.bodyDef = new Box2D.Dynamics.b2BodyDef();
		this.bodyDef.type = this.props.type;
		this.bodyDef.position.Set(this.props.position.x, this.props.position.y);
		this.bodyDef.userData = this.props.userData;
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