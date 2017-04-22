import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import _ from 'lodash';

import RaisedButton from 'material-ui/RaisedButton';
import { GridList, GridTile } from 'material-ui/GridList';

class Details extends React.Component{
	render(){
		const movieId = this.props.match.params.id;

		let details = {
			"releaseDate": "",
			"country": "",
			"producer": "",
			"director": "",
			"imdbScore": "",
			"rottenTomatoes": "",
		}
		let images = [];

		if(!_.isNil(this.props.movies[movieId])){
			details.releaseDate = this.props.movies[movieId].releaseDate;
			details.country = this.props.movies[movieId].country;
			details.producer = this.props.movies[movieId].producer;
			details.director = this.props.movies[movieId].director;
			details.imdbScore = this.props.movies[movieId].imdbScore;
			details.rottenTomatoes = this.props.movies[movieId].rottenTomatoes;

			images = this.props.movies[movieId].images;
		}

		return (
			<div className="pure-g details">
				<div className="pure-u-3-5 control-pane">
					<div className="meta">
						<p>
							{_.map(details, function(value, key){
								return (<li key={key}>{key} : {value}</li>);
							})}
						</p>
					</div>
					<div className="controls">
						<RaisedButton label="Share Movie" fullWidth={true}/>
						<RaisedButton label="Watch trailer" fullWidth={true} />
						<RaisedButton label="Where to watch" fullWidth={true} />
						<RaisedButton label="Report problem with movie" fullWidth={true} />
					</div>
				</div>
				<div className="pure-u-2-5 image-list">
					<GridList cellHeight="auto">
						{_.map(images, function(value, index){
							return (
								<GridTile key={index} style={{"maxHeight": "180px", "textAlign": "center"}}>
									<img style={{"maxHeight": "180px"}} src={value} />
								</GridTile>
							);
						})}
					</GridList>
				</div>
			</div>
		);
	}
}

export default withRouter(connect(store=>{
	return {
		"movies": store.movies.movies,
	}
})(Details));