import React from 'react';
import { connect } from 'react-redux';

import { discoverMovies } from '../../actions/searchingActions';

import _ from 'lodash';

import MapControls from './MapControls';
import Listings from './Listings';

const CONTAINER_STYLE = {
	"width": "100vw",
	"height": "100vh",
	"display": "flex",
	"position": "relative",
	"flexDirection": "column",
	"overflowX": "hidden",
	"overflowY": "auto",
}

class Discovery extends React.Component{
	onRequestNewPage(){
		if(this.props.statusDiscoverMovies !== 'sent'){
			let tag = this.props.searching.tag;
			let periods = this.props.searching.periods;
			let regions = this.props.searching.regions;
			let page = this.props.searching.page;
			let number = this.props.searching.number;

			this.props.dispatch(discoverMovies(tag, periods, regions, page, number));
		}
	}

	restartDiscovery(){
		let tag = this.props.searching.tag;
		let periods = this.props.searching.periods;
		let regions = this.props.searching.regions;
		let page = 0;
		let number = this.props.searching.number;

		this.props.dispatch(discoverMovies(tag, periods, regions, page, number));
	}

	componentDidUpdate(prevProps, prevState){
		let restartDiscovery = false;
		if(
			prevProps.searching.tag !== this.props.searching.tag ||
			!_.isEqual(prevProps.searching.periods.sort(), this.props.searching.periods.sort()) ||
			!_.isEqual(prevProps.searching.regions.sort(), this.props.searching.regions.sort())){
			restartDiscovery = true;
		}

		if(restartDiscovery)
			this.restartDiscovery();
	}

	render(){
		return (
			<div style={CONTAINER_STYLE}>
				<MapControls />
				<Listings onRequestNewPage={this.onRequestNewPage.bind(this)} />
				<div id="discovery-fade"></div>
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"searching": store.searching.searching,
		"statusDiscoverMovies": store.searching.statusDiscoverMovies,
	}
})(Discovery);