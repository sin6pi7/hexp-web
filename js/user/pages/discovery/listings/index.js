import React from 'react';

import MessageContainer from './MessageContainer';
import MovieList from './MovieList';
import ExtrasContainer from './ExtrasContainer';

export default class Listings extends React.Component{
	render(){
		return (
			<div className="pure-u-1 pure-u-md-7-24 listings">
				<MessageContainer />
				<MovieList />
				<ExtrasContainer />
			</div>
		);
	}
}