import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Layout from './Layout';
import store from './store';

// Inject tap event plugin, as specified in the material-ui page
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(<Provider store={store}>
	<BrowserRouter history={createBrowserHistory()}>
		<MuiThemeProvider>
			<div>
				<Layout />
			</div>
		</MuiThemeProvider>
	</BrowserRouter>
</Provider> , document.getElementById('app'));