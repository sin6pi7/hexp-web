import _ from 'lodash';

export default function reducer(state={
	"listings" : {},
	"getListings" : "done"
}, action){
	
	switch(action.type){
		case "GET_LISTINGS_SENT": return getListingsSent(state, action);
		case "GET_LISTINGS_DONE": return getListingsDone(state, action);
		case "GET_LISTINGS_FAILED": return getListingsFailed(state, action);
	}

	return {...state}

}

function getListingsSent(state, action){
	return {...state, "getListings": "sent"}
}

function getListingsDone(state, action){
	return {...state, "listings": _.merge(state.listings, _.keyBy(action.payload.listings, 'id')), "getListings": "done"}
}

function getListingsFailed(state, action){
	return {...state, "getListings": "failed"}
}