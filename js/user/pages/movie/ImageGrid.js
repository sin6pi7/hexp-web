import React from 'react';

import Divider from 'material-ui/Divider';

import _ from 'lodash';

const STYLES = {
	"imageGrid": {
		"padding": "20px 10% 20px 10%",
		"display": "flex",
		"justifyContent": "center",
		"flexWrap": "wrap",
	},

	"image": {
		"marginRight": "10px",
		"marginBottom": "10px",
		"maxHeight": "168px",
		"width": "auto",
		"border": "2px solid black",
	},
}

/**
 * @property {array} images - The images to show
 */
export default class ImageGrid extends React.Component{
	render(){
		return (
			<div>
				<div style={STYLES.imageGrid}>
					{_.map(this.props.images, function(obj, index){
						return (
							<img key={index} src={obj} style={STYLES.image} />
						);
					})}
				</div>
				<Divider />
			</div>
		);
	}
}