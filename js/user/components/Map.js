import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import _ from 'lodash';
import L from 'leaflet';

import { selectRegions, deselectRegions } from '../actions/searchingActions';
import regionData from '../../data/regions';

const STYLES = {
	"map": {
		"flex": "1",
		"border": "1px solid black",	
	},

	"regionUnselected": {
		"opacity": 0,
		"fillOpacity": 0,	
	},

	"regionSelected": {
		"opacity": 1,
		"fillOpacity": 0.2,
		"color": "#0000ff",
		"fillColor": "#0000ff",	
	},

	"regionHovered": {
		"opacity": 1,
		"fillOpacity": "0.6",
		"color": "#ff0000",
		"fillColor": "#0000ff",
	},
}

class Map extends React.Component{
	constructor(){
		super();
		this.editing = true;
		this.previousSelectedRegions = [];

		this.regionLayers = _.mapValues(regionData, function(obj){
			let layer = L.geoJSON(obj.geoJSON);
			layer.setStyle(STYLES.regionUnselected);

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
			"minZoom": 3,
			"maxZoom": 8,
			"worldCopyJump": true,
		}).setView([51.505, -0.09], 3);
		
		_.forEach(this.regionLayers, function(obj){obj.addTo(this.map)}.bind(this));

		if(this.props.match.path === "/movie/:id?"){
			this.editing = false;
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			    maxZoom: 18,
			    id: 'mapbox.satellite',
			    accessToken: 'pk.eyJ1IjoiZGFsYW5uYXIiLCJhIjoiYjA0MTcyZDMyNzg2YWNjYTA3ZGE1MGMxMDI5ZWMyYjgifQ.25SjWDdKObbZvLpuGwZM4A'
			}).addTo(this.map);

			let movieId = this.props.match.params.id;
			if(this.props.movies[movieId]){

				if(this.props.movies[movieId].regions.length > 0){
					let bounds = L.latLngBounds();
					_.forEach(this.props.movies[movieId].regions, function(region){
						bounds.extend(this.regionLayers[region].getBounds());
					}.bind(this));

					this.map.fitBounds(bounds);
					
				}else{
					this.map.fitWorld();
				}

			}else{
				this.map.fitWorld();
			}
		
		}else{
			this.editing = true;
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);
			this.map.fitWorld();
		}
	}

	onRegionMouseOver(region){
		if(!this.editing)
			return;

		this.regionLayers[region].setStyle(STYLES.regionHovered);
	}

	onRegionMouseOut(region){
		if(!this.editing)
			return;

		if(this.isRegionSelected(region))
			this.regionLayers[region].setStyle(STYLES.regionSelected);
		else
			this.regionLayers[region].setStyle(STYLES.regionUnselected);
	}

	isRegionSelected(region){
		return this.props.selectedRegions.indexOf(region) !== -1;
	}

	onRegionClick(region){
		if(!this.editing)
			return;

		if(this.isRegionSelected(region)){
			this.props.dispatch(deselectRegions([region]));
			this.regionLayers[region].setStyle(STYLES.regionUnselected);
		}else{
			this.props.dispatch(selectRegions([region]));
			this.regionLayers[region].setStyle(STYLES.regionSelected);
		}
	}

	render(){
		let toRemove = _.difference(this.previousSelectedRegions, this.props.selectedRegions);
		let toAdd = _.difference(this.props.selectedRegions, this.previousSelectedRegions);

		_.forEach(toRemove, function(region){ this.regionLayers[region].setStyle(STYLES.regionUnselected) }.bind(this))
		_.forEach(toAdd, function(region){ this.regionLayers[region].setStyle(STYLES.regionSelected) }.bind(this))

		this.previousSelectedRegions = this.props.selectedRegions;

		return (
			<div ref="map" style={STYLES.map}></div>
		);
	}
}

export default withRouter(connect(store=>{
	return {
		"selectedRegions": store.searching.searching.regions,
		"movies": store.movies.movies,
	}
})(Map));