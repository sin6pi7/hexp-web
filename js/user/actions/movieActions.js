import _ from 'lodash';
import axios from 'axios';

/**
 * Get the full information about a specified movie
 * @param  {[type]} id The id of the movie to get information about
 *
 * GET_MOVIE_SENT
 * GET_MOVIE_DONE
 * GET_MOVIE_FAILED
 */
export function getMovie(id){
	return function(dispatch){
		const URL = '/api/movies/' + id;

		dispatch({
			"type": "GET_MOVIE_SENT",
		});

		axios({
			"method": "get",
			"url": URL,
		})

		// Success
		.then(function(response){
			dispatch({
				"type": "GET_MOVIE_DONE",
				"payload": response.data,
			});
		})

		// Failed
		.catch(function(response){
			dispatch({
				"type": "GET_MOVIE_FAILED",
			});
		});
	}
}

/**
 * Search movies by title
 * @param  {string} title - The title to search for
 * @param {number} number - The number of results to return
 *
 * SEARCH_MOVIES_SENT
 * SEARCH_MOVIES_DONE
 * SEARCH_MOVIES_FAILED
 */
export function searchMovies(title, number=5){
	return function(dispatch){
		const URL = "/api/movies";

		dispatch({
			"type": "SEARCH_MOVIES_SENT",
		});

		axios({
			"method": "get",
			"url": URL,
			"params": {
				"title": title,
				"limit": number,
			},
		})
		
		// Success
		.then(function(response){
			dispatch({
				"type": "SEARCH_MOVIES_DONE",
				"payload": response.data.rows,
			});
		})

		// Failed
		.catch(function(response){
			dispatch({
				"type": "SEARCH_MOVIES_FAILED",
			});
		});
	}
}

/**
 * Upvote or downvote the link between a specified movie and a tag, period or region
 * @param  {number} movieId     The id of the movie in question
 * @param  {string} elementType Tag/Region/Period
 * @param  {number} elementId   The id of the element in question
 * @param  {string} voteType    upvote/downvote
 *
 * VOTE_SENT
 * VOTE_DONE
 * VOTE_FAILED
 */
export function vote(movieId, elementType, elementId, voteType){
	return function(dispatch){
		const regionURL = "/api/regions";
		const periodURL = "/api/periods";

		dispatch({
			"type": "VOTE_SENT",
		});

		if(elementType === "period"){

			axios({
				"method": "get",
				"url": periodURL,
				"params": { "name": elementId }
			})

			.then(function(response){
				sendVote(movieId, elementType, response.data.rows[0].id, voteType, dispatch);
			})

			.catch(function(response){
				dispatch({
					"type": "VOTE_FAILED",
				});
			});

		}else if(elementType === "region"){

			axios({
				"method": "get",
				"url": regionURL,
				"params": { "name": elementId }
			})

			.then(function(response){
				sendVote(movieId, elementType, response.data.rows[0].id, voteType, dispatch);
			})

			.catch(function(response){
				dispatch({
					"type": "VOTE_FAILED",
				});
			});

		}else{
			sendVote(movieId, elementType, elementId, voteType, dispatch);
		}

	}
}

function sendVote(movieId, elementType, elementId, voteType, dispatch){
	const URL = "/api/votes";

	axios({
		"method": "patch",
		"url": URL,
		"data": {
			"action": voteType,
			"movieId": movieId,
			"votableType": elementType,
			"votableId": elementId,
		}
	})

	// Success
	.then(function(response){
		dispatch({
			"type": "VOTE_DONE",
		});
	})

	// Failed
	.catch(function(response){
		dispatch({
			"type": "VOTE_FAILED",
		});
	});
}