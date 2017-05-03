import React from 'react';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import _ from 'lodash';

import periodData from '../../data/periods';
import regionData from '../../data/regions';

/**
 * @property {integer} this.props.movieId - The id of the movie we are submitting feedback about
 * @property {boolean} this.props.open - Whether or not this component is open
 * @property {function} this.props.close - A function to close the dialog box
 */
class SubmitFeedback extends React.Component{
	constructor(){
		super();

		this.state = {
			"feedbackType": null,
			"element": null,
		}
	}

	onCancel(){
		this.props.close();
	}

	onSubmit(){
		alert("Submitting");
		this.props.close();
	}

	onFeedbackTypeChange(event, key, value){
		this.setState({
			"feedbackType": value,
		});
	}

	createLinkToTopic(){
		return (
			<AutoComplete
				floatingLabelText="Select Topic"
				dataSource={[]} />
		);
	}

	createUnlinkFromTopic(){
		const tags = _.map(this.props.movies[this.props.movieId].tags, function(obj){
			return (<MenuItem key={obj} value={obj} primaryText={obj} />);
		});

		return (
			<SelectField
				floatingLabelText="Select Topic"
				fullWidth={true}
				value={this.state.element}
				onChange={(e, k, value) => this.setState({"element": value})} >
				{tags}
			</SelectField>
		);
	}

	createLinkToPeriod(){
		return (
			<AutoComplete
				floatingLabelText="Select Period"
				dataSource={[]} />
		);
	}

	createUnlinkFromPeriod(){
		const periods = _.map(this.props.movies[this.props.movieId].periods, function(obj){
			return (<MenuItem key={obj} value={obj} primaryText={obj} />);
		});

		return (
			<SelectField
				floatingLabelText="Select Period"
				fullWidth={true}
				value={this.state.element}
				onChange={(e, k, value) => this.setState({"element": value})} >
				{periods}
			</SelectField>
		);
	}

	createLinkToRegion(){
		return (
			<AutoComplete
				floatingLabelText="Select Region"
				dataSource={[]} />
		);
	}

	createUnlinkFromRegion(){
		const regions = _.map(this.props.movies[this.props.movieId].regions, function(obj){
			return (<MenuItem key={obj} value={obj} primaryText={obj} />);
		});

		return (
			<SelectField
				floatingLabelText="Select Region"
				fullWidth={true}
				value={this.state.element}
				onChange={(e, k, value) => this.setState({"element": value})} >
				{regions}
			</SelectField>
		);
	}

	getFeedbackContext(){
		switch(this.state.feedbackType){
			case "linkTopic": return this.createLinkToTopic();
			case "unlinkTopic": return this.createUnlinkFromTopic();
			case "linkPeriod": return this.createLinkToPeriod();
			case "unlinkPeriod": return this.createUnlinkFromPeriod();
			case "linkRegion": return this.createLinkToRegion();
			case "unlinkRegion": return this.createUnlinkFromRegion();
			default: return null;
		}
	}

	render(){
		const actions = [
			<FlatButton
				key="cancel"
				label="Cancel"
				onTouchTap={this.onCancel.bind(this)}
				/>,
			<FlatButton
				key="submit"
				label="Submit"
				onTouchTap={this.onSubmit.bind(this)}
				/>
		];

		let title = "";

		if(this.props.movies[this.props.movieId]){
			let movie = this.props.movies[this.props.movieId];
			title = movie.title;
		}

		return (
			<Dialog 
				actions={actions}
				model={true}
				open={this.props.open}
			>
				<h3>{title}</h3>
				<Divider />
				<SelectField
					floatingLabelText="Feedback type"
					fullWidth={true}
					value={this.state.feedbackType}
					onChange={this.onFeedbackTypeChange.bind(this)} >
					<MenuItem value="linkTopic" primaryText="Link with topic" />
					<MenuItem value="unlinkTopic" primaryText="Unlink from topic" />
					<MenuItem value="linkPeriod" primaryText="Link with period" />
					<MenuItem value="unlinkPeriod" primaryText="Unlink from period" />
					<MenuItem value="linkRegion" primaryText="Link with region" />
					<MenuItem value="unlinkRegion" primaryText="Unlink from region" />
				</SelectField>
				{this.getFeedbackContext()}
			</Dialog>

		);
	}
}

export default connect(store=>{
	return {
		"movies": store.movies.movies,
	}
})(SubmitFeedback);