import {Lmap} from "../PageElement/Map";
import {store} from '../index'
import L from 'leaflet';
import esri from 'esri-leaflet/dist/esri-leaflet';
import {clickOnFeatureClaster} from '../REDUX/actions/get_map_area'

import {searchControlArea} from '../getMapArea'

import 'leaflet.markercluster/dist/leaflet.markercluster-src';
import '../../lib/search';
import 'leaflet-pulse-icon/dist/L.Icon.Pulse.css';
import 'leaflet-pulse-icon/dist/L.Icon.Pulse';
import "leaflet-search/src/leaflet-search.css";

import {chartData} from '../Function/chartData'

// import getFields from './setFields';
// import Cluster from 'esri-leaflet-cluster';
// import Geocoding from 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
// import * as d3 from 'd3';
// import React from 'react';
// let currentSearcherControl = null;
let layers = {},
    myClaster,
    createMarkers;
export let searchControlPoint = null;

export function cleanClasterAll() {
    myClaster.clearLayers()
}

export function layersTriger(id, status) {
    status ? showLayer(id) : hideLayer(id)
}

function showLayer(id) {
    createMarkers(id);
}

function hideLayer(id) {
    myClaster.removeLayer(layers[id]);
}


export default function claster(data) {
    if (0 in layers) {
        for (let key in layers) {
            if (layers.hasOwnProperty(key)) {
                layers[key].off('click', whenClicked);
            }
        }
    }
    layers = {};

    if (searchControlArea !== null) {
        Lmap.removeControl(searchControlArea)
    }

    Lmap.eachLayer(function (layer) {
        Lmap.removeLayer(layer)
    });
    
    const {baseMap} = store.getState().map_reducer;
    esri.basemapLayer(baseMap).addTo(Lmap);
    Lmap.setView([49, 31], 5);


    let icon = L.icon({
        iconUrl: '/img/marker-icon.svg',
        iconSize: [25, 36],
        iconAnchor: [12, 33]
    });

    let pulsingIcon = L.icon.pulse({iconSize: [20, 20], color: 'red'});

    myClaster = L.markerClusterGroup({chunkedLoading: true}).addTo(Lmap);

    myClaster.on('click', whenClicked);

    createMarkers = function (id) {
        if (!layers[id]) {
            let marker = L.geoJson(data[id][1], {
                // Cluster Options
                polygonOptions: {
                    color: "#2d84c8"
                },
                // Feature Layer Options
                pointToLayer: function (geojson, latlng) {
                    return L.marker(latlng, {
                        icon: icon
                    });
                },
            });
            layers[id] = marker;
        }
        myClaster.addLayer(layers[id]);
    };

    if (searchControlPoint !== null) {
        Lmap.removeControl(searchControlPoint);
        searchControlPoint = null;
    }

    searchControlPoint = L.control.search({
        layer: myClaster,
        initial: false,
        propertyName: 'nameua',
        position: 'topright',
        textPlaceholder: 'Пошук',
        marker: L.marker([0, 0], {
            icon: pulsingIcon
        })
    }).addTo(Lmap);

    // searchControlPoint.__proto__._handleAutoresize = () => {}; //need to fix resize bug

    searchControlPoint.on('search:locationfound', function (e) {
        whenClicked(e) // call click action
        Lmap.flyTo(e.latlng, 14);
        setTimeout(() => {
            searchControlPoint.options.marker.remove()
        }, 4000)
    });


    function whenClicked(e) {
        let feature = e.layer.feature.properties;
        store.dispatch(clickOnFeatureClaster(feature));
        if (Object.keys(feature).some(item => item.indexOf('chart'))) {
            // chartData(feature) //disable chart
        }
    }
    
    showLayer(0);
}

