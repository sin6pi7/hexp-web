import React from 'react';
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component{
	render(){
		return (
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">History Explorer</Link>
					</div>
				</div>
			</nav>
		)
	}
}