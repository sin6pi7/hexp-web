import _ from 'lodash';

import regionData from '../../data/regions';

export default function reducer(state={
	"searching": {
		"tag": null,
		"periods": [],
		"regions": [],
		"page": 0,
		"number": 10,
	},

	"statusDiscoverMovies": "done",
}, action){

	switch(action.type){

		case "DISCOVER_MOVIES_SENT": return discoverMoviesSent(state, action);
		case "DISCOVER_MOVIES_DONE": return discoverMoviesDone(state, action);
		case "DISCOVER_MOVIES_FAILED": return discoverMoviesFailed(state, action);

		case "CLEAR_MOVIES": return clearMovies(state, action);

		case "SET_TAG": return setTag(state, action);

		case "SELECT_REGIONS": return selectRegions(state, action);
		case "DESELECT_REGIONS": return deselectRegions(state, action);
		case "SET_REGIONS": return setRegions(state, action);

		case "SELECT_PERIODS": return selectPeriods(state, action);
		case "DESELECT_PERIODS": return deselectPeriods(state, action);

	}

	return {...state}

}

function discoverMoviesSent(state, action){
	return {...state, "statusDiscoverMovies": "sent"}
}

function discoverMoviesDone(state, action){
	return {...state, "statusDiscoverMovies": "done", "searching": {...state.searching, "page": state.searching.page+1}}
}

function discoverMoviesFailed(state, action){
	return {...state, "statusDiscoverMovies": "failed"}
}

function clearMovies(state, action){
	return {...state, "searching": {...state.searching, "page": 0}}
}

function setTag(state, action){
	return {...state, "searching": {...state.searching, "tag": action.payload}}
}

function selectRegions(state, action){
	return {...state, "searching": {...state.searching, "regions": _.union(state.searching.regions, action.payload)}}
}

function deselectRegions(state, action){
	return {...state, "searching": {...state.searching, "regions": _.xor(state.searching.regions, action.payload)}}
}

function setRegions(state, action){
	if(_.isArray(action.payload)){
		return {...state, "searching": {...state.searching, "regions": action.payload}}
	}else{
		let regions = _.map(_.filter(regionData, function(o){
			return action.payload === o.region || action.payload === o.subregion;
		}), function(o){ return o.code });
		return {...state, "searching": {...state.searching, "regions": regions}}
	}
}

function selectPeriods(state, action){
	return {...state, "searching": {...state.searching, "periods": _.union(state.searching.periods, action.payload)}}
}

function deselectPeriods(state, action){
	return {...state, "searching": {...state.searching, "periods": _.xor(state.searching.periods, action.payload)}}
}