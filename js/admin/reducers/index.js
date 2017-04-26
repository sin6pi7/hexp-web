import { combineReducers } from 'redux';

import database from './databaseReducer';
import controls from './controlReducer';

export default combineReducers({
	database,
	controls,
});