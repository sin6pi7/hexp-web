import React from 'react';

export default class Periods extends React.Component{
	render(){
		return (
			<div className="periods">
				<div className="btn-group btn-group-justified" role="group" aria-label="...">
					<a type="button" className="btn btn-default">Pre-historic</a>
					<a type="button" className="btn btn-default">Medieval</a>
					<a type="button" className="btn btn-default">Renaissants</a>
					<a type="button" className="btn btn-default">Industrial Era</a>
					<a type="button" className="btn btn-default">20's</a>
					<a type="button" className="btn btn-default">30's</a>
					<a type="button" className="btn btn-default">40's</a>
					<a type="button" className="btn btn-default">50's</a>
					<a type="button" className="btn btn-default">60's</a>
					<a type="button" className="btn btn-default">70's</a>
					<a type="button" className="btn btn-default">80's</a>
					<a type="button" className="btn btn-default">90's</a>
					<a type="button" className="btn btn-default">2000's</a>
					<a type="button" className="btn btn-default">2010-Forward</a>
				</div>
			</div>
		);
	}
}