import {Lmap} from "../PageElement/Map";
import {store} from '../index'
import L from 'leaflet';
import esri from 'esri-leaflet/dist/esri-leaflet';
import {clickOnFeatureClaster, set_chart_data} from '../REDUX/actions/get_map_area'

import {searchControlArea} from '../getMapArea'

import 'leaflet.markercluster/dist/leaflet.markercluster-src';
import 'leaflet-search';
import 'leaflet-pulse-icon/dist/L.Icon.Pulse.css'
import 'leaflet-pulse-icon/dist/L.Icon.Pulse'

import "leaflet-search/src/leaflet-search.css"

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

    Lmap.setView([49, 31], 5);
    esri.basemapLayer('Topographic').addTo(Lmap);

    let icon = L.icon({
        iconUrl: '/img/marker-icon.svg',
        iconSize: [25, 36],
        iconAnchor: [12, 33]
    });

    let pulsingIcon = L.icon.pulse({iconSize: [20, 20], color: 'red'});

    myClaster = L.markerClusterGroup({chunkedLoading: true}).addTo(Lmap);
    myClaster.on('click', whenClicked);

    createMarkers = function (id) {
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
        myClaster.addLayer(layers[id]);
    };

    if (searchControlPoint !== null) {
        Lmap.removeControl(searchControlPoint)
    }

    searchControlPoint = L.control.search({
        layer: myClaster,
        initial: false,
        propertyName: 'nameua',
        marker: L.marker([0, 0], {
            icon: pulsingIcon
        })
    }).addTo(Lmap);

    searchControlPoint.once('search:locationfound', function (e) {
        Lmap.flyTo(e.latlng, 13);
        console.log('searchControlPoint >>', searchControlPoint)
        setTimeout(() => {
            searchControlPoint.options.marker.remove()
        }, 4000)

    });

    function whenClicked(e) {
        let feature = e.layer.feature.properties;
        store.dispatch(clickOnFeatureClaster(feature));
        if (Object.keys(feature).some(item => item.indexOf('chart'))) {
            chartData(feature)
        }
    }

    function chartData(feature_claster) {
        let chart1 = null;
        let chart2 = null;
        let chart3 = null;

        if (feature_claster !== null) {
            for (let key in feature_claster) {
                if (feature_claster.hasOwnProperty(key)) {
                    let name = key.slice(0, key.indexOf('_'));
                    let serias = key.slice(7, key.length - 5);
                    let year = +key.slice(key.length - 4);
                    let value = +feature_claster[key];

                    if (name == 'chart1') {
                        chart1 === null ? chart1 = {} : '';
                        chart1[serias] ? chart1[serias].push({year, value}) : chart1[serias] = [{year, value}];
                    }
                    else if (name == 'chart2') {
                        chart2 === null ? chart2 = {} : '';
                        chart2[serias] ? chart2[serias].push({year, value}) : chart2[serias] = [{year, value}];
                    }
                    else if (name == 'chart3' || name == 'kilkistuchniv') {
                        chart3 === null ? chart3 = {} : '';
                        chart3[serias] ? chart3[serias].push({year, value}) : chart3[serias] = [{year, value}];
                    }
                }
            }

            function sort_data(obj) {
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        obj[key].sort((a, b) => a.year - b.year)
                    }
                }
            }

            sort_data(chart1);
            sort_data(chart2);
            sort_data(chart3);

            store.dispatch(set_chart_data(chart1, chart2, chart3))

        }
    }

    showLayer(0)
}

