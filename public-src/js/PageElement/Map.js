import React, { Component } from 'react';
import { checkStatus, parseJSON} from '../checkJSON';
import L from 'leaflet/dist/leaflet-src';
import esri from 'esri-leaflet/dist/esri-leaflet';
import SubMenu from "./getSubMenu";

export let Lmap = null;
export let ukraine;

let icon = L.icon({
    iconUrl: '/img/marker-icon.svg',
    iconSize:     [25, 36],
    iconAnchor:   [12, 33]
});

class Map extends Component {

    componentDidMount() {
        this.createMap();
        Lmap.on('zoomend', () => {
            if (Lmap.getZoom() <= 5 && this.props.curentMap != null && this.props.curentMap.indexOf('region') <= 0 ) {
                let mapName = this.props.curentMap.slice(0, this.props.curentMap.indexOf('__district'))
                this.props.get_map_area(mapName + '__region', false)

            } else if (Lmap.getZoom() >= 7 && this.props.curentMap != null && this.props.curentMap.indexOf('region') >= 0) {
                let mapName = this.props.curentMap.slice(0, this.props.curentMap.indexOf('__region'))
                this.props.get_map_area(mapName + '__district', false)
            }
        })
    }

    componentWillUpdate() {
        setTimeout(() => Lmap.invalidateSize(), 200);
    }

    zoom_in() {
        Lmap.zoomIn(1)
    }

    zoom_out() {
        Lmap.zoomOut(1)
    }

    geolocate() {
        Lmap.setView([49, 31], 5)
    }

    createMap() {
        Lmap = L.map('map', {zoomControl: false}).setView([49, 31], 5);

        esri.basemapLayer('Topographic').addTo(Lmap);

        fetch(this.props.category, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: ''
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                let myStyle = {
                    "color": "#009971",
                    "weight": 2,
                    "opacity": .9
                };

                ukraine = L.geoJSON(data.data, {
                    style: myStyle
                });
                Lmap.addLayer(ukraine)
            });
    }

    omButtonMapClick() {
        this.props.resizeMap(this.props.mapFull)
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

        const {fetching, fields, get_map_area, fetching_map, curentMap} = this.props;

        return (
        <div className="block block-top block_map">
            <div className="item_header">
                <SubMenu fields={ fields } get_map_area={ get_map_area } curentMap={ curentMap }/>
                <i className="fa fa-expand fa-1x ico_map_full ico_hover" onClick={::this.omButtonMapClick}/>
            </div>
            <div id="map_wrapper" className="map_wrapper">
                <div id="loader" className={(fetching ? "show" : '') || (fetching_map ? 'show' : '')} />
                <i className="fa fa-plus fa-1x zoom_in_icon"  onClick={::this.zoom_in} id="zoom_in"/>
                <i className="fa fa-minus fa-1x zoom_out_icon" onClick={::this.zoom_out} id="zoom_out"/>
                <i className="fa fa-dot-circle-o fa-1x geolocate_icon" onClick={::this.geolocate} id="geolocate"/>
                <div id="map" className="maps__items"/>
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
        </div>


        );
        // "streets" , "satellite" , "hybrid", "topo", "gray", "dark-gray", "oceans", "national-geographic", "terrain", "osm", "dark-gray-vector", gray-vector", " +
        // ""streets-vector", "streets-night-vector", "streets-relief-vector", "streets-navigation-vector" and "topo-vector". Property added at v3.3. The "terrain" " +
        // "and "dark-gray" options added at v3.12. The "dark-gray-vector", "gray-vector", "streets-vector", "streets-night-vector", "streets-relief-vector", " +
        // ""streets-navigation-vector" and "topo-vector"
    }
}

export default Map;
