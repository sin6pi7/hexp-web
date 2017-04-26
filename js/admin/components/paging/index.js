import React from 'react';

import FlatButton from 'material-ui/FlatButton';

const style = {
	"flex": "0",
	"textAlign": "center",
}

const buttonStyle = {
	"minWidth": "0",
}

export default class Paging extends React.Component{
	render(){
		return (
			<div style={style}>
				<FlatButton style={buttonStyle} label="1" />
				<FlatButton style={buttonStyle} label="1" />
				<FlatButton style={buttonStyle} label="1" />
				<FlatButton style={buttonStyle} label="1" />
				<FlatButton style={buttonStyle} label="1" />
				<FlatButton style={buttonStyle} label="1" />
			</div>
		);
	}
}