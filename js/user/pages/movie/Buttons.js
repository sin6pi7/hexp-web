import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { blueGrey800, blueGrey50 } from 'material-ui/styles/colors';

const STYLES = {
	"container": {
		"width": "100%",
	},

	"button": {
		"marginBottom": "20px",
	},
}

export default class Buttons extends React.Component{
	render(){
		return (
			<div style={STYLES.container}>
				<RaisedButton style={STYLES.button} 
					labelColor={blueGrey800}
					backgroundColor={blueGrey50}
					fullWidth={true} 
					label="Share" />
				<RaisedButton style={STYLES.button} 
					labelColor={blueGrey800}
					backgroundColor={blueGrey50}
					fullWidth={true} 
					label="Trailer" />
				<RaisedButton style={STYLES.button} 
					labelColor={blueGrey800}
					backgroundColor={blueGrey50}
					fullWidth={true} 
					label="Where to watch" />
				<RaisedButton style={STYLES.button} 
					labelColor={blueGrey800}
					backgroundColor={blueGrey50}
					fullWidth={true} 
					label="Report an error" />
			</div>
		);
	}
}