/**
 * Set the selected tab
 * @param {string} tab - The new tab that was selected
 *
 * SET_SELECTED_TAB
 */
export function setSelectedTab(tab){
	return {
		"type": "SET_SELECTED_TAB",
		"payload": tab,
	}
}