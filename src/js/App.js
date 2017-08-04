import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './REDUX/actions/actions';

class App extends Component {
    componentDidUpdate() {
        window.scrollTo(0,0);
    }

    render() {
        return (
          <div className="main">
              <h1 className="top">Hello World</h1>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        main: state.main,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
