import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'leaflet/dist/leaflet-src';
import 'leaflet/dist/leaflet.css'
import  { basemapLayer } from 'esri-leaflet'
import * as Actions from './REDUX/actions/actions';

class App extends Component {
    componentDidMount() {
			let Lmap = L.map('map', {
				zoomControl: false,
				minZoom: 3,
				renderer: L.canvas(),
				attributionControl: false
			}).setView([49.8, 24], 7);

			let layer = basemapLayer('Topographic');
			Lmap.addLayer(layer);

			let atribution = L.control.attribution({
				prefix: '<a href="opendata.ua">opendata.ua</a>'
			});

			Lmap.addControl(atribution)
    }

    componentDidUpdate() {
        window.scrollTo(0,0);
    }

    render() {
        return (
          <div className="main" id="map" />
        );
    }
}

function mapStateToProps(state) {
    return {
        main: state.main,
        map_reducer: state.map_reducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators(Actions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps)(App));
