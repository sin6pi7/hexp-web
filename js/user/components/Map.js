import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import _ from 'lodash';
import L from 'leaflet';

import { selectRegions, deselectRegions } from '../actions/searchingActions';
import regionData from '../../data/regions';

const MAP_STYLE = {
	"flex": "1",
	"border": "1px solid black",
}

const REGION_UNSELECTED_STYLE = {
	"opacity": 0,
	"fillOpacity": 0,
}

const REGION_SELECTED_STYLE = {
	"opacity": 1,
	"fillOpacity": 0.2,
	"color": "#0000ff",
	"fillColor": "#0000ff",
}

const REGIONS_HOVERED_STYLE = {
	"opacity": 1,
	"fillOpacity": "0.6",
	"color": "#ff0000",
	"fillColor": "#0000ff",
}

class Map extends React.Component{
	constructor(){
		super();
		this.editing = true;
		this.previousSelectedRegions = [];

		this.regionLayers = _.mapValues(regionData, function(obj){
			let layer = L.geoJSON(obj.geoJSON);
			layer.setStyle(REGION_UNSELECTED_STYLE);

			(function(){
				layer.on('mouseover', ()=>{ this.onRegionMouseOver(obj.code) }, this);
				layer.on('mouseout', ()=>{ this.onRegionMouseOut(obj.code) }, this);
				layer.on('click', ()=>{ this.onRegionClick(obj.code) }, this);
			}.bind(this))();

			return layer;
		}.bind(this));
	}

	componentDidMount(){
		if(this.map){
			this.map.off();
			this.map.remove();
		}

		this.map = L.map(this.refs.map, {
			"minZoom": 4,
			"maxZoom": 6,
			"worldCopyJump": true,
		}).setView([51.505, -0.09], 4);

		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);

		_.forEach(this.regionLayers, function(obj){obj.addTo(this.map)}.bind(this));

		if(this.props.match.pathname === "/movie/:id?"){
			this.editing = false;
		}

		this.map.fitWorld();
	}

	onRegionMouseOver(region){
		this.regionLayers[region].setStyle(REGIONS_HOVERED_STYLE);
	}

	onRegionMouseOut(region){
		if(this.isRegionSelected(region))
			this.regionLayers[region].setStyle(REGION_SELECTED_STYLE);
		else
			this.regionLayers[region].setStyle(REGION_UNSELECTED_STYLE);
	}

	isRegionSelected(region){
		return this.props.selectedRegions.indexOf(region) !== -1;
	}

	onRegionClick(region){
		if(this.isRegionSelected(region)){
			this.props.dispatch(deselectRegions([region]));
			this.regionLayers[region].setStyle(REGION_UNSELECTED_STYLE);
		}else{
			this.props.dispatch(selectRegions([region]));
			this.regionLayers[region].setStyle(REGION_SELECTED_STYLE);
		}
	}

	render(){
		let toRemove = _.difference(this.previousSelectedRegions, this.props.selectedRegions);
		let toAdd = _.difference(this.props.selectedRegions, this.previousSelectedRegions);

		_.forEach(toRemove, function(region){ this.regionLayers[region].setStyle(REGION_UNSELECTED_STYLE) }.bind(this))
		_.forEach(toAdd, function(region){ this.regionLayers[region].setStyle(REGION_SELECTED_STYLE) }.bind(this))

		this.previousSelectedRegions = this.props.selectedRegions;

		return (
			<div ref="map" style={MAP_STYLE}></div>
		);
	}
}

export default withRouter(connect(store=>{
	return {
		"selectedRegions": store.searching.searching.regions,
	}
})(Map));