import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * @property {boolean} this.props.open - Whether or not this component is open
 * @property {function} this.props.close - A function to close this component
 * @property {number} this.props.movieId - The id of the movie being viewed
 */
export default class Share extends React.Component{
	render(){
		const actions = (
			<FlatButton
				label="Close"
				onTouchTap={this.props.close} />
		);

		return (
			<Dialog
				actions={actions}
				open={this.props.open}
				modal={true}
				>
				<h1>Work in progress</h1>
			</Dialog>
		);
	}
}