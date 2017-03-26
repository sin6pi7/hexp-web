import React from 'react';

export default class Description extends React.Component{
	render(){
		return (
			<div className="description">
				<p>{this.props.description}</p>
			</div>
		);
	}
}