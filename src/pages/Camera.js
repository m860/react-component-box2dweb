import React from 'react'
import BasePage from './BasePage'
import World from '../components/World'
import BodyDef, {BodyType} from '../components/BodyDef'
import FixtureDef from '../components/FixtureDef'
import Rect from '../components/shapes/Rect'
import Circle from '../components/shapes/Circle'
import Polygon from '../components/shapes/Polygon'

export default class Hello extends BasePage {
	constructor(props) {
		super(props);
		this.world = null;
		this.camera = null;
	}

	render() {
		return (
			<div>
				<World
					onStep={(duration)=>{
						if(this.camera){
							this.camera.move(duration*-0.01);
						}
					}}
					ref={ref=>{
						if(ref){
							this.world=ref;
							this.camera=ref.getMainCamera();
						}
						//console.log(this.camera)
					}}
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
					<BodyDef
						type={BodyType.dynamicBody}
						position={{x:250,y:10}}>
						<FixtureDef>
							<Circle radius={10}/>
						</FixtureDef>
					</BodyDef>
					<BodyDef
						type={BodyType.dynamicBody}
						position={{x:150,y:10}}>
						<FixtureDef>
							<Polygon vertices={[
								{x:0,y:-30},
								{x:15,y:0},
								{x:-15,y:0}
							]}/>
						</FixtureDef>
					</BodyDef>
				</World>
			</div>
		);
	}
}