import React from 'react';

import Divider from 'material-ui/Divider';

import SearchContainer from './SearchContainer';
import MapContainer from './MapContainer';
import PeriodsContainer from './PeriodsContainer';

export default class Dashboard extends React.Component{
	render(){
		return (
			<div className="pure-u-1 pure-u-md-17-24 dashboard">
				<SearchContainer />
				<MapContainer />
				<PeriodsContainer />
			</div>
		);
	}
}