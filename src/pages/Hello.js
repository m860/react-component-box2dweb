import React from 'react'
import BasePage from './BasePage'
import World from '../components/World'
import BodyDef, {BodyType} from '../components/BodyDef'
import FixtureDef from '../components/FixtureDef'
import Rect from '../components/shapes/Rect'

export default class Hello extends BasePage {
	constructor(props) {
		super(props);
		this.shape = new Box2D.Collision.Shapes.b2PolygonShape();
		this.shape.SetAsBox(25, 25)
	}

	render() {
		return (
			<div>
				<World
					style={{backgroundColor:"silver"}}>
					<BodyDef
						position={{x:200,y:275}}
						type={BodyType.staticBody}>
						<FixtureDef>
							<Rect width={400} height={50}/>
						</FixtureDef>
					</BodyDef>
					<BodyDef
						type={BodyType.dynamicBody}
						position={{x:200,y:10}}>
						<FixtureDef>
							<Rect width={50} height={50}/>
						</FixtureDef>
					</BodyDef>
				</World>
			</div>
		);
	}
}