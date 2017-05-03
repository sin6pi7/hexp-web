import React from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';

import _ from 'lodash';

import Header from './Header';
import ImageGrid from './ImageGrid';
import Controls from './Controls';

import { getMovie } from '../../actions/movieActions';

const STYLES = {
	"container": {
		"width": "100vw",
		"height": "100vh",
		"display": "flex",
		"position": "relative",
		"justifyContent": "space-between",
		"flexDirection": "column",
		"overflowX": "hidden",
		"overflowY": "auto",
	},

	"description": {
		"textAlign": "center",
		"padding": "20px 10% 20px 10%",
	},
}

class Movie extends React.Component{
	componentDidMount(){
		this.props.dispatch(getMovie(this.props.match.params.id));
	}

	render(){
		let title = "Loading title...";
		let description = "Loading description...";
		let tags = [];
		let periods = [];
		let regions = [];
		let images = [];
		let meta = {};
		let trailer = "";

		let movieId = this.props.match.params.id;
		let movie = this.props.movies[movieId];

		if(!_.isNil(movie)){
			title = movie.title;
			description = movie.description;
			tags = movie.tags;
			periods = movie.periods;
			regions = movie.regions;
			images = movie.images;
			meta = movie.meta;
			trailer = movie.trailer;
		}

		return (
			<div style={STYLES.container}>
				<Header title={title} tags={tags} periods={periods} />
				<div>
					<p style={STYLES.description}>{description}</p>
					<Divider />
				</div>
				<ImageGrid images={images} />
				<Controls movieId={movieId} trailer={trailer} meta={meta}/>
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"movies": store.movies.movies,
	}
})(Movie);