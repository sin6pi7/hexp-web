import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import regionData from '../../../../data/regions';
import _ from 'lodash';

import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle } from 'material-ui/Card';

import Map from '../../../components/Map';

class Sidebar extends React.Component{
	goBack(){
		if(this.props.history.length > 1)
			this.props.history.goBack();
		else
			this.props.history.push("/discovery");
	}

	render(){
		const movieId = this.props.match.params.id;

		let poster = "";
		let regions = [];

		if(!_.isNil(this.props.movies[movieId])){
			poster = this.props.movies[movieId].poster;

			let _this = this;
			regions = _.map(this.props.movies[movieId].regions, function(value){
				return regionData[value].name || value;
			});
		}

		return (
			<div className="pure-u-1-1 pure-u-md-8-24 sidebar">
				<RaisedButton label="Go back" onTouchTap={this.goBack.bind(this)} fullWidth={true} />
				<img src={poster} />
				<Map />
				<Card style={{"width": "100%"}}>
					<CardTitle title="Portrayed in movie:" subtitle={regions.join(', ')} ></CardTitle>
				</Card>
			</div>
		);
	}
}

export default withRouter(connect(store=>{
	return {
		"movies": store.movies.movies,
	}
})(Sidebar));