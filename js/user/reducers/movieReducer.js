import _ from 'lodash';

export default function reducer(state={
	"movies": {},

	"statusGetMovie": "done",
}, action){

	switch(action.type){

		case "DISCOVER_MOVIES_DONE": return discoverMoviesDone(state, action);

		case "GET_MOVIE_SENT": return getMovieSent(state, action);
		case "GET_MOVIE_DONE": return getMovieDone(state, action);
		case "GET_MOVIE_FAILED": return getMovieFailed(state, action);

	}

	return {...state}
}

function discoverMoviesDone(state, action){
	return {...state, "movies": _.keyBy(action.payload, 'id')}
}

function getMovieSent(state, action){
	return {...state, "statusGetMovie": "sent"}
}

function getMovieDone(state, action){
	return {...state, "movies": _.assign({}, state.movies, _.keyBy([action.payload], 'id')), "statusGetMovie": "done"}
}

function getMovieFailed(state, action){
	return {...state, "statusGetMovie": "failed"}
}