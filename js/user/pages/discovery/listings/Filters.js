import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class Filters extends React.Component{
	constructor(){
		super();
		this.state = {
			"open": false,
		}
	}

	open(){
		this.setState({
			"open": true,
		});
	}

	close(){
		this.setState({
			"open": false,
		});
	}

	render(){
		let close = (<FlatButton label="Close" onTouchTap={this.close.bind(this)} />)

		return (
			<div>
				<RaisedButton label="Filters" onTouchTap={this.open.bind(this)} />
				<Dialog 
					modal={true}
					title="Filter"
					onRequestClose={this.close.bind(this)}
					open={this.state.open}
					actions={close}
				>
				This is the content of the dialog
				</Dialog>
			</div>
		);
	}
}