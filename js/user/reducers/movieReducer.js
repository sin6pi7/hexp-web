import _ from 'lodash';

export default function reducer(state={
	"movies": {},
	"movieTitles": {},

	"statusGetMovie": "done",
	"statusSearchMovies": "done",
}, action){

	switch(action.type){

		case "GET_MOVIE_SENT": return getMovieSent(state, action);
		case "GET_MOVIE_DONE": return getMovieDone(state, action);
		case "GET_MOVIE_FAILED": return getMovieFailed(state, action);

		case "SEARCH_MOVIES_SENT": return searchMoviesSent(state, action);
		case "SEARCH_MOVIES_DONE": return searchMoviesDone(state, action);
		case "SEARCH_MOVIES_FAILED": return searchMoviesFailed(state, action);

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

function searchMoviesSent(state, action){
	return {...state, "statusSearchMovies": "sent"}
}

function searchMoviesDone(state, action){
	return {...state, "statusSearchMovies": "done", "movieTitles": _.mapValues(_.keyBy(action.payload, 'id'), function(o){ return o.title })}
}

function searchMoviesFailed(state, action){
	return {...state, "statusSearchMovies": "failed"}
}

function discoverMoviesDone(state, action){
	return {...state, "movies": _.merge({}, state.movies, _.keyBy(action.payload.rows, 'id'))}
}

function clearMovies(state, action){
	return {...state, "movies": {}}
}