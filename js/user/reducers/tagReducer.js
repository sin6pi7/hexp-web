import _ from 'lodash';

export default function reducer(state={
	"tags": {},

	"statusDiscoverTags": "done",
}, action){
	
	switch(action.type){

		case "DISCOVER_TAGS_SENT": return discoverTagsSent(state, action);
		case "DISCOVER_TAGS_DONE": return discoverTagsDone(state, action);
		case "DISCOVER_TAGS_FAILED": return discoverTagsFailed(state, action);

		case "CLEAR_TAGS": return clearTags(state, action);

	}

	return {...state}
}

function discoverTagsSent(state, action){
	return {...state, "statusDiscoverTags": "sent"}
}

function discoverTagsDone(state, action){
	return {...state, "statusDiscoverTags": "done", "tags": _.mapValues(_.keyBy(action.payload, 'id'), function(o){ return o.name })}
}

function discoverTagsFailed(state, action){
	return {...state, "statusDiscoverTags": "failed"}
}

function clearTags(state, action){
	return {...state, "tags": {}}
}