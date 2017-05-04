import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Layout from './Layout';
import store from './store';

// Inject tap event plugin, as specified in the material-ui page
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(<Provider store={store}>
	<MuiThemeProvider>
		<Layout />
	</MuiThemeProvider>
</Provider> , document.getElementById('app'));