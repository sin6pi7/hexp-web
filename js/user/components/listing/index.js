import React from 'react';

import Poster from './poster';
import Map from './map';
import Regions from './regions';
import Details from './details';

export default class Listing extends React.Component{

	render(){
		return (
			<div className="container-fluid listing-page">
				<div className="row">
					<div className="col-md-4">
						<Poster />
						<Map />
						<Regions />
					</div>
					<div className="col-md-8">
						<Details listingId={this.props.match.params.id}/>
					</div>
				</div>
			</div>
		);
	}
}