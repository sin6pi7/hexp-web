import _ from 'lodash';

/**
 * Change the current table being edited/viewed
 * @param  {string} table The name of the new table to view/edit
 *
 * CHANGE_TABLE
 */
export function changeTable(table){
	if(_.isNil(table))
		return;

	return {
		"type": "CHANGE_TABLE",
		"payload": table, 
	}
}

/**
 * Change the current page being edited/viewed
 * @param  {number} page The page to jump to
 *
 * CHANGE_PAGE
 */
export function changePage(page){
	if(page < 0)
		return;

	return {
		"type": "CHANGE_PAGE",
		"payload": page,
	}
}