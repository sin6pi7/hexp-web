import React from 'react';

import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

import _ from 'lodash';

const STYLES = {
	"title": {
		"width": "100%",
		"textAlign": "center",
	},

	"details": {
		"marginBottom": "10px",
		"display": "flex",
		"justifyContent": "space-around",
	},

	"detailGroup": {
		"display": "flex",
		"justifyContent": "center",
	},

	"chip": {
		"marginLeft": "5px",
		"marginRight": "5px",
	},
}

/**
 * @property {string} this.props.title - The title of the movie
 * @property {array} this.props.tags - The tags of the movie
 * @property {array} this.props.periods - The periods of the movie
 */
export default class Header extends React.Component{
	render(){
		return (
			<div style={STYLES.container}>
				<h1 style={STYLES.title}>{this.props.title}</h1>
				<div style={STYLES.details}>
					<div style={STYLES.detailGroup}>
						{_.map(this.props.tags, function(obj, index){
							return (<div style={STYLES.chip} key={index}><Chip>{obj.name}</Chip></div>);
						})}
					</div>
					<div style={STYLES.detailGroup}>
						{_.map(this.props.periods, function(obj, index){
							return (<div style={STYLES.chip} key={index}><Chip>{obj.name}</Chip></div>);
						})}
					</div>
				</div>
				<Divider />
			</div>
		);
	}
}