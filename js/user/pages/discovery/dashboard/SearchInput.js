import React from 'react';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';

import { getTags } from '../../../actions/tagActions';
import { setTag } from '../../../actions/searchingActions';

const SUBMIT_NEW_TAG_STRING = "+ Submit as new tag";

class SearchInput extends React.Component{
	constructor(){
		super();
		this.state = {
			"numberTags": 5,
		}
	}

	onNewRequest(input, index){
		if(input === SUBMIT_NEW_TAG_STRING){
			alert("Submitting new tags under construction");
		}else{
			this.props.dispatch(setTag(input));
		}
	}

	onUpdateInput(value){
		this.props.dispatch(getTags(value, this.state.numberTags));
	}

	render(){
		// copy the array of tags so we dont mess with it
		let tags = this.props.tags.slice();
		tags.push(SUBMIT_NEW_TAG_STRING);
		
		return (
			<div className="pure-u-8-24 search-input">	
				<AutoComplete 
					style={{"marginTop": 0}}
					dataSource={tags}
					hintText="Search for topics..."
					fullWidth={true}
					onUpdateInput={this.onUpdateInput.bind(this)}
					onNewRequest={this.onNewRequest.bind(this)}	
					openOnFocus={true}
					filter={()=>{return true}}/>
			</div>
		);
	}
}

export default connect((store) => {
	return {
		tags: store.tags.tags
	}
})(SearchInput);