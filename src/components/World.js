import React from 'react'
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'

const debugDrawDefaultAlpha = 0.5;

class Camera {
	constructor(context) {
		this._ctx = context;
		this.x = 0;
		this.y = 0;
	}

	move(x = 0, y = 0) {
		this.x += x;
		this.y += y;
		this._ctx.translate(x, y);
	}

	clear() {
		this._ctx.clearRect(this.x * -1, this.y * -1, this._ctx.canvas.width, this._ctx.canvas.height);
	}
}

export default class World extends BaseComponent {
	/**
	 * @property {?Number} width [400]
	 * @property {?Number} height [300]
	 * @property {?Boolean} allowSleep [true]
	 * @property {?Object} gravity [{x:0,y:10}]
	 * @property {?Boolean} debugDraw [true]
	 * @property {?Boolean} running [true]
	 * @property {?Number} step [1/60]
	 * @property {?Number} velocityIterations [10]
	 * @property {?Number} positionIterations [8]
	 * @property {?Number} scale [30]
	 * @property {?Object} style
	 * @property {?String} className
	 * @property {?Function} onStep [()=>null]
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
		className: PropTypes.string,
		onStep: PropTypes.func,
		contactListener: PropTypes.shape({
			BeginContact: PropTypes.func,
			EndContact: PropTypes.func,
			PostSolve: PropTypes.func,
			PreSolve: PropTypes.func,
		}),
		contactFilter: PropTypes.shape({
			RayCollide: PropTypes.func,
			ShouldCollide: PropTypes.func,
		})
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
		style: {},
		onStep: ()=>null
	};

	constructor(props) {
		super(props);
		this._canvas = null;
		this._ctx = null;
		this._gravity = new Box2D.Common.Math.b2Vec2(this.props.gravity.x, this.props.gravity.y);
		this._world = new Box2D.Dynamics.b2World(this._gravity, this.props.allowSleep);
		this._setContactListener(props.contactListener);
		this._setContactFilter(props.contactFilter);
		this._bodyDefs = [];
		this._timer = null;
		this._stepBeginTime = null;
		this._camera = null;
		this._keyboardStatus = Array.apply(null, {length: 255}).map(()=>false);
		this._onkeydown = (event)=> {
			this._keyboardStatus[event.keyCode] = true;
		}
		this._onkeyup = (event)=> {
			this._keyboardStatus[event.keyCode] = false;
		}
		window.addEventListener('keydown', this._onkeydown, false);
		window.addEventListener('keyup', this._onkeyup, false);
	}

	_setContactFilter(contactFilterConf) {
		if (contactFilterConf) {
			const contactFilter = Object.assign(
				new Box2D.Dynamics.b2ContactFilter(),
				contactFilterConf
			);
			this._world.SetContactFilter(contactFilter);
		}
	}

	_setContactListener(contactListenerConf) {
		if (contactListenerConf) {
			const contactListener = Object.assign(
				new Box2D.Dynamics.b2ContactListener(),
				contactListenerConf
			);
			this._world.SetContactListener(contactListener)
		}
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

				let fixture = body.CreateFixture(fixtureDef);
				fixtureDefInstance.setFixture(fixture);
			});
			bodyDefInstance.setBody(body);
		})
	}

	_renderWorld() {
		if (this._camera) {
			this._camera.clear()
		}
		if (!this._stepBeginTime) {
			this._stepBeginTime = Date.now();
		}
		const now = Date.now();
		const duration = now - this._stepBeginTime;
		this._stepBeginTime = now;
		this.props.onStep(duration, this._keyboardStatus);
		this._world.Step(this.props.step, this.props.velocityIterations, this.props.positionIterations);
		this._world.DrawDebugData();
		this._timer = window.requestAnimationFrame(this._renderWorld.bind(this));
	}

	_stop() {
		if (this._timer) {
			window.cancelAnimationFrame(this._timer);
		}
	}

	/**
	 * get main camera instance
	 * */
	getMainCamera(): ?Camera {
		if (this._ctx && !this._camera) {
			this._camera = new Camera(this._ctx);
		}
		return this._camera;
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

	componentWillUnmount() {
		super.componentWillUnmount();
		this._stop();
		window.removeEventListener('keydown', this._onkeydown, false);
		window.removeEventListener('keyup', this._onkeyup, false);
	}

}
export const KeyCode = {
	w: 87,
	s: 83,
	a: 65,
	d: 68,
	j: 74,
	k: 75
};