import React from 'react';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar';

class NewTagSnackbar extends React.Component{
	constructor(){
		super();

		this.state = {
			"open": false,
		}
	}

	open(){ this.setState({"open": true}); }
	close(){ this.setState({"open": false}) }

	componentWillReceiveProps(newProps){
		if(this.props.status !== newProps.status){
			if(newProps.status === "sent")
				this.close();
			else
				this.open();
		}
	}

	render(){
		let message = this.props.status === 'done' 
			? "New topic submitted succesfully" : "Could not submit new topic. Please try again later";

		return (
			<Snackbar
				message={message}
				open={this.state.open}
				onRequestClose={this.close.bind(this)}
				autoHideDuration={5000}
			 />
		);
	}
}

export default connect(store=>{
	return {
		"status": store.tags.statusCreateNewTag,
	}
})(NewTagSnackbar);