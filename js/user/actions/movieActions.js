import _ from 'lodash';

/**
 * Get full details about the specified movie
 * 
 * @param  {number} id - The id of the movie to get full details about
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
				"payload": {
					"id": id,
					"title": "Some random title for movie " + id,
					"description": "Some random description for movie " + id + ". Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"tags": ["Tag number 1", "Tag number 2"],
					"periods": ["40's", "50's", "Medieval"],
					"regions": ["PT", "FR", "DE"],
					"poster": "/public/image.jpg",
					"images": ["/public/image2.jpg", "/public/image2.jpg", "/public/image2.jpg", "/public/image2.jpg", "/public/image2.jpg", "/public/image2.jpg"],
					"releaseDate": "2001",
					"country": "USA",
					"producer": "Robert Williams",
					"director": "Spielberg",
					"imdbScore": "8.1",
					"rottenTomatoes": "80%",
				}
			})
		}, 500);
	}
}