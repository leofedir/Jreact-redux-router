import React, { Component } from 'react';
import { checkStatus, parseJSON} from '../checkJSON';
import L from 'leaflet/dist/leaflet-src';
import esri from 'esri-leaflet/dist/esri-leaflet';

export let Lmap = null;

class Map extends Component {

    componentDidMount() {
        this.createMap()
    }

    createMap() {
        Lmap = L.map('map', {zoomControl: false}).setView([49, 31], 6);
        L.Icon.Default.imagePath = '/img/';

        esri.basemapLayer('Topographic').addTo(Lmap);

        fetch('/main', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'foo=bar&lorem=ipsum'
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                let poligon = []
                data.data.map(item => {
                    let obj = {}
                    obj.type = "Feature";
                    obj.properties = {};
                    for(let key in item) {
                        if (item.hasOwnProperty(key) && key !== 'geojson' && key !== 'geom'){
                            obj.properties[key] = item[key];
                        }
                    }
                    obj.geometry = poligon.push(JSON.parse(item.geojson))
                })

                let myStyle = {
                    "color": "#009971",
                    "weight": 2,
                    "opacity": 0.79
                };

                L.geoJSON(poligon, {
                    style: myStyle
                }).addTo(Lmap);
            });
    }

    changeBasemap(e){
        if (Lmap) {
            change(Lmap)
        }
        let layer;

        function change(myMap) {
            if (layer) {
                myMap.removeLayer(layer);
            }
            layer = esri.basemapLayer(e.target.value);
            myMap.addLayer(layer);
        }
    }

    render() {
        return (
            <div id="map_wrapper">
                <i className="fa fa-plus fa-lg zoom_in_icon" id="zoom_in"/>
                <i className="fa fa-minus fa-lg zoom_out_icon" id="zoom_out"/>
                <i className="fa fa-location-arrow fa-lg geolocate_icon" id="geolocate"/>
                <div id="map" />
                <div id="basemaps-wrapper">
                    <p className="basemap_title">Базова карта</p>
                    <select name="basemaps" id="basemaps" onChange={this.changeBasemap}>
                        <option value="Topographic">Топографічна</option>
                        <option value="Streets">Вулиці</option>
                        <option value="Imagery">Супутникова</option>
                        <option value="NationalGeographic">National Geographic</option>
                    </select>
                </div>
            </div>

        );
        // "streets" , "satellite" , "hybrid", "topo", "gray", "dark-gray", "oceans", "national-geographic", "terrain", "osm", "dark-gray-vector", gray-vector", " +
        // ""streets-vector", "streets-night-vector", "streets-relief-vector", "streets-navigation-vector" and "topo-vector". Property added at v3.3. The "terrain" " +
        // "and "dark-gray" options added at v3.12. The "dark-gray-vector", "gray-vector", "streets-vector", "streets-night-vector", "streets-relief-vector", " +
        // ""streets-navigation-vector" and "topo-vector"
    }
}

export default Map;
