import React from 'react';

import {Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

/**
 * @property {object} this.props.meta - The meta details to show in the table
 */
export default class Meta extends React.Component{
	render(){
		let meta = _.map(this.props.meta, function(value, key){
			return (
				<TableRow key={key}>
					<TableRowColumn>{key}</TableRowColumn>
					<TableRowColumn>{value}</TableRowColumn>
				</TableRow>
			);
		});

		return (
			<Table selectable={false}>
				<TableBody stripedRows={true} displayRowCheckbox={false}>
					{meta}
				</TableBody>	
			</Table>
		);
	}
}