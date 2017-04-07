import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

class MovieList extends React.Component{
	
	viewMovie(id){
		this.props.history.push("/movie/" + id);
	}

	render(){
		let _this = this;
		let movies = _.map(this.props.movies, function(obj){
			let tags = _.map(obj.tags, (tag, index)=>{return <Chip key={index} style={{"display": "inline"}}>{tag}</Chip>});
			let periods = _.map(obj.periods, (period, index)=>{return <Chip key={index} style={{"display": "inline"}}>{period}</Chip>});
			let regions = _.map(obj.regions, (region, index)=>{return <Chip key={index} style={{"display": "inline"}}>{region}</Chip>});

			return (
				<Card key={obj.id} style={{"marginTop": "5px", "marginBottom": "5px"}}>
					<CardText>
						<div className="pure-g">
							<div className="pure-u-7-24">
								<img style={{"maxWidth": "100%"}} src={obj.poster}></img>
							</div>
							<div className="pure-u-17-24">
								<CardTitle title={obj.title} subtitle={obj.description} />
								<span style={{"paddingLeft": "1em"}}>
									Topics: {tags} <br />
								</span>
								<span style={{"paddingLeft": "1em"}}>
									Periods: {periods} <br />
								</span>
								<span style={{"paddingLeft": "1em"}}>
									Regions: {regions} <br />
								</span>
							</div>
						</div>
					</CardText>
					<CardActions>
						<RaisedButton label="View" fullWidth={true} onTouchTap={()=>_this.viewMovie(obj.id)} />
					</CardActions>
				</Card>
			);
		});

		return (
			<div className="movie-list">
				{movies}
			</div>
		);
	}
}

export default withRouter(connect(store=>{
	return {
		"movies": store.movies.movies,
	}
})(MovieList));