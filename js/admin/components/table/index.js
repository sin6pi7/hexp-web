import React from 'react';
import { connect } from 'react-redux';

import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table';

import _ from 'lodash';

import databaseTableColumns from '../../data/databaseTableColumns';

const STYLES = {
	"table": {
		"flex": "1",
	}
}

class AdminTable extends React.Component{
	render(){
		const tableHeaderColumns = _.map(databaseTableColumns[this.props.table], function(obj){
			return ( <TableHeaderColumn>{obj}</TableHeaderColumn> );
		});

		return (
			<Table style={STYLES.table}>
				<TableHeader
					displaySelectAll={false}
					enableSelectAll={false}
				>
					<TableRow>
						{tableHeaderColumns}
					</TableRow>
				</TableHeader>
			</Table>
		);
	}
}

export default connect(store=>{
	return {
		"table": store.query.query.table,
	}
})(AdminTable);