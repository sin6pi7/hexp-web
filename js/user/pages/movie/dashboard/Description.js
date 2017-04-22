import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import _ from 'lodash';

class Description extends React.Component{
	render(){
		const movieId = this.props.match.params.id;

		let description = "";

		if(!_.isNil(this.props.movies[movieId])){
			description = this.props.movies[movieId].description;
		}

		return (
			<div className="description">
				<p>
					{description}
				</p>
			</div>
		);
	}
}

export default withRouter(connect(store=>{
	return {
		"movies": store.movies.movies,
	}
})(Description));