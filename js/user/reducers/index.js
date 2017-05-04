import { combineReducers } from 'redux';

import searching from './searchingReducer';
import movies from './movieReducer';
import tags from './tagReducer';
import voting from './votingReducer';

export default combineReducers({
	searching,
	movies,
	tags,
	voting,
});