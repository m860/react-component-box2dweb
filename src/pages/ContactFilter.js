import React from 'react'
import BasePage from './BasePage'
import World from '../components/World'
import BodyDef, {BodyType} from '../components/BodyDef'
import FixtureDef from '../components/FixtureDef'
import Rect from '../components/shapes/Rect'
import Circle from '../components/shapes/Circle'
import Polygon from '../components/shapes/Polygon'

const width = 400;
const height = 300;
const edgeSize = 10;
const centerPoint = {
	x: width / 2,
	y: height / 2
};

const randomRange = (min, max)=> {
	return Math.random() * (max - min) + min;
};

const range = (count, callback)=> {
	let arr = [];
	for (let i = 0; i < count; i++) {
		arr.push(callback());
	}
	return arr;
}


export default class Hello extends BasePage {
	constructor(props) {
		super(props);
		this.world = null;
		this.camera = null;
		this.circle = range(10, ()=> {
			return {
				radius: randomRange(10, 20),
				position: {
					x: randomRange(50, width - 50),
					y: randomRange(50, height - 50)
				},
				linearVelocity: {
					x: randomRange(-10, 10)
					, y: randomRange(-10, 10)
				}
			};
		});
	}

	render() {
		return (
			<div>
				<World
					contactFilter={{
						ShouldCollide:(fa,fb)=>{
							const bodyA=fa.GetBody();
							const bodyB=fb.GetBody();
							if(bodyA.GetType()===bodyB.GetType()){
								return false;
							}
							return true;
						}
					}}
					ref={ref=>{
						if(ref){
							this.world=ref;
							this.camera=ref.getMainCamera();
						}
					}}
					gravity={{x:0,y:0}}
					style={{backgroundColor:"silver"}}>
					<BodyDef
						position={{x:width/2,y:height-edgeSize/2}}
						type={BodyType.staticBody}>
						<FixtureDef>
							<Rect width={width} height={edgeSize}/>
						</FixtureDef>
					</BodyDef>
					<BodyDef
						position={{x:width/2,y:edgeSize/2}}
						type={BodyType.staticBody}>
						<FixtureDef>
							<Rect width={width} height={edgeSize}/>
						</FixtureDef>
					</BodyDef>
					<BodyDef
						position={{x:edgeSize/2,y:height/2}}
						type={BodyType.staticBody}>
						<FixtureDef>
							<Rect width={edgeSize} height={height}/>
						</FixtureDef>
					</BodyDef>
					<BodyDef
						position={{x:width-edgeSize/2,y:height/2}}
						type={BodyType.staticBody}>
						<FixtureDef>
							<Rect width={edgeSize} height={height}/>
						</FixtureDef>
					</BodyDef>
					{this.circle.map((item, index)=> {
						return (
							<BodyDef
								key={`circle-body-def-${index}`}
								linearVelocity={item.linearVelocity}
								type={BodyType.dynamicBody}
								position={item.position}>
								<FixtureDef
									friction={0}
									restitution={1}>
									<Circle radius={item.radius}/>
								</FixtureDef>
							</BodyDef>
						);
					})}

				</World>
			</div>
		);
	}
}