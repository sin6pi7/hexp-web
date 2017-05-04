import React from 'react';
import { connect } from 'react-redux';

import {  }

import Controls from './components/Controls';
import Table from './components/Table';
import Pagination from './components/Pagination';

const STYLES = {
	"container": {
		"width": "100vw",
		"height": "100vh",
		"top": "0",
		"left": "0",
		"padding": "20px 10% 20px 10%",
		"display": "flex",
		"flexDirection": "column",
	}
}

class Layout extends React.Component{
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