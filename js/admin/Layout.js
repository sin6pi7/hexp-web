import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import { getElements } from './actions/databaseActions';

import Controls from './components/controls';
import Table from './components/table';
import Pagination from './components/pagination';

const STYLES = {
	"container": {
		"position": "absolute",
		"width": "100%",
		"height": "100%",
		"top": "0",
		"left": "0",
		"padding": "20px 10% 20px 10%",
		"display": "flex",
		"flexDirection": "column",
	}
}

class Layout extends React.Component{
	componentDidMount(){
		this.getElements();
	}

	getElements(){
		const { table, limit, page, options } = this.props.query;
		this.props.dispatch(getElements(table, limit, page, options));
	}

	componentDidUpdate(prevProps, prevState){
		const p1 = _.omit(this.props.query, 'results');
		const p2 = _.omit(prevProps.query, 'results');

		if(!_.isEqual(p1, p2)){
			this.getElements();
		}
	}

	render(){
		return (
			<div style={STYLES.container}>
				<Controls />
				<Table />
				<Pagination />
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"query": store.query.query,
	}
})(Layout);