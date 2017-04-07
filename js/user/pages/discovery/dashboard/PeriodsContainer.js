import React from 'react';

import PeriodControls from './PeriodControls';

export default class PeriodsContainer extends React.Component{
	render(){
		return (
			<div className="pure-g periods-container">
				<PeriodControls />
			</div>
		);
	}
}