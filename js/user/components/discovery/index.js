import React from 'react';
import { connect } from 'react-redux';

import { getListings } from '../../actions/listingsActions';

import Header from './header';
import Map from './map';
import ListingsContainer from './listingsContainer';
import Periods from './periods'

class Discovery extends React.Component{
	constructor(){
		super();

		const _this = this;
		$(window).on("resize orientationChange", function(event){
			_this.resize();
		});
	}

	resize(){
		// Sizing the whole discovery page
		const discovery = $(this.refs.discovery);
		if(!discovery.length > 0)
			return;
		
		discovery.height($(window).height() - discovery.position().top);

		// Sizing the map and listings container
		const columnHeight = $(this.refs.mapCol).height();

		const map = $(this.refs.mapCol).children();
		const lis = $(this.refs.lisCol).children();

		map.height(columnHeight 
			- parseInt(map.css("paddingTop")) 
			- parseInt(map.css("paddingBottom")) 
			- parseInt(map.css("borderTopWidth")) 
			- parseInt(map.css("borderBottomWidth")));

		lis.height(columnHeight 
			- parseInt(lis.css("paddingTop")) 
			- parseInt(lis.css("paddingBottom")) 
			- parseInt(lis.css("borderTopWidth")) 
			- parseInt(lis.css("borderBottomWidth")));
	}

	componentDidMount(){
		this.resize();
		this.props.dispatch(getListings());
	}

	render(){
		return (
			<div ref="discovery" className="discovery">
				<Header />
				<div className="container-fluid body">
					<div className="row">
						<div ref="mapCol" className="col-md-7"><Map /></div>
						<div ref="lisCol" className="col-md-5"><ListingsContainer /></div>
					</div>
				</div>
				<Periods />
			</div>
		);
	}
}

export default connect()(Discovery);