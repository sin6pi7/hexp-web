import _ from 'lodash';
import axios from 'axios';

/**
 * Discover a specified number of tags from the system that match the one we searched for
 * @param  {String} search The search term to use
 * @param  {Number} number The number of results to return
 *
 * DISCOVER_TAGS_SENT
 * DISCOVER_TAGS_DONE
 * DISCOVER_TAGS_FAILED
 */
export function discoverTags(search="", number=5){
	const URL = '/api/tags';

	return function(dispatch){
		dispatch({
			"type": "DISCOVER_TAGS_SENT"
		});

		axios({
			"method": "get",
			"url": URL,
			"params": {
				"name": search,
				"limit": number,
			},

		// Success
		}).then(function(response){
			dispatch({
				"type": "DISCOVER_TAGS_DONE",
				"payload": response.data.rows,
			});

		// Failed
		}).catch(function(response){
			dispatch({
				"type": "DISCOVER_TAGS_FAILED",
			});
		});
	}
}

/**
 * Clear all of the tags that were discovered
 *
 * CLEAR_TAGS
 */
export function clearTags(){
	return {
		"type": "CLEAR_TAGS",
	}
}

/**
 * Create a new tag in the system
 * @param  {string} tagName The name of the new tag
 * @param  {number} movieId The id of the movie to associate the new tag with
 *
 * CREATE_NEW_TAG_SENT
 * CREATE_NEW_TAG_DONE
 * CREATE_NEW_TAG_FAILED
 */
export function createNewTag(tagName, movieId){
	return function(dispatch){
		const URL = "/api/tags";

		dispatch({
			"type": "CREATE_NEW_TAG_SENT",
		});

		axios({
			"method": "post",
			"url": URL,
			"data": {
				"name": tagName,
				"movieId": movieId,
			}
		})

		// Success
		.then(function(response){
			dispatch({
				"type": "CREATE_NEW_TAG_DONE",
			});
		})

		// Failed
		.catch(function(response){
			dispatch({
				"type": "CREATE_NEW_TAG_FAILED",
			});
		});
	}
}