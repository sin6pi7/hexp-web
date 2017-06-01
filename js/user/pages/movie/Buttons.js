import React from 'react';
import { withRouter } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import { blueGrey800, blueGrey50 } from 'material-ui/styles/colors';

import _ from 'lodash';

import SubmitFeedback from '../../components/SubmitFeedback';
import WhereToWatch from '../../components/WhereToWatch';
import Share from '../../components/Share';

const STYLES = {
	"container": {
		"width": "100%",
	},

	"button": {
		"marginBottom": "20px",
	},
}

/**
 * @property {string} this.props.trailer - The link to the trailer of the movie
 * @property {integer} this.props.movieId - The id of the movie that is being viewed
 */
class Buttons extends React.Component{
	constructor(){
		super();

		this.state = {
			"submitFeedbackOpen": false,
			"whereToWatchOpen": false,
			"shareOpen": false,
		}
	}

	openFeedback(){
		this.setState({
			"submitFeedbackOpen": true,
		});
	}

	closeFeedback(){
		this.setState({
			"submitFeedbackOpen": false,
		});
	}

	openWhereToWatch(){
		this.setState({
			"whereToWatchOpen": true,
		});
	}

	closeWhereToWatch(){
		this.setState({
			"whereToWatchOpen": false,
		});
	}

	openShare(){
		this.setState({
			"shareOpen": true,
		});
	}

	closeShare(){
		this.setState({
			"shareOpen": false,
		});
	}

	watchTrailer(){
		window.open(this.props.trailer);
	}

  openTMDBPage(){
    window.open(`https://www.themoviedb.org/movie/${this.props.tmdbId}`);
  }

	goBack(){
		if(this.props.history.length > 0)
			this.props.history.goBack();
		else
			this.props.history.replace("/discovery");
	}

	render(){
		return (
			<div style={STYLES.container}>
				<RaisedButton style={STYLES.button} 
					labelColor={blueGrey800}
					backgroundColor={blueGrey50}
					fullWidth={true} 
					label="Share"
					onTouchTap={this.openShare.bind(this)} />
				<RaisedButton style={STYLES.button} 
					labelColor={blueGrey800}
					backgroundColor={blueGrey50}
					fullWidth={true} 
					label="Watch trailer"
					disabled={_.isEmpty(this.props.trailer)}
					onTouchTap={this.watchTrailer.bind(this)} />
				<RaisedButton style={STYLES.button}
					labelColor={blueGrey800}
					backgroundColor={blueGrey50}
					fullWidth={true}
					label="See on TMDB"
					disabled={_.isEmpty(this.props.tmdbId)}
					onTouchTap={this.openTMDBPage.bind(this)} />
				<RaisedButton style={STYLES.button}
					labelColor={blueGrey800}
					backgroundColor={blueGrey50}
					fullWidth={true} 
					label="Where to watch"
					onTouchTap={this.openWhereToWatch.bind(this)} />
				<RaisedButton style={STYLES.button} 
					labelColor={blueGrey800}
					backgroundColor={blueGrey50}
					fullWidth={true} 
					label="Submit feedback"
					onTouchTap={this.openFeedback.bind(this)} />
				<RaisedButton style={STYLES.button}
					labelColor={blueGrey800}
					backgroundColor={blueGrey50}
					fullWidth={true}
					label="Go back"
					onTouchTap={this.goBack.bind(this)} />
				<SubmitFeedback 
					open={this.state.submitFeedbackOpen}
					close={this.closeFeedback.bind(this)}
					movieId={this.props.movieId} />
				<WhereToWatch
					open={this.state.whereToWatchOpen}
					close={this.closeWhereToWatch.bind(this)}
					movieId={this.props.movieId} />
				<Share
					open={this.state.shareOpen}
					close={this.closeShare.bind(this)}
					movieId={this.props.movieId} />
			</div>
		);
	}
}

export default withRouter(Buttons);