import React from 'react';
import { connect } from 'react-redux';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import { red100, red700, red900, yellow100, yellow700, yellow900, blue100, blue700, blue900 } from 'material-ui/styles/colors';

class MessageContainer extends React.Component{
	render(){
		if(this.props.messages.length < 1)
			return null;

		let cards = _.map(this.props.messages, function(obj, index){
			let title = (<span><i className={"fa fa-" + styles[obj.type].icon}></i>&nbsp;{obj.title}</span>);
			return (
				<Card key={index} style={{"backgroundColor": styles[obj.type].backgroundColor}}>
					<CardTitle title={title} titleColor={styles[obj.type].titleColor}
						subtitle={obj.text} subtitleColor={styles[obj.type].subtitleColor} />
				</Card>
			);
		});

		return (
			<div className="message-container">
				{cards}
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"messages": store.messages.messages
	}
})(MessageContainer);

const styles={
	"danger": {
		"icon": "exclamation-triangle",
		"backgroundColor": red100,
		"titleColor": red900,
		"subtitleColor": red700,
	},
	"warning": {
		"icon": "dot-circle-o",
		"backgroundColor": yellow100,
		"titleColor": yellow900,
		"subtitleColor": yellow700,
	},
	"info": {
		"icon": "info",
		"backgroundColor": blue100,
		"titleColor": blue900,
		"subtitleColor": blue700,
	},
}