import React from 'react';

import Meta from './Meta';
import Map from './Map';
import Buttons from './Buttons';

const STYLES = {
	"container": {
		"flex": "1",
		"display": "flex",
		"justifyContent": "space-between",
		"paddingTop": "20px",
		"paddingBottom": "20px",
	},

	"items": {
		"display": "flex",
		"flex": "1",
		"paddingLeft": "20px",
		"paddingRight": "20px",
	},
}

/**
 * @property {object} this.props.meta - The meta details about the movie
 * @property {string} this.props.trailer - The trailer to the movie
 */
export default class Controls extends React.Component{
	render(){
		return (
			<div style={STYLES.container}>
				<div style={STYLES.items}>
					<Map />
				</div>
				<div style={STYLES.items}>
					<Buttons trailer={this.props.trailer} />
				</div>
				<div style={STYLES.items}>
					<Meta meta={this.props.meta} />
				</div>
			</div>
		);
	}
}