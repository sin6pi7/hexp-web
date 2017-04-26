import React from 'react';
import { connect } from 'react-redux';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import _ from 'lodash';

const style = {
	"flex": "1",
}

/**
 * @property {string} tableName - The name of the table currently selected
 */
class HexpTable extends React.Component{
	render(){
		if(_.isEmpty(this.props.database) && _.isEmpty(this.props.tableName))
			return null;

		let table = this.props.database[this.props.tableName];
		let columns = _.map(_.keys(table), function(name, index){
			return ( <TableHeaderColumn key={index}>{name}</TableHeaderColumn> );
		});

		let fakeItems = _.map(_.range(50), function(i){
			let cols = _.map(_.keys(table), (i) => { return <TableRowColumn key={i}>{i}</TableRowColumn> });
			return (
				<TableRow>
					{cols}
				</TableRow>
			);
		});

		console.log(table);
		console.log(columns);
		console.log(fakeItems);

		return (
			<Table style={style}>
				<TableHeader>
					{columns}
				</TableHeader>
				<TableBody>
					{fakeItems}
				</TableBody>
			</Table>
		);
	}
}

export default connect(store=>{
	return {
		"database": store.database.schema
	}
})(HexpTable);