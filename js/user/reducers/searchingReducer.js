import _ from 'lodash';

export default function reducer(state={
	"tag": null,
	"regions": [],
	"periods": [],
	"page": 0,
	"number": 10,

	"statusDiscoverMovies": "done",
}, action){

	switch(action.type){
		case "SELECT_REGIONS": return selectRegions(state, action);
		case "SET_REGIONS": return setRegions(state, action);
		case "DESELECT_REGIONS": return deselectRegions(state, action);
		case "TOGGLE_REGIONS": return toggleRegions(state, action);
		case "CLEAR_REGIONS": return clearRegions(state, action);

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

function selectRegions(state, action){	
	return {...state, "regions": _.union(state.regions, action.payload)}
}

function setRegions(state, action){
	switch(action.payload){
		case "europe": return {...state, "regions": EUROPE}
		case "northamerica": return {...state, "regions": NORTH_AMERICA}
		case "asia": return {...state, "regions": ASIA}
		case "southamerica": return {...state, "regions": SOUTH_AMERICA}
		case "africa": return {...state, "regions": AFRICA}
		case "oceania": return {...state, "regions": OCEANIA}
	}

	return {...state, "regions": []}
}

function deselectRegions(state, action){
	return {...state, "regions": _.without(state.regions, action.payload)}
}

function toggleRegions(state, action){
	return {...state, "regions": _.xor(state.regions, action.payload)}
}

function clearRegions(state, action){
	return {...state, "regions": []}
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

const EUROPE = ["AL","AD","AM","AT","BY","BE","BA","BG","CH","CY","CZ","DE","DK","EE","ES","FO","FI","FR","GB","GE","GI","GR","HU","HR","IE","IS","IT","LT","LU","LV","MC","MK","MT","NO","NL","PO","PT","RO","RU","SE","SI","SK","SM","TR","UA","VA"];
const NORTH_AMERICA = ["AI","AG","AW","BS","BB","BZ","BM","BQ","VG","CA","KY","CR","CU","CW","DM","DO","SV","GL","GD","GP","GT","HT","HN","JM","MQ","MX","PM","MS","CW","KN","NI","PA","PR","BQ","BQ","SX","KN","LC","PM","VC","TT","TC","US","VI"];
const ASIA = ["AF","AM","AZ","BH","BD","BT","BN","KH","CN","CX","CC","IO","GE","HK","IN","ID","IR","IQ","IL","JP","JO","KZ","KW","KG","LA","LB","MO","MY","MV","MN","MM","NP","KP","OM","PK","PS","PH","QA","SA","SG","KR","LK","SY","TW","TJ","TH","TR","TM","AE","UZ","VN","YE"];
const SOUTH_AMERICA = ["AR","BO","BR","CL","CO","EC","FK","GF","GY","GY","PY","PE","SR","UY","VE"];
const AFRICA = ["DZ","AO","SH","BJ","BW","BF","BI","CM","CV","CF","TD","KM","CG","CD","DJ","EG","GQ","ER","ET","GA","GM","GH","GN","GW","CI","KE","LS","LR","LY","MG","MW","ML","MR","MU","YT","MA","MZ","NA","NE","NG","ST","RE","RW","ST","SN","SC","SL","SO","ZA","SS","SH","SD","SZ","TZ","TG","TN","UG","CD","ZM","TZ","ZW"];
const OCEANIA = ["AS","AU","NZ","CK","TL","FM","FJ","PF","GU","KI","MP","MH","UM","NR","NC","NZ","NU","NF","PW","PG","MP","WS","SB","TK","TO","TV","VU","UM","WF"];