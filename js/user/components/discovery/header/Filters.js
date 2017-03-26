import React from 'react';

export default class Filters extends React.Component{
	render(){
		return (
			<div>
				<p className="text-center">(Additional filters in use)</p>
				<div className="text-center">
					<button type="button" className="btn btn-default btn-sm btn-block">Filters</button>
				</div>
			</div>
		);
	}
}