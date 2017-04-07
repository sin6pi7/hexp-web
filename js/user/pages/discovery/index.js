import React from 'react';
import { connect } from 'react-redux';

import { discoverMovies } from '../../actions/searchingActions';

import Dashboard from './dashboard';
import Listings from './listings';
import Footer from './footer';

class Discovery extends React.Component{
	componentDidMount(){
		if(!window.firstLoad){
			window.firstLoad = false;
			this.searchMoviesFirstTime();
		}
	}

	searchMoviesFirstTime(){
		this.props.dispatch(discoverMovies());
	}

	render(){
		return (
			<div className="pure-g discovery">
				<Dashboard />
				<Listings />
				<Footer />
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"number": store.searching.number,
	}
})(Discovery);