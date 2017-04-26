import _ from 'lodash';
import regionData from '../../data/regions';

export default function reducer(state={
	"tag": null,
	"regions": [],
	"periods": [],
	"page": 0,
	"number": 10,

	"statusDiscoverMovies": "done",
}, action){

	switch(action.type){
		case "SET_TAG": return setTag(state, action);
		case "CLEAR_TAG": return clearTag(state, action);

		case "SELECT_REGIONS": return selectRegions(state, action);
		case "DESELECT_REGIONS": return deselectRegions(state, action);
		case "SET_REGIONS": return setRegions(state, action);

		case "SELECT_PERIODS": return selectPeriods(state, action);
		case "DESELECT_PERIODS": return deselectPeriods(state, action);
		case "TOGGLE_PERIODS": return togglePeriods(state, action);
		case "CLEAR_PERIODS": return clearPeriods(state, action);

		case "SET_RESULTS_PER_PAGE": return setResultsPerPage(state, action);

		case "DISCOVER_MOVIES_SENT": return discoverMoviesSent(state, action);
		case "DISCOVER_MOVIES_DONE": return discoverMoviesDone(state, action);
		case "DISCOVER_MOVIES_FAILED": return discoverMoviesFailed(state, action);
	}

	return {...state}
}

function setTag(state, action){
	return {...state, "tag": action.payload}
}

function clearTag(state, action){
	return {...state, "tag": null}
}

function selectRegions(state, action){	
	return {...state, "regions": _.union(state.regions, action.payload)}
}

function deselectRegions(state, action){
	return {...state, "regions": _.xor(state.regions, action.payload)}
}

function setRegions(state, action){
	if(_.isArray(action.payload)){
		return {...state, "regions": action.payload}
	}else{
		let regions = _.filter(regionData, function(obj){
			return (obj.region === action.payload || obj.subregion === action.payload);
		});
		return {...state, "regions": _.map(regions, function(obj){ return obj.code })}
	}
}

function selectPeriods(state, action){
	return {...state, "periods": _.union(state.periods, action.payload)}
}

function deselectPeriods(state, action){
	return {...state, "periods": _.without(state.periods, action.payload)}
}

function togglePeriods(state, action){
	return {...state, "periods": _.xor(state.periods, action.payload)}
}

function clearPeriods(state, action){
	return {...state, "periods": []}
}

function setResultsPerPage(state, action){
	return {...state, "number": action.payload}
}

function discoverMoviesSent(state, action){
	return {...state, "statusDiscoverMovies": "sent"}
}

function discoverMoviesDone(state, action){
	return {...state, "statusDiscoverMovies": "done"}
}

function discoverMoviesFailed(state, action){
	return {...state, "statusDiscoverMovies": "failed"}
}