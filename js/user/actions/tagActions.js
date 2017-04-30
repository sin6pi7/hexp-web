import _ from 'lodash';

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
	return function(dispatch){
		dispatch({
			"type": "DISCOVER_TAGS_SENT"
		});

		setTimeout(function(){
			dispatch({
				"type": "DISCOVER_TAGS_DONE",
				"payload": fakeDiscoverTags(search, number),
			});
		}, 200);
	}
}

function fakeDiscoverTags(search, number){
	return _.map(_.range(number), function(i){
		return {
			"id": i,
			"name": "fakeTag " + i + ": " + search,
		}
	});
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