import React from 'react';

import Search from './Search';
import Regions from './Regions';
import Filters from './Filters';
import Message from './Message';

export default class Header extends React.Component{
	render(){
		return(
			<div className="container-fluid header">
				<div className="row">
					<div className="col-md-2"><Search /></div>
					<div className="col-md-3"><Regions /></div>
					<div className="col-md-2"><Filters /></div>
					<div className="col-md-5"><Message /></div>
				</div>
			</div>
		);
	}
}