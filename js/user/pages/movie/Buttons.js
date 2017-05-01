import React from 'react';
import { withRouter } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import { blueGrey800, blueGrey50 } from 'material-ui/styles/colors';

import _ from 'lodash';

const STYLES = {
	"container": {
		"width": "100%",
	},

	"button": {
		"marginBottom": "20px",
	},
}

/**
 * @property {string} this.props.trailer - The link to the trailer of the movie
 */
class Buttons extends React.Component{
	watchTrailer(){
		window.open(this.props.trailer);
	}

	goBack(){
		if(this.props.history.length > 0)
			this.props.history.goBack();
		else
			this.props.history.replace("/discovery");
	}

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
					label="Watch trailer"
					disabled={_.isEmpty(this.props.trailer)}
					onTouchTap={this.watchTrailer.bind(this)} />
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
				<RaisedButton style={STYLES.button}
					labelColor={blueGrey800}
					backgroundColor={blueGrey50}
					fullWidth={true}
					label="Go back"
					onTouchTap={this.goBack.bind(this)} />
			</div>
		);
	}
}

export default withRouter(Buttons);