import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'

class App extends Component {
	componentDidUpdate() {
		window.scrollTo(0,0);
	}

	render() {
		return (
			<div className="main">
				<h1>Not Found</h1>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		main: state.main,
		map_reducer: state.map_reducer
	}
}

export default withRouter(connect(mapStateToProps)(App));
