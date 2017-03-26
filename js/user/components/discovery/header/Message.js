import React from 'react';

export default class Message extends React.Component{
	render(){
		return(
			<div style={{margin: 0}} className="alert alert-danger hidden">
				<h4>Warning</h4>
				<p>This is a message!!!!! ALERT ALERT ALERT</p>
			</div>
		);
	}
}