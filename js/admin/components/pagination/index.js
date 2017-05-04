import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import _ from 'lodash';

import { changePage } from '../../actions/queryActions';

const NUMBER_PAGES_TO_SHOW = 8;

const STYLES = {
	"container": {
		"display": "flex",
		"justifyContent": "center",
		"borderTop": "2px solid black",
		"paddingTop": "4px",
	}
}

class Pagination extends React.Component{
	getPagesToShow(){
		let pages = [];

		let maxPage = (this.props.results / this.props.limit);
		if(maxPage < 0)
			return [0];

		if(this.props.page < NUMBER_PAGES_TO_SHOW - 1)
			return _.range(Math.min(maxPage, NUMBER_PAGES_TO_SHOW));

		return _.range((this.props.page - NUMBER_PAGES_TO_SHOW/2), Math.min(maxPage, (this.props.page + NUMBER_PAGES_TO_SHOW/2)));
	}

	goToPage(page){
		this.props.dispatch(changePage(page));
	}

	render(){
		const pagesToShow = _.map(this.getPagesToShow(), function(n){
			return (
				<RaisedButton key={n}
					label={n.toString()}
					onTouchTap={(()=>{this.goToPage(n)}).bind(this)}
					primary={(this.props.page === n)} />
			);
		}.bind(this));

		return (
			<div style={STYLES.container}>
				{pagesToShow}
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"limit": store.query.query.limit,
		"results": store.query.query.results,
		"page": store.query.query.page,
	}
})(Pagination);