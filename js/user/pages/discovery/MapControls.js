import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import { blueGrey800, blueGrey50 } from 'material-ui/styles/colors';

import _ from 'lodash';

import { setRegions, selectPeriods, deselectPeriods } from '../../actions/searchingActions';

import periodData from '../../../data/periods';
import regionData from '../../../data/regions';
import Map from '../../components/Map';
import TagControls from './TagControls';

const CONTAINER_STYLE = {
	"width": "100%",
	"flex": "2",
	"padding": "20px",
	"paddingLeft": "10%",
	"paddingRight": "10%",
	"display": "flex",
	"flexDirection": "column",
}

const BUTTONS_CONTAINER_STYLE = {
	"display": "flex",
	"justifyContent": "space-between",
	"width": "100%",
	"marginBottom": "10px",
}

const TIME_PERIODS_BUTTON_STYLE = {
	"marginLeft": "10px",
	"marginRight": "10px",
}

const CLEAR_REGIONS_BUTTON_STYLE = {
	"marginRight": "10px",
	"marginLeft": "10px",
}

class MapControls extends React.Component{
	constructor(){
		super();
		this.state = {
			"periodsOpen": false,
			"periodsButtonEl": null,

			"predefinedOpen": false,
			"predefinedButtonEl": null,
		}

		this.predefinedRegions = []
		_.forEach(regionData, function(obj){
			this.predefinedRegions = _.union(this.predefinedRegions, [obj.region, obj.subregion]);
		}.bind(this));
		
		this.predefinedRegions = _.map(this.predefinedRegions, function(obj, index){
			return (<MenuItem key={index} primaryText={obj} value={obj}/>);
		});
	}

	onPeriodsClick(event){
		event.preventDefault();

		this.state = {...this.state, "periodsButtonEl": event.currentTarget}

		if(this.state.periodsOpen)
			this.closePeriods();
		else
			this.openPeriods();
	}

	closePeriods(){
		this.setState({"periodsOpen": false});
	}

	openPeriods(){
		this.setState({"periodsOpen": true});
	}

	onPredefinedClick(event){
		event.preventDefault();
		this.state = {...this.state, "predefinedButtonEl": event.currentTarget}

		if(this.state.predefinedOpen)
			this.closePredefined();
		else
			this.openPredefined();
	}

	openPredefined(){
		this.setState({"predefinedOpen": true});
	}

	closePredefined(){
		this.setState({"predefinedOpen": false});
	}

	setRegions(regions){
		this.props.dispatch(setRegions(regions));
	}

	onPredefinedRegionSelect(event, menuItem){
		this.setRegions(menuItem);
		this.closePredefined();
	}

	onClearRegionsClick(){
		this.clearRegions();
	}

	clearRegions(){
		this.props.dispatch(setRegions([]));
	}

	onPeriodClick(event, isInputChecked){
		let checkbox = event.currentTarget;

		if(this.props.periods.indexOf(checkbox.value) === -1){
			this.selectPeriods(checkbox.value);
		}else{
			this.deselectPeriods(checkbox.value);
		}
	}

	selectPeriods(periods){
		this.props.dispatch(selectPeriods([periods]));
	}

	deselectPeriods(periods){
		this.props.dispatch(deselectPeriods([periods]));
	}

	render(){
		let periods = _.map(periodData, function(obj, index){
			let checked = this.props.periods.indexOf(obj) !== -1;
			return (
				<Checkbox style={{"paddingTop": "2px", "paddingBottom": "2px"}} 
					key={index} 
					label={obj}
					value={obj}
					checked={checked}
					onCheck={this.onPeriodClick.bind(this)} />
			);
		}.bind(this));

		return (
			<div style={CONTAINER_STYLE}>
				<div style={BUTTONS_CONTAINER_STYLE} >
					<div style={{"display": "flex", "justifyContent": "flex-start", "alignItems": "center", "flex": "1"}} >
						<div style={TIME_PERIODS_BUTTON_STYLE}>
							<RaisedButton
								label="Time Periods"
								labelColor={blueGrey800}
								backgroundColor={blueGrey50} 
								onTouchTap={this.onPeriodsClick.bind(this)} />
							<Popover
								open={this.state.periodsOpen} 
								anchorEl={this.state.periodsButtonEl}
								anchorOrigin={{"horizontal": "left", "vertical": "bottom"}}
								targetOrigin={{"horizontal": "left", "vertical": "top"}}
								onRequestClose={this.closePeriods.bind(this)}
								useLayerForClickAway={false}>
								<Paper style={{"padding": "15px", "whiteSpace": "nowrap"}} zDepth={2}>
									{periods}
								</Paper>
							</Popover>
						</div>
						<TagControls />
					</div>
					<div style={{"display": "flex", "justifyContent": "flex-end", "alignItems": "center"}} >
						<div>
							<RaisedButton
								ref="predefined"
								label="Pre-defined Regions"
								labelColor={blueGrey800}
								onTouchTap={this.onPredefinedClick.bind(this)}
								backgroundColor={blueGrey50} />
							<Popover
								open={this.state.predefinedOpen}
								anchorEl={this.state.predefinedButtonEl}
								anchorOrigin={{"horizontal": "left", "vertical": "bottom"}}
								targetOrigin={{"horizontal": "left", "vertical": "top"}}
								onRequestClose={this.closePredefined.bind(this)}
								useLayerForClickAway={false}>
								<Menu onChange={this.onPredefinedRegionSelect.bind(this)}>
									{this.predefinedRegions}
								</Menu>
							</Popover>
						</div>
						<div style={CLEAR_REGIONS_BUTTON_STYLE}>
							<RaisedButton
								onTouchTap={this.onClearRegionsClick.bind(this)}
								label="Clear Regions" 
								labelColor={blueGrey800} 
								backgroundColor={blueGrey50} />
						</div>
					</div>
				</div>
				<Map />
			</div>
		);
	}
}

export default connect(store=>{
	return {
		"periods": store.searching.searching.periods,
	}
})(MapControls);