import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from './store';
import Discovery from './pages/discovery';
import Movie from './pages/movie';

// Import leaflet and set correct path for "images"
import L from 'leaflet';
L.Icon.Default.imagePath = '/leaflet/images';

// Inject tap event plugin, as specified in the material-ui page
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(<Provider store={store}>
	<BrowserRouter history={createBrowserHistory()}>
		<MuiThemeProvider>
			<div>
				<Route exact path="/" render={() => (<Redirect to="/discovery" />)} />
				<Switch>
					<Route path="/discovery" component={Discovery} />
					<Route path="/movie/:id?" component={Movie} />
				</Switch>
			</div>
		</MuiThemeProvider>
	</BrowserRouter>
</Provider> , document.getElementById('app'));