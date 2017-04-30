import _ from 'lodash';

/**
 * Discover a list of movies. This will send out a CLEAR_MOVIES action if the page being searched = 0
 * @param  {string} tag     The tag the movie must contain
 * @param  {Array}  periods The periods the movie must contain
 * @param  {Array}  regions The regions the movie must contain
 * @param  {Number} page    The number of the current page to search
 * @param  {Number} number  The number of results per page
 *
 * CLEAR_MOVIES
 * DISCOVER_MOVIES_SENT
 * DISCOVER_MOVIES_DONE
 * DISCOVER_MOVIES_FAILED
 */
export function discoverMovies(tag=null, periods=[], regions=[], page=0, number=10){
	return function(dispatch){
		if(page === 0){
			dispatch({
				"type": "CLEAR_MOVIES",
			});
		}

		dispatch({
			"type": "DISCOVER_MOVIES_SENT",
		});

		setTimeout(function(){
			dispatch({
				"type": "DISCOVER_MOVIES_DONE",
				"payload": fakeDiscoverMovies(tag, periods, regions, page, number),
			});
		}, 500);
	}
}

/**
 * Clear the results for movies we already have, basicly reset the searching algorithm
 *
 * CLEAR_MOVIES
 */
export function clearMovies(){
	return {
		"type": "CLEAR_MOVIES",
	}
}

function fakeDiscoverMovies(tag, periods, regions, page, number){
	return _.map(_.range(number), function(i){
		return {
			"id": i*(page+1),
			"title": "Title movie: " + i*(page+1),
			"description": "Description movie: " + i*(page+1),
			"tags": ["fakeTag"],
			"periods": periods,
			"regions": regions,
			"poster": "/public/image.jpg",

		}
	});
}

/**
 * Select the tag to search for
 * @param {String} tag The tag to search for
 *
 * SET_TAG
 */
export function setTag(tag=""){
	return {
		"type": "SET_TAG",
		"payload": tag,
	}
}

/**
 * Select additional regions to search for
 * @param  {Array}  regions The additional regions to search for
 *
 * SELECT_REGIONS
 */
export function selectRegions(regions=[]){
	return {
		"type": "SELECT_REGIONS",
		"payload": regions,
	}
}

/**
 * Deselect regions to search for
 * @param  {Array}  regions The regions to deselect
 *
 * DESELECT_REGIONS
 */
export function deselectRegions(regions=[]){
	return {
		"type": "DESELECT_REGIONS",
		"payload": regions,
	}
}

/**
 * Set the regions to search for. Setting to empty array clears the regions
 * @param {Array|string} regions Either an array of regions, or the name of a predefined selection of regions
 *
 * SET_REGIONS
 */
export function setRegions(regions=[]){
	return {
		"type": "SET_REGIONS",
		"payload": regions,
	}
}

/**
 * Select periods to search for
 * @param  {Array}  periods The periods to search for
 *
 * SELECT_PERIODS
 */
export function selectPeriods(periods=[]){
	return {
		"type": "SELECT_PERIODS",
		"payload": periods,
	}
}

/**
 * Deselect periods to search for
 * @param  {Array}  periods The periods to deselect
 *
 * DESELECT_PERIODS
 */
export function deselectPeriods(periods=[]){
	return {
		"type": "DESELECT_PERIODS",
		"payload": periods,
	}
}