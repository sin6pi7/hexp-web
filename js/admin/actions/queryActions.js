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