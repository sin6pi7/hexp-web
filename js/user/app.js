import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from './store';
import Navbar from './components/navbar';
import Discovery from './components/discovery';
import Listing from './components/listing';

// Import leaflet and set correct path for "images"
import L from 'leaflet';
L.Icon.Default.imagePath = '/leaflet/images';

// Import $ as a global variable and load all of bootstraps js plugins onto the $ variable
window.$ = window.jQuery = require('jquery');
require('bootstrap');

ReactDOM.render(<Provider store={store}>
	<BrowserRouter history={createBrowserHistory()}>
		<div id="page-wrapper">
			<Route exact path="/" render={() => (<Redirect to="/discovery" />)}/>
			<Route path="/discovery" component={Discovery} />
			<Route path="/listing/:id" component={Listing} />
		</div>
	</BrowserRouter>
</Provider> , document.getElementById('app'));