import React from 'react'
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'

const debugDrawDefaultAlpha = 0.5;

export default class World extends BaseComponent {
	/**
	 * @property {Array} gravity [[0,10]] - 重力向量,数组表示一个坐标点
	 * */
	static propTypes = {
		width: PropTypes.number,
		height: PropTypes.number,
		allowSleep: PropTypes.bool,
		gravity: PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number
		}),
		debugDraw: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
		running: PropTypes.bool,
		step: PropTypes.number,
		velocityIterations: PropTypes.number,
		positionIterations: PropTypes.number,
		scale: PropTypes.number,
		style: PropTypes.object,
		className: PropTypes.string
	};
	static defaultProps = {
		width: 400,
		height: 300,
		allowSleep: true,
		gravity: {
			x: 0,
			y: 10
		},
		debugDraw: true,
		running: true,
		step: 1 / 60,
		velocityIterations: 10,
		positionIterations: 8,
		scale: 30,
		style: {}
	};

	constructor(props) {
		super(props);
		this._canvas = null;
		this._ctx = null;
		this._gravity = new Box2D.Common.Math.b2Vec2(this.props.gravity.x, this.props.gravity.y);
		this._world = new Box2D.Dynamics.b2World(this._gravity, this.props.allowSleep);
		this._bodyDefs = [];
		this._timer = null;
	}

	_createBodies() {
		this._bodyDefs.forEach(bodyDefInstance=> {
			let {bodyDef}=bodyDefInstance;
			bodyDef.position.Multiply(1 / this.props.scale);
			let body = this._world.CreateBody(bodyDef);
			bodyDefInstance.fixtureDefs.forEach(fixtureDefInstance=> {
				let {fixtureDef}=fixtureDefInstance;
				if (fixtureDef.shape.m_vertices) {
					fixtureDef.shape.m_vertices.forEach(v=> {
						v.Multiply(1 / this.props.scale);
					});
				}
				else if (fixtureDef.shape.m_radius) {
					fixtureDef.shape.SetRadius(fixtureDef.shape.m_radius / this.props.scale);
				}
				else {
					console.warn(`Not implementation`, fixtureDef.shape);
				}

				console.log(fixtureDef);
				let fixture = body.CreateFixture(fixtureDef);
				fixtureDefInstance.setFixture(fixture);
			});
			bodyDefInstance.setBody(body);
		})
	}

	_renderWorld() {
		this._world.Step(this.props.step, this.props.velocityIterations, this.props.positionIterations);
		this._world.DrawDebugData();
		this._timer = window.requestAnimationFrame(this._renderWorld.bind(this));
	}

	_stop() {
		if (this._timer) {
			window.cancelAnimationFrame(this._timer);
		}
	}

	render() {
		return (
			<div
				className={this.props.className}
				style={{width:this.props.width,height:this.props.height,...this.props.style}}>
				<canvas
					width={this.props.width}
					height={this.props.height}
					ref={component=>this._canvas=component}>
					{React.Children.map(this.props.children, (child, index)=> {
						return React.cloneElement(child, {
							key: `body-def-${index}`,
							ref: (component)=> {
								this._bodyDefs.push(component);
							}
						})
					})}
				</canvas>
			</div>
		);
	}

	componentDidMount() {
		super.componentDidMount();
		this._ctx = this._canvas.getContext("2d");
		if (this.props.debugDraw) {
			let debugDraw = new Box2D.Dynamics.b2DebugDraw();
			debugDraw.SetAlpha(debugDrawDefaultAlpha);
			debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit);
			debugDraw.SetDrawScale(this.props.scale);
			if (this.props.debugDraw.constructor.name === "Function") {
				this.props.debugDraw(debugDraw);
			}
			debugDraw.SetSprite(this._ctx);
			this._world.SetDebugDraw(debugDraw);
		}
		this._createBodies();
		if (this.props.running) {
			this._renderWorld();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.running) {
			this._renderWorld();
		}
		else {
			this._stop();
		}
	}

}