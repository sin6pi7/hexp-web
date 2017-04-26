import React from 'react';
import { connect } from 'react-redux';
import regionData from '../../../../data/regions';

import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import { setRegions } from '../../../actions/searchingActions';

class RegionControls extends React.Component{
	constructor(){
		super();

		let predefinedRegions = [];
		_.forEach(regionData, function(obj){
			predefinedRegions = _.union(predefinedRegions, [obj.region, obj.subregion]);
		});

		this.state = {
			"predefinedOpen": false,
			"predefinedButton": null,
			"menuItems": _.map(predefinedRegions, function(obj, index){
				return (<MenuItem key={index} primaryText={obj} value={obj} />);
			}),
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
						{this.state.menuItems}
					</Menu>
				</Popover>

				<RaisedButton label="Clear Regions" onTouchTap={() => {this.props.dispatch(setRegions([]))}} />
			</div>
		);
	}
}

export default connect()(RegionControls);