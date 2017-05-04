import _ from 'lodash';
import axios from 'axios';

/**
 * Get elements from the database
 * @param  {string} table The table to get them from
 * @param  {number} limit The maximum amount of results per page
 * @param  {number} page  The page to get
 * @param {object} options The options to pass to the server API
 *
 * GET_ELEMENTS_SENT
 * GET_ELEMENTS_DONE
 * GET_ELEMENTS_FAILED
 */
export function getElements(table, limit, page, options){
	switch(table){
		case "movies": return getMovieElements(limit, page, options);
		case "tags": return getTagElements(limit, page, options);
		case "movie_links": return getMovieLinksElements(limit, page, options);
	}
}

function getMovieElements(limit, page, options){
	return function(dispatch){
		const URL = "/api/movies";
	
		dispatch({
			"type": "GET_ELEMENTS_SENT",
		});

		axios({
			"method": "get",
			"url": URL,
			"params": {
				"limit": limit,
				"page": page,
			},
		})

		.then(function(response){
			dispatch({
				"type": "GET_ELEMENTS_DONE",
				"payload": response.data,
			});
		})

		.catch(function(response){
			dispatch({
				"type": "GET_ELEMENTS_FAILED",
			});
		});

	}
}

function getTagElements(limit, page, options){
	return function(dispatch){
		const URL = "/api/tags";
	
		dispatch({
			"type": "GET_ELEMENTS_SENT",
		});

		axios({
			"method": "get",
			"url": URL,
			"params": {
				"limit": limit,
				"page": page,
			},
		})

		.then(function(response){
			dispatch({
				"type": "GET_ELEMENTS_DONE",
				"payload": response.data,
			});
		})

		.catch(function(response){
			dispatch({
				"type": "GET_ELEMENTS_FAILED",
			});
		});

	}
}

function getMovieLinksElements(limit, page, options){
	return function(dispatch){
		const URL = "/api/votes";
	
		dispatch({
			"type": "GET_ELEMENTS_SENT",
		});

		axios({
			"method": "get",
			"url": URL,
			"params": {
				"limit": limit,
				"page": page,
			},
		})

		.then(function(response){
			dispatch({
				"type": "GET_ELEMENTS_DONE",
				"payload": response.data,
			});
		})

		.catch(function(response){
			dispatch({
				"type": "GET_ELEMENTS_FAILED",
			});
		});

	}
}