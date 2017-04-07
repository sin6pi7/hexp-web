import React from 'react';

import Map from '../../../components/Map';

export default class MapContainer extends React.Component{
	render(){
		return (
			<div className="map-container">
				<Map />
			</div>
		);
	}
}