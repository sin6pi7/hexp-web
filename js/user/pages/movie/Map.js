import React from 'react';

import Map from '../../components/Map';

const STYLES = {
	"container": {
		"flex": "1",
		"display": "flex",
	},
}

export default class MovieMap extends React.Component{
	render(){
		return (
			<div style={STYLES.container}>
				<Map />
			</div>
		);
	}
}