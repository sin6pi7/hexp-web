import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

import _ from 'lodash';

import { getDatabaseSchema } from './actions/databaseActions';

import Controls from './components/controls';
import Table from './components/table';
import Paging from './components/paging';

const style = {
	"boxSizing": "border-box",
	"display": "flex",
	"flexDirection": "column",
	"width": "100%",
	"height": "100%",
	"paddingLeft": "5%",
	"paddingRight": "5%",
	"paddingTop": "2%",
	"paddingBottom": "2%",
}

class Layout extends React.Component{
	componentDidMount(){
		if(_.isEmpty(this.props.databaseSchema))
			this.props.dispatch(getDatabaseSchema());
	}

	render(){
		let tables = _.keys(this.props.databaseSchema);

		return (
			<div style={style}>
				<Controls tableNames={tables} />
				<Route path="/:table?" component={({match})=><Table databaseTable={match.params.table} />} />
				<Paging />
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"databaseSchema": store.database.schema
	}
})(Layout);