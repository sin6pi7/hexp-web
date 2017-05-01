import _ from 'lodash';

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
		dispatch({
			"type": "GET_MOVIE_SENT",
		});

		setTimeout(function(){
			dispatch({
				"type": "GET_MOVIE_DONE",
				"payload": fakeGetMovie(id),
			});
		}, 1000);
	}
}

function fakeGetMovie(id){
	let nImg = Math.floor((Math.random() * 8) + 3);
	return {
		"id": id,
		"title": "Title movie " + id,
		"description": "Description movie " + id,
		"tags": ["fakeTag", "fakeTag2"],
		"periods": ["20's", "30's"],
		"regions": ["PT", "FR"],
		"poster": "/public/image.jpg",
		"images": _.map(_.range(nImg), function(i){ return "/public/image2.jpg" }),
		"trailer_link": "https://www.google.com",
		"meta": {
			"Release Date": "2001",
			"Director": "John Doe",
			"Producer": "John Doe Two",
			"Cast": "Jack One, Jack Two & Jack Three",
			"Country": "USA",
			"IMDB Score": "7.8",
			"Rotten Tomatoes": "58%",
		},
	}
}

/**
 * Search movies by title
 * @param  {string} title - The title to search for
 * @param {number} number - The number of results to return
 *
 * CLEAR_MOVIES
 * SEARCH_MOVIES_SENT
 * SEARCH_MOVIES_DONE
 * SEARCH_MOVIES_FAILED
 */
export function searchMovies(title, number=5){
	return function(dispatch){
		dispatch({
			"type": "CLEAR_MOVIES"
		});

		dispatch({
			"type": "SEARCH_MOVIES_SENT",
		});

		setTimeout(function(){
			dispatch({
				"type": "SEARCH_MOVIES_DONE",
				"payload": _.map(_.range(number), function(obj){
					return {
						"id": obj,
						"title": "Title " + obj + ": " + title,
					}
				}),
			});
		}, 200);
	}
}