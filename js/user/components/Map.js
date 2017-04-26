import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import L from 'leaflet';
import _ from 'lodash';

import { selectRegions, deselectRegions } from '../actions/searchingActions';
import regionData from '../../data/regions';

class Map extends React.Component{
	componentDidMount(){
		this.map = L.map(this.refs.map, {
			"minZoom": 3,
			"maxZoom": 5,
		}).setView([51.505, -0.09], 3);
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
		this.geoJSONLayers = _.mapValues(regionData, function(obj){
			let layer = L.geoJSON(obj.geoJSON, {
				"style": function(){
					return {
						"opacity": 0,
						"fillOpacity": 0,
						"color": "#0000ff",
						"fillColor": "#0000ff",
					}
				}
			}).addTo(this.map);

			layer.region = obj.code;
			layer.on('mouseover', this.onLayerMouseOver.bind(this));
			layer.on('mouseout', this.onLayerMouseOut.bind(this));
			layer.on('click', this.onClick.bind(this));

			return layer;
		}.bind(this));

		if(this.props.match.path === "/movie/:id?"){
			const movieId = this.props.match.params.id;
			let regions = [];

			if(this.props.movies[movieId]){
				regions = this.props.movies[movieId].regions;
			}

			this.zoomOnMovie(regions);
		}else{
			this.map.fitWorld();
		}
	}

	zoomOnMovie(regions=[]){
		console.log("something right here");
		if(regions.length === 0){
			this.map.fitWorld();
		}else{
			let bounds = L.latLngBounds();
			_.forEach(regions, function(region){
				bounds.extend(this.geoJSONLayers[region].getBounds());
			}.bind(this))

			this.map.fitBounds(bounds);
		}
	}

	onClick(layer){
		let country = layer.target;
		if(country.selected){
			console.log("another");
			this.props.dispatch(deselectRegions([country.region]));
		}else{
			console.log("something");
			this.props.dispatch(selectRegions([country.region]));
		}
	}

	onLayerMouseOver(layer){
		layer = layer.layer;
		layer.setStyle({
			"opacity": 1,
			"fillOpacity": 0.2,
			"color": "#ff0000",
			"fillColor": "#ff0000",
		});
	}

	onLayerMouseOut(layer){
		let selected = layer.target.selected;
		layer = layer.layer;
		layer.setStyle({
			"color": "#0000ff",
			"fillColor": "#0000ff",
		});

		if(!selected){
			layer.setStyle({
				"opacity": 0,
				"fillOpacity": 0,
			});
		}
	}

	selectLayer(layer){
		layer.selected = true;
		layer.setStyle({
			"opacity": 1,
			"fillOpacity": 0.2,
		});
	}

	deselectLayer(layer){
		layer.selected = false;
		layer.setStyle({
			"opacity": 0,
			"fillOpacity": 0,
		});
	}

	componentDidUpdate(prevProps, prevState){
		let _this = this;
		_.forEach(prevProps.regions, function(region){
			_this.deselectLayer(_this.geoJSONLayers[region]);
		});

		_.forEach(this.props.regions, function(region){
			_this.selectLayer(_this.geoJSONLayers[region]);
		});
	}

	render(){
		return (
			<div ref="map" id="map"></div>
		);
	}
}

export default withRouter(connect(store=>{
	return {
		"regions": store.searching.regions,
		"movies": store.movies.movies,
	}
})(Map));