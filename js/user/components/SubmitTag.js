import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';

import _ from 'lodash';

import { searchMovies } from '../actions/movieActions';

const NEW_TAG_ERROR = "Please enter a new topic name";
const MOVIE_ERROR = "Please select an existing movie";

/**
 * @property {boolean} this.props.open - Whether or not the dialog is open
 * @property {string} this.props.newTag - The name of the new tag to default to when opening
 * @property {function} this.props.close - The function to close the dialog
 */
class SubmitTag extends React.Component{
	constructor(){
		super();

		this.state = {
			"autoCompleteError": null,
			"newTagError": null,
			"newTag": "",
			"movieId": null,
		}

	}

	onCancel(){
		this.props.close();
	}

	onSubmit(){
		if(!_.isEmpty(this.state.newTag) && !_.isNil(this.state.movieId)){
			alert("Submitting: " + this.state.newTag + " -> " + this.state.movieId);
			this.props.close();
		}else{
			this.setState({
				"autoCompleteError": _.isNil(this.state.movieId) ? MOVIE_ERROR : null,
				"newTagError": _.isEmpty(this.state.newTag) ? NEW_TAG_ERROR : null,
			});
		}
	}

	onUpdateInput(search){
		this.props.dispatch(searchMovies(search));
	}

	setMovieId(id){
		if(!_.isInteger(id)){
			this.setState({
				"autoCompleteError": MOVIE_ERROR,
				"movieId": null,
			});
		}else{
			this.setState({
				"autoCompleteError": null,
				"movieId": id,
			});
		}
	}

	onMovieSelect(movie){
		this.setMovieId(_.toNumber(movie.value));
	}

	onTagChange(event, newTag){
		this.setState({
			"newTag": newTag,
			"newTagError": newTag === "" ? NEW_TAG_ERROR : null,
		});
	}

	componentWillReceiveProps(newProps){
		if(newProps.newTag !== this.props.newTag)
			this.setState({
				"newTag": newProps.newTag,
			});
	}

	render(){
		const actions = [
			<FlatButton key="cancel"
				label="Cancel"
				onTouchTap={this.onCancel.bind(this)}
			/>,
			<FlatButton key="submit"
				label="Submit"
				onTouchTap={this.onSubmit.bind(this)}
			/>
		];

		let dataSource = _.map(this.props.movies, function(value, key){
			return {
				"text": value,
				"value": key,
			}
		});

		if(dataSource.length < 1){
			dataSource = [{
				"text": "No results",
				"value": "No results",
			}];
		}

		return (
			<Dialog
				actions={actions}
				model={true}
				open={this.props.open}
			>
				<TextField
					fullWidth={true}
					value={this.state.newTag}
					floatingLabelText="New topic"
					onChange={this.onTagChange.bind(this)}
					errorText={this.state.newTagError}
					/>
				<AutoComplete 
					fullWidth={true}
					dataSource={dataSource}
					disableFocusRipple={false}
					hintText="Select a movie"
					onUpdateInput={this.onUpdateInput.bind(this)}
					openOnFocus={true}
					onNewRequest={this.onMovieSelect.bind(this)}
					errorText={this.state.autoCompleteError}
					/>
			</Dialog>
		);
	}
}

export default connect(store=>{
	return {
		"movies": store.movies.movieTitles,
	}
})(SubmitTag);