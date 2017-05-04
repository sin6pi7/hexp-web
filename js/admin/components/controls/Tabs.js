import React from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';

import { changeTable } from '../../actions/queryActions';

class AdminTabs extends React.Component{
	constructor(){
		super();

		this.state = {
			"value": "movies",
		}
	}

	onChange(value){
		this.props.dispatch(changeTable(value));
	}

	render(){
		return (
			<Tabs
				onChange={this.onChange.bind(this)}
				value={this.state.value}
			>
				<Tab label="Movies" value="movies" />
				<Tab label="Tags" value="tags" />
			</Tabs>
		);
	}
}

export default connect()(AdminTabs);