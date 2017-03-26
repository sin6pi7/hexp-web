import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Description from './Description';
import Footer from './Footer';

class Details extends React.Component{
	render(){
		let listing = this.props.listings[this.props.listingId];
		listing = listing || {}
		const title = listing.title || "null";
		const description = listing.description || "null";

		return (
			<div className="details">
				<Header title={title}/>
				<Description description={description} />
				<Footer />
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"listings": store.listings.listings
	}
})(Details);