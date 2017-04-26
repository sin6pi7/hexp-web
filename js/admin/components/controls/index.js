import React from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import { setSelectedTab } from '../../actions/controlActions';

const tabsStyle = {
	"flex": "0",
}

const paperStyle = {
	"marginBottom": "12px",
	"padding": "10px",
}

/**
 * @property {array} tableNames - The various table names there are in the database schema
 */
class Controls extends React.Component{
	changeTab(tab){
		this.props.dispatch(setSelectedTab(tab));
	},

	render(){
		let _this = this;
		let tabs = _.map(this.props.tableNames, function(table, index){
			return ( <Tab value={table} key={index} label={table} /> );
		});

		return (
			<div>
				<Paper style={paperStyle} zDepth={1}>Something in the paper</Paper>

				<Tabs value={this.props.selectedTab} style={tabsStyle}>
					{tabs}
				</Tabs>
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"selectedTab": store.controls.selectedTab,
	}
})(Controls);