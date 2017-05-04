import React, { Component } from 'react';

class MapTitle extends Component {
    render() {
        return (
            <h2 className="map_title">
                { this.props.title_map }
            </h2>
        )
    }
}

export default MapTitle