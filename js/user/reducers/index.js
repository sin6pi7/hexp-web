import { combineReducers } from 'redux';

import movies from './movieReducer';
import tags from './tagsReducer';
import regions from './regionsReducer';
import searching from './searchingReducer';
import periods from './periodsReducer';
import messages from './messageReducer';

export default combineReducers({
	movies,
	tags,
	regions,
	searching,
	periods,
	messages,
});