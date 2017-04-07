import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import { setRegions, clearRegions } from '../../../actions/searchingActions';

class RegionControls extends React.Component{
	constructor(){
		super();
		this.state = {
			"predefinedOpen": false,
			"predefinedButton": null,
		}
	}

	onPredefinedButtonTouchTap(event){
		event.preventDefault();

		this.setState({
			"predefinedOpen": true,
			"predefinedButton": event.currentTarget,
		});
	}

	onPredifedRequestClose(){
		this.setState({
			"predefinedOpen": false,
		});
	}

	onPredefinedItemTouchTap(event, menuItem, index){
		this.props.dispatch(setRegions(menuItem));
		this.setState({
			"predefinedOpen": false,
		});
	}

	render(){
		return (
			<div className="pure-u-6-24 region-controls">
				<RaisedButton onTouchTap={this.onPredefinedButtonTouchTap.bind(this)} label="Pre-defined Regions" />
				<Popover open={this.state.predefinedOpen}
					anchorEl={this.state.predefinedButton}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          			targetOrigin={{horizontal: 'left', vertical: 'top'}}
          			onRequestClose={this.onPredifedRequestClose.bind(this)}
          			useLayerForClickAway={false}
          			>
					<Menu onChange={this.onPredefinedItemTouchTap.bind(this)}>
						<MenuItem primaryText="Europe" value="europe"/>
						<MenuItem primaryText="North America" value="northamerica"/>
						<MenuItem primaryText="Asia" value="asia" />
						<MenuItem primaryText="South America" value="southamerica" />
						<MenuItem primaryText="Africa" value="africa" />
						<MenuItem primaryText="Oceania" value="oceania" />
					</Menu>
				</Popover>

				<RaisedButton label="Clear Regions" onTouchTap={() => {this.props.dispatch(clearRegions())}} />
			</div>
		);
	}
}

export default connect()(RegionControls);