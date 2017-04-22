import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import _ from 'lodash';

import Chip from 'material-ui/Chip'

class Header extends React.Component{
	render(){
		const movieId = this.props.match.params.id;

		let title = "";
		let tags = [];
		let periods = [];

		if(!_.isNil(this.props.movies[movieId])){
			title = this.props.movies[movieId].title;
			tags = _.map(this.props.movies[movieId].tags, function(value){
				return (<Chip key={value}>{value}</Chip>);
			});
			periods = _.map(this.props.movies[movieId].periods, function(value){
				return (<Chip key={value}>{value}</Chip>);
			});
		}

		return (
			<div className="header">
				<h1>{title}</h1>
				<div style={{"display": "flex", "justifyContent": "center", "padding": "5px"}}>
					{tags}
				</div>
				<div style={{"display": "flex", "justifyContent": "center", "padding": "5px"}}>
					{periods}
				</div>
			</div>
		);
	}
}

export default withRouter(connect(store=>{
	return {
		"movies": store.movies.movies,
	}
})(Header));