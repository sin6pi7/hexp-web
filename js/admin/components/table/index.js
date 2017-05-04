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
	createTableRow(obj){
		return (
			<TableRow key={obj.id}>
				{_.map(databaseTableColumns[this.props.table], function(column, index){
					return (
						<TableRowColumn key={index}>{obj[column]}</TableRowColumn>
					);
				})}
			</TableRow>
		);
	}

	render(){
		const tableHeaderColumns = _.map(databaseTableColumns[this.props.table], function(obj, index){
			return ( <TableHeaderColumn key={index} >{obj}</TableHeaderColumn> );
		});

		const tableRows = _.map(this.props.elements, this.createTableRow.bind(this));

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
				<TableBody>
					{tableRows}
				</TableBody>
			</Table>
		);
	}
}

export default connect(store=>{
	return {
		"table": store.query.query.table,
		"elements": store.database.database.elements,
	}
})(AdminTable);