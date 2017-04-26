import _ from 'lodash';

/**
 * Set the current searching tag to the one specified
 * @param {string} tag - The tag to search for
 *
 * SET_TAG
 */
export function setTag(tag){
	return {
		"type": "SET_TAG",
		"payload": tag
	}
}

/**
 * Clear the current searching tag
 *
 * CLEAR_TAG
 */
export function clearTag(){
	return {
		"type": "CLEAR_TAG",
	}
}

/**
 * Select regions for searching
 * @param  {Array}  regions - The regions to select
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
 * Deselect regions for searching
 * @param  {Array}  regions - The regions to deselect
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
 * Set the regions for searching, either by specifying an array of regions or a name of predefined regions
 * @param {array|string} regions - The regions to search for or the predefined regions name
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
 * Select periods for searching
 * @param  {Array}  periods - The periods to select
 *
 * SELECT_PERIODS
 */
export function selectPeriods(periods=[]){
	return {
		"type": "SELECT_PERIODS",
		"payload": periods
	}
}

/**
 * Deselect periods for searching
 * @param  {Array}  periods - The periods to deselect
 *
 * DESELECT_PERIODS
 */
export function deselectPeriods(periods=[]){
	return {
		"type": "DESELECT_PERIODS",
		"payload": periods,
	}
}

/**
 * Toggle periods for searching
 * @param  {Array}  periods - The periods to toggle
 *
 * TOGGLE_PERIODS
 */
export function togglePeriods(periods=[]){
	return {
		"type": "TOGGLE_PERIODS",
		"payload": periods,
	}
}

/**
 * Clear all of the selected periods
 *
 * CLEAR_PERIODS
 */
export function clearPeriods(){
	return {
		"type": "CLEAR_PERIODS",
	}
}

/**
 * Set the number of results per page
 * @param {Number} number - The number of results per page
 *
 * SET_RESULTS_PER_PAGE
 */
export function setResultsPerPage(number=10){
	return {
		"type": "SET_RESULTS_PER_PAGE",
		"payload": number,
	}
}

/**
 * Discover a list of movies based on the given filters and criteria
 * @param  {string} tag          The tag the movie must have
 * @param  {Array}  regions      All of the regions the movie must portray
 * @param  {Array}  periods      All of the periods the movie must portray
 * @param  {Number} number       The number of results to return
 * @param  {Number} page         The page to return
 * @param  {integer} releasedDate The minimum released date of the movie
 *
 * DISCOVER_MOVIES_SENT
 * DISCOVER_MOVIES_DONE
 * DISCOVER_MOVIES_FAILED
 */
export function discoverMovies(tag=null, regions=[], periods=[], number=10, page=0, releasedDate=null){
	return function(dispatch){
		dispatch({
			"type": "DISCOVER_MOVIES_SENT",
		});

		setTimeout(function(){
			let movies = _.map(_.range(number), function(val){
				return {
					"id": val,
					"title": "Title of movie " + val,
					"description": "Description of movie " + val,
					"poster": "/public/image.jpg",
					"tags": ["World War 2", "Other Tag " + val],
					"periods": ["40's", "50's"],
					"regions": ["PT", "FR"],
				}
			});

			dispatch({
				"type": "DISCOVER_MOVIES_DONE",
				"payload": movies,
			});
		}, 2000);
	}
}