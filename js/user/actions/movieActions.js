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