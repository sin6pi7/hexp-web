import React from 'react';

import SearchInput from './SearchInput';
import SelectedRegions from './SelectedRegions';
import RegionControls from './RegionControls';

export default class SearchContainer extends React.Component{
	render(){
		return (
			<div className="pure-g search-container">
				<SearchInput />
				<SelectedRegions />
				<RegionControls />
			</div>
		);
	}
}