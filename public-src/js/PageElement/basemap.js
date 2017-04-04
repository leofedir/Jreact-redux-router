import React, { Component } from 'react';
import esri from 'esri-leaflet/dist/esri-leaflet';
import { Lmap } from '../App';

class BaseMap extends Component {

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
            <div id="basemaps-wrapper">
                <p className="basemap_title">Базова карта</p>
                <select name="basemaps" id="basemaps" onChange={this.changeBasemap}>
                    <option value="Topographic">Топографічна</option>
                    <option value="Streets">Вулиці</option>
                    <option value="Imagery">Супутникова</option>
                    <option value="NationalGeographic">National Geographic</option>
                </select>
            </div>
        );
        // "streets" , "satellite" , "hybrid", "topo", "gray", "dark-gray", "oceans", "national-geographic", "terrain", "osm", "dark-gray-vector", gray-vector", " +
        // ""streets-vector", "streets-night-vector", "streets-relief-vector", "streets-navigation-vector" and "topo-vector". Property added at v3.3. The "terrain" " +
        // "and "dark-gray" options added at v3.12. The "dark-gray-vector", "gray-vector", "streets-vector", "streets-night-vector", "streets-relief-vector", " +
        // ""streets-navigation-vector" and "topo-vector"
    }
}

export default BaseMap;
