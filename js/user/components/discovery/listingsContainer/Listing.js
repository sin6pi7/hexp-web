import React from 'react';
import { withRouter } from 'react-router-dom';

/**
 * A listing in the discovery page
 *
 * @property {String} this.props.poster - A url to the poster of this listing
 * @property {Number} this.props.id - The ID that identifies this listing
 * @property {String} this.props.title - The title of the listing
 * @property {String} this.props.description - The description of the listing
 */
class Listing extends React.Component{
	onClick(){
		this.props.history.push("/listing/" + this.props.id);
	}

	render(){
		return (
			<div onClick={this.onClick.bind(this)} className="media listing">
				<div className="media-left">
					<img className="media-object" src={this.props.poster} />
				</div>
				<div className="media-body">
					<h3 className="media-heading">{this.props.title}</h3>
					<p className="description">{this.props.description}</p>
				</div>
			</div>
		);
	}
}

export default withRouter(Listing);