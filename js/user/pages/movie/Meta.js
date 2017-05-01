import React from 'react';

import {Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

const STYLES = {
	"table": {
		"border": "2px solid black",
	},

	"tableRowColumn": {
		"paddingTop": "0",
		"paddingBottom": "0",
	},
}

/**
 * @property {object} this.props.meta - The meta details to show in the table
 */
export default class Meta extends React.Component{
	render(){
		let meta = _.map(this.props.meta, function(value, key){
			return (
				<TableRow key={key}>
					<TableRowColumn style={STYLES.tableRowColumn}>{key}</TableRowColumn>
					<TableRowColumn style={STYLES.tableRowColumn}>{value}</TableRowColumn>
				</TableRow>
			);
		});

		return (
			<Table selectable={false} style={STYLES.table}>
				<TableBody stripedRows={true} displayRowCheckbox={false}>
					{meta}
				</TableBody>	
			</Table>
		);
	}
}