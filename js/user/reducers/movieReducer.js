import _ from 'lodash';

export default function reducer(state={
	"movies": {},

	"statusGetMovie": "done",
}, action){

	switch(action.type){

		case "DISCOVER_MOVIES_DONE": return discoverMoviesDone(state, action);

	}

	return {...state}
}

function discoverMoviesDone(state, action){
	return {...state, "movies": _.keyBy(action.payload, 'id')}
}