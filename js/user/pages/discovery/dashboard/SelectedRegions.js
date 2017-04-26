import React from 'react';
import { connect } from 'react-redux';
import regionData from '../../../../data/regions';

import _ from 'lodash';

const MAX_REGIONS_FOR_FULL_NAME=2;
const MAX_REGIONS_TO_SHOW=35;

class SelectedRegions extends React.Component{
	render(){
		let regions = [];
		if(this.props.regions.length === 0){
			regions = ["Everywhere"];
		}else if(this.props.regions.length <= 2){
			regions = _.map(this.props.regions, function(value){
				return regionData[value].name || value;
			}.bind(this));
		}else{
			regions = this.props.regions;
		}

		if(regions.length > MAX_REGIONS_TO_SHOW){
			regions = _.take(regions, MAX_REGIONS_TO_SHOW - 1);
			regions.push("+" + (this.props.regions.length - MAX_REGIONS_TO_SHOW + 1).toString() + " more...");
		}

		return (
			<div className="pure-u-10-24 selected-regions">
				<p>
					in regions: ({regions.join(", ")})
				</p>
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"regions": store.searching.regions,
	}
})(SelectedRegions);