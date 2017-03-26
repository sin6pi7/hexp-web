import React from 'react';
import L from 'leaflet';

const mapboxTileSatellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.satellite',
    accessToken: 'pk.eyJ1IjoiZGFsYW5uYXIiLCJhIjoiYjA0MTcyZDMyNzg2YWNjYTA3ZGE1MGMxMDI5ZWMyYjgifQ.25SjWDdKObbZvLpuGwZM4A'
});

const mapboxTileDark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoiZGFsYW5uYXIiLCJhIjoiYjA0MTcyZDMyNzg2YWNjYTA3ZGE1MGMxMDI5ZWMyYjgifQ.25SjWDdKObbZvLpuGwZM4A'
});

const mapboxTileLight = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGFsYW5uYXIiLCJhIjoiYjA0MTcyZDMyNzg2YWNjYTA3ZGE1MGMxMDI5ZWMyYjgifQ.25SjWDdKObbZvLpuGwZM4A'
});

export default class Map extends React.Component{
	componentDidMount(){
		// Temporary fix to make sure that the map takes up the entire space of the div
		setTimeout(function(){
			const map = new L.Map(this.refs.map, {}).setView([51.505, -0.09], 13);
			const tileLayers = {
				OpenStreetMaps: new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}),
				"Mapbox Satellite": mapboxTileSatellite,
				"Mapbox Light": mapboxTileLight.addTo(map),
				"Mapbox Dark": mapboxTileDark,
			}

			new L.Control.Layers(tileLayers, {}).addTo(map);
		}.bind(this), 1000);
	}

	render(){
		return (
			<div ref="map" className="map"></div>
		);
	}
}