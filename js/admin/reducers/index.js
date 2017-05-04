import { combineReducers } from 'redux';

import database from './databaseReducer';
import query from './queryReducer';

export default combineReducers({
	database,
	query,
});