import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import { togglePeriods } from '../../../actions/searchingActions';

class PeriodControls extends React.Component{

	togglePeriod(period){
		this.props.dispatch(togglePeriods([period]));
	}

	render(){
		let _this = this;
		let buttons = _.map(this.props.periods, function(value, index){
			return (
				<RaisedButton 
					key={index} 
					label={value}
					primary={_.indexOf(_this.props.selectedPeriods, value) !== -1 ? true : false}
					onTouchTap={()=>{_this.togglePeriod(value);}}
				/>
			);
		});

		return (
			<div className="pure-u-1-1 period-controls">
				{buttons}
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"selectedPeriods": store.searching.periods,
		"periods": store.periods.periods
	}
})(PeriodControls);