import React from 'react'
import BasePage from './BasePage'
import World from '../components/World'
import BodyDef from '../components/BodyDef'
import FixtureDef from '../components/FixtureDef'

export default class Hello extends BasePage{
	constructor(props){
		super(props);
		this.shape=new Box2D.Collision.Shapes.b2PolygonShape();
		this.shape.SetAsBox(25,25)
	}
	render(){
		return (
			<div>
				<World>
					<BodyDef position={{x:100,y:100}} type={Box2D.Dynamics.b2Body.b2_staticBody}>
						<FixtureDef shape={this.shape}/>
					</BodyDef>
				</World>
			</div>
		);
	}
}