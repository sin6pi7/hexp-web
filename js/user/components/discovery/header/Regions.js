import React from 'react';

export default class Regions extends React.Component{
	render(){
		return(
			<div>
				<p>(Selected regions: PT, FR, DE, LT, AU)</p>
				<div>
					<div style={{marginRight: "5px"}} className="btn-group">
						<button type="button" className="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown">
							Predefined region sets&nbsp;
							<span className="caret"></span>
						</button>
						<ul className="dropdown-menu">
							<li><a>Europe</a></li>
							<li><a>Africa</a></li>
							<li><a>North America</a></li>
							<li><a>South America</a></li>
							<li><a>Asia</a></li>
							<li><a>Oceania</a></li>
							<li className="divider"></li>
							<li><a>Middle east</a></li>
							<li><a>South Africa</a></li>
							<li><a>Scandinavia</a></li>
							<li><a>Baltics</a></li>
							<li><a>Iberian Peninsula</a></li>
							<li><a>South China Sea</a></li>
							<li><a>Central America</a></li>
							<li><a>Latin America</a></li>
						</ul>
					</div>
					<button type="button" className="btn btn-default btn-sm">Clear regions</button>
				</div>
			</div>
		);
	}
}