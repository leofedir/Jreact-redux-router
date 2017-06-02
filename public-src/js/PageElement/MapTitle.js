import React, { Component } from 'react';
import {connect} from 'react-redux';

class MapTitle extends Component {
    render() {
        const {title_map} = this.props.main;
        
        return (
            <h2 className="map_title">
                {title_map}
            </h2>
        )
    }
}

function mapStateToProps(state) {
    return {
        main: state.main,
    }
}

export default connect(mapStateToProps)(MapTitle);
