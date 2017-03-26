import React from 'react';

export default class Search extends React.Component{
	dropdown(){
		$(this).find("input").dropdown();
	}

	render(){
		return(
			<div>
				<div className="dropdown">
					<input onFocus={this.dropdown.bind(this)} className="form-control" data-toggle="dropdown" type="text" placeholder="Search topics here..." />
					<ul style={{width:"100%", zIndex: 9999999}} className="dropdown-menu">
						<li><a>Some option</a></li>
						<li><a>Some option</a></li>
						<li><a>Some option</a></li>
						<li className="divider"></li>
						<li><a>Some option</a></li>
						<li><a>Some option</a></li>
					</ul>
				</div>
			</div>
		);
	}
}