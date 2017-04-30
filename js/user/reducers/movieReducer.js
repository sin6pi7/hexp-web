import _ from 'lodash';

export default function reducer(state={
	"movies": {},

	"statusGetMovie": "done",
}, action){

	switch(action.type){

		case "GET_MOVIE_SENT": return getMovieSent(state, action);
		case "GET_MOVIE_DONE": return getMovieDone(state, action);
		case "GET_MOVIE_FAILED": return getMovieFailed(state, action);

		case "DISCOVER_MOVIES_DONE": return discoverMoviesDone(state, action);
		case "CLEAR_MOVIES": return clearMovies(state, action);

	}

	return {...state}
}

function getMovieSent(state, action){
	return {...state, "statusGetMovie": "sent"}
}

function getMovieDone(state, action){
	return {...state, "statusGetMovie": "done", "movies": _.merge({}, state.movies, _.keyBy([action.payload], 'id'))}
}

function getMovieFailed(state, action){
	return {...state, "statusGetMovie": "failed"}
}

function discoverMoviesDone(state, action){
	return {...state, "movies": _.merge({}, state.movies, _.keyBy(action.payload, 'id'))}
}

function clearMovies(state, action){
	return {...state, "movies": {}}
}