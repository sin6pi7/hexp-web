import { combineReducers } from 'redux';

import searching from './searchingReducer';
import movies from './movieReducer';
import tags from './tagReducer';

export default combineReducers({
	searching,
	movies,
	tags,
});