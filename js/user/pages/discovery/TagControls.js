import React from 'react';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';

import _ from 'lodash';

import { discoverTags, clearTags } from '../../actions/tagActions';
import { setTag } from '../../actions/searchingActions';

// The text used for the "submit new topic" button, the last item on the menu list
const SUBMIT_NEW_TAG_TEXT = "+ Submit new topic";

// The style of the main container for the tag controls
const CONTAINER_STYLE = {
	"flex": "1",
}

// The style for the autoComplete component
const AUTO_COMPLETE_STYLE = {
	"width": "70%",
}

/**
 * @property {string} this.state.value - The value that is inputted in the autoComplete's text field
 * @property {array} this.state.dataSource - The data source to be supplied to the autoComplete component
 */
class TagControls extends React.Component{
	constructor(){
		super();
		this.state = {
			"value": "",
			"dataSource": [],
		}
	}

	/**
	 * Handler for when a new selection is made on the AutoComplete component
	 * @param  {object} item  - An object corresponding to the element selected
	 */
	onNewRequest(item){
		if(item.value === SUBMIT_NEW_TAG_TEXT)
			this.submitNewTag();
		else
			this.setTag(item.value);
	}

	/**
	 * Set the currently used tag for searching
	 * @param {integer} tag - The id of the tag to search for
	 */
	setTag(tag){
		this.props.dispatch(setTag(tag));
	}

	submitNewTag(tag){
		alert("Submitting new tag");
	}

	/**
	 * Handler for when the user updates the inputValue of the AutoComplete component
	 * @param  {string} search - The new inputValue of the AutoComplete component
	 */
	onUpdateInput(search){
		if(search === "")
			this.clearTags();
		else
			this.discoverTags(search);

		this.setState({"value": search});
	}

	/**
	 * Discover new tags that follow the specified search parameter
	 * @param  {string} search - The search term the tags must contain
	 */
	discoverTags(search){
		this.props.dispatch(discoverTags(search));
	}

	/**
	 * Clear all of the tags that were discovered
	 */
	clearTags(){
		this.props.dispatch(clearTags());
	}

	/**
	 * Build the data source to show in the AutoComplete menu
	 */
	buildDataSource(){
		let data = [];
		if(this.state.value !== ""){
			data = _.map(this.props.tags, function(value, key){
				return {
					"text": value,
					"value": key,
				}
			});

			data.push({
				"text": SUBMIT_NEW_TAG_TEXT,
				"value": SUBMIT_NEW_TAG_TEXT,
			});
		}

		this.state = {...this.state, "dataSource": data}
	}

	render(){
		this.buildDataSource();

		return (
			<div style={CONTAINER_STYLE} >
				<AutoComplete style={AUTO_COMPLETE_STYLE}
					dataSource={this.state.dataSource}
					disableFocusRipple={false}
					hintText="Enter a topic..."
					filter={AutoComplete.noFilter}
					onNewRequest={this.onNewRequest.bind(this)}
					onUpdateInput={this.onUpdateInput.bind(this)}
					searchText={this.state.value}
					openOnFocus={true}
					fullWidth={true}
				/>
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"tags": store.tags.tags,
	}
})(TagControls);