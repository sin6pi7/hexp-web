import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import { discoverMovies } from '../../actions/searchingActions';

import Dashboard from './dashboard';
import Listings from './listings';
import Footer from './footer';

class Discovery extends React.Component{
	componentDidMount(){
		if(!window.firstDiscovery){
			window.firstDiscovery = false;
			this.discoverMovies();
		}
	}

	componentWillReceiveProps(nextProps){
		if(!_.isEqualWith(this.props.searching, nextProps.searching, function(objValue, othValue, key){
			if(key == "statusDiscoverMovies"){
				return true;
			}else{
				return undefined;
			}
		})){
			this.discoverMovies();
		}
	}

	discoverMovies(){
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
		"searching": store.searching,
	}
})(Discovery);