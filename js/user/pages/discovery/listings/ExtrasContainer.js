import React from 'react';
import { connect } from 'react-redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Filters from './Filters';

import { setResultsPerPage } from '../../../actions/searchingActions';

class ExtrasContainer extends React.Component{
	onNumberChange(event, index, value){
		this.props.dispatch(setResultsPerPage(value));
	}

	render(){
		return (
			<div className="extras-container">
				<Filters />

				<SelectField value={this.props.number} onChange={this.onNumberChange.bind(this)}>
					<MenuItem value={10} primaryText="10 results" />
					<MenuItem value={20} primaryText="20 results" />
					<MenuItem value={35} primaryText="35 results" />
					<MenuItem value={50} primaryText="50 results" />
				</SelectField>
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"number": store.searching.number
	}
})(ExtrasContainer);