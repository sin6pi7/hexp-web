import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getMovie } from '../../actions/movieActions';

import Sidebar from './sidebar';
import Dashboard from './dashboard';

class Movie extends React.Component{
	componentWillMount(){
		this.props.dispatch(getMovie(this.props.match.params.id));
	}

	render(){
		return (
			<div className="pure-g movie">
				<Sidebar />
				<Dashboard />
			</div>
		);
	}
}

export default withRouter(connect(store=>{
	return {

	}
})(Movie));