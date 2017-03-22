import React from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from '../actions/testActions';

class Main extends React.Component{
	constructor(){
		super();
	}

	increment(){
		const rng = Math.floor((Math.random() * 10) + 1);
		this.props.dispatch(increment(rng));
	}

	decrement(){
		const rng = Math.floor((Math.random() * 10) + 1);
		this.props.dispatch(decrement(rng));
	}

	render(){
		const my_number = this.props.my_number;
		return (
			<div>
				<p>My number: {my_number}</p>
				<button onClick={this.increment.bind(this)}>Increment</button>
				<button onClick={this.decrement.bind(this)}>Decrement</button>
			</div>
			);
	}
}

export default connect(store => {
	return{
		my_number: store.test.my_number
	}
})(Main);