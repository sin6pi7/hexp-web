import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

import _ from 'lodash';

const CARD_HEIGHT = "326px";
const CARD_WIDTH = "215px";

const STYLES = {
	"container": {
		"display": "flex",
		"flexWrap": "nowrap",
		"paddingLeft": "10%",
		"paddingRight": "10%",
		"paddingBottom": "10px",
		"overflowX": "auto",
	},

	"paper": {
		"position": "relative",
		"display": "inline-flex",
		"flexDirection": "column",
		"justifyContent": "center",
		"alignItems": "center",
		"padding": "0",
		"margin": "0",
		"marginRight": "10px",
	},

	"hoveredPaper": {
		"cursor": "hand",
		"cursor": "pointer",
		"transform": "translate(-2px, -2px)",
	},

	"specialPaper": {
		"height": CARD_HEIGHT,
		"minWidth": CARD_WIDTH,
	},

	"img": {
		"height": CARD_HEIGHT,
		"width": "auto",
	},

	"title": {
		"position": "absolute",
		"width": "100%",
		"bottom": "0",
		"margin": "0",
		"padding": "40px 6px 10px 6px",
		"color": "white",
		"textAlign": "center",
		"background": "linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)",
	},
}


// The error margin on the right of the scrolling container to request a new page
const RIGHT_SCROLL_ERROR_MARGIN = 80;
// Maximum amount of pages that should be automaticly asked for before showing the request more button
const MAX_AUTOMATIC_REQUEST_PAGES = 3;

class Listings extends React.Component{
	constructor(){
		super();
		this.state = {
			"hoveredPaper": null,
		}
	}

	requestNewPage(){
		if(this.props.page < MAX_AUTOMATIC_REQUEST_PAGES)
			this.props.onRequestNewPage();
	}

	onMovieClick(id){
		this.props.history.push("/movie/" + id);
	}

	onMouseWheel(event){
		event.preventDefault();

		let c = this.refs.container;

		c.scrollLeft += event.deltaY;
		if(c.scrollLeft > (c.scrollWidth - c.clientWidth - RIGHT_SCROLL_ERROR_MARGIN))
			this.requestNewPage();
	}

	onPaperHover(key){
		this.setState({
			"hoveredPaper": key,
		});
	}

	onPaperHoverOut(){
		this.setState({
			"hoveredPaper": null,
		});
	}

	createMoviePaper(obj, index){
		let zDepth = this.state.hoveredPaper === obj.id ? 5 : 3;
		let hoverStyle = this.state.hoveredPaper === obj.id ? STYLES.hoveredPaper : {};

		return (
			<Paper zDepth={zDepth} key={index} style={{...STYLES.paper, ...hoverStyle}}
				onMouseOver={()=>{this.onPaperHover(obj.id)}}
				onMouseOut={this.onPaperHoverOut.bind(this)}
				onClick={()=>{this.onMovieClick(obj.id)}} >
				
				<img src={obj.poster} style={STYLES.img} />
				<h4 style={STYLES.title}>{obj.title}</h4>

			</Paper>
		);
	}

	createLoadMorePaper(obj, index){
		let zDepth = this.state.hoveredPaper === "loadMore" ? 5 : 3;
		let hoverStyle = this.state.hoveredPaper === "loadMore" ? STYLES.hoveredPaper : {};

		return (
			<Paper zDepth={zDepth} key="loadMore" style={{...STYLES.paper, ...STYLES.specialPaper, ...hoverStyle}}
				onMouseOver={()=>{this.onPaperHover("loadMore")}}
				onMouseOut={this.onPaperHoverOut.bind(this)}
				onClick={this.props.onRequestNewPage} >
				<h3>Load more</h3>
			</Paper>
		);
	}

	createLoadingPaper(){
		return (
			<Paper zDepth={3} key="loading" style={{...STYLES.paper, ...STYLES.specialPaper}}>
				<CircularProgress size={126} thickness={8} />
				<h3>Loading...</h3>
			</Paper>
		);
	}

	createNoResultsPaper(){
		return (
			<Paper zDepth={3} key="noResults" style={{...STYLES.paper, ...STYLES.specialPaper}}>
				<h3>No More Results</h3>
				<h6>Try different search paramenters</h6>
			</Paper>
		);
	}

	render(){
		let data = _.map(this.props.movies, this.createMoviePaper.bind(this));
		let onWheel = this.onMouseWheel.bind(this);

		if(this.props.statusDiscoverMovies === 'sent'){
			data.push(this.createLoadingPaper());
		}else if(this.props.page >= MAX_AUTOMATIC_REQUEST_PAGES && data.length < this.props.results){
			data.push(this.createLoadMorePaper());
		}else if(data.length < 1 || data.length >= this.props.results || this.props.results === null){
			data.push(this.createNoResultsPaper());
		}

		return (
			<div style={STYLES.container} ref="container" onWheel={onWheel} >
				{data}
				<div style={{"minWidth": CARD_WIDTH}}></div>
			</div>
		);
	}
}

export default withRouter(connect(store=>{
	return {
		"movies": store.movies.movies,
		"page": store.searching.searching.page,
		"results": store.searching.searching.results,
		"statusDiscoverMovies": store.searching.statusDiscoverMovies,
	}
})(Listings));