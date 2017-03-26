import React from 'react';

import Listings from './Listings';
import Pagination from './Pagination';

export default class ListingsContainer extends React.Component{
	render(){
		return (
			<div className="listings-container">
				<Listings />
				<Pagination />
			</div>
		);
	}
}