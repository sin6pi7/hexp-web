import React from 'react';

import Divider from 'material-ui/Divider';

import Header from './Header';
import Description from './Description';
import Details from './Details';

export default class Dashboard extends React.Component{
	render(){
		return (
			<div className="pure-u-1-1 pure-u-md-16-24 dashboard">
				<Header />
				<Divider />
				<Description />
				<Divider />
				<Details />
			</div>
		);
	}
}