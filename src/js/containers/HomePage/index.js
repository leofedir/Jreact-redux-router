import React from 'react';
import { connect } from 'react-redux';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	componentDidMount() {
	}

	render() {
		return (
			<div>
				<div className="map" id="map">
					<h1>Hello, World!!!</h1>
				</div>
			</div>
		);
	}
}

HomePage.propTypes = {
	onSubmitForm: React.PropTypes.func,
	username: React.PropTypes.string,
};


function mapStateToProps(state) {
	return {
		main: state.main,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		// Actions: bindActionCreators(Actions, dispatch)
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
