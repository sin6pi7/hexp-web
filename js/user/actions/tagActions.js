import _ from 'lodash';

/**
 * Get a number of tags from the server
 * @param  {string} search - The string to search tags for
 * @param  {integer} number - How many results to get from the server
 *
 * GET_TAGS_SENT
 * GET_TAGS_DONE
 * GET_TAGS_FAILED
 */
export function getTags(search="", number=5){
	return function(dispatch){
		dispatch({
			type: "GET_TAGS_SENT",
		});

		setTimeout(function(){
			dispatch({
				type: "GET_TAGS_DONE",
				payload: _.map(_.range(number), (o) => {return search + o.toString();}),
			});

			/*
			dispatch({
				type: "GET_TAGS_FAILED",
			});*/
		}, 0);

	}
}