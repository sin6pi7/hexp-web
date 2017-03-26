import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import Listing from './Listing';

class Listings extends React.Component{
	render(){
		const listings = _.map(this.props.listings, function(obj){
			return (
				<Listing key={obj.id} id={obj.id} title={obj.title} description={obj.description} poster={obj.poster} />
			);
		});

		return (
			<div className="listings">
				{listings}
			</div>
		);
	}
}

export default connect(store => {
	return {
		"listings": store.listings.listings,
		"getListings": store.listings.getListings
	}
})(Listings);