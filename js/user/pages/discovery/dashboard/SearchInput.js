import React from 'react';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';

import { getTags } from '../../../actions/tagActions';


class SearchInput extends React.Component{
	constructor(){
		super();
		this.state = {
			"numberTags": 5,
		}
	}

	onUpdateInput(value){
		this.props.dispatch(getTags(value, this.state.numberTags));
	}

	render(){
		let tags = this.props.tags.slice();
		tags.push("+ Submit as new tag");
		
		return (
			<div className="pure-u-8-24 search-input">	
				<AutoComplete 
					style={{"marginTop": 0}}
					dataSource={tags}
					hintText="Search for topics..."
					fullWidth={true}
					onUpdateInput={this.onUpdateInput.bind(this)}
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