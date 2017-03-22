import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middleware = applyMiddleware(thunk, logger());

import reducer from './reducers';

export default createStore(reducer, middleware);