import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../REDUX/actions/actions';
import * as MapActions from '../REDUX/actions/get_map_area';

import {checkStatus, parseJSON} from '../checkJSON';
import L from 'leaflet';
import esri from 'esri-leaflet/dist/esri-leaflet';
import SubMenu from "./getSubMenu";
import {alias} from '../aliasMapName';

export let Lmap = null;
export let ukraine;
export const coordinate = {};

let icon = L.icon({
    iconUrl: '/img/marker-icon.svg',
    iconSize: [25, 36],
    iconAnchor: [12, 33]
});

let cordinateContainer;

class Map extends Component {

    componentDidMount() {
        this.createMap();
        cordinateContainer = document.getElementById('coordinate')
    }

    zoomFunction() {


        if (Lmap.hasLayer(ukraine)) {
            return
        }
        const {curentMap} = this.props.map_reducer;
        const {fields, submenu_item} = this.props.main;
        const {get_map_area} = this.props.MapActions;
        const mapSet = fields[submenu_item];

        if (Lmap.getZoom() <= 5 && curentMap !== null && curentMap.indexOf('region') <= 0 && mapSet.some(a => ~a.indexOf('__region'))) {
            get_map_area(submenu_item + '__region', false, alias[submenu_item], true)

        } else if (Lmap.getZoom() >= 7 && curentMap !== null && curentMap.indexOf('region') >= 0 && mapSet.some(a => ~a.indexOf('__district'))) {
            get_map_area(submenu_item + '__district', false, alias[submenu_item], false)
        }
    }

    componentWillUpdate() {
        // Lmap.off('zoomend', ::this.zoomFunction())
        Lmap.off('zoomend', ::this.zoomFunction);
        Lmap.on('zoomend', ::this.zoomFunction);

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
        const mapEvents = {
            mousemove: onMouseMove,
            click: onMouseClick
        }
        const {set_data_district} = this.props.MapActions;
        Lmap = L.map('map', {zoomControl: false}).setView([49, 31], 6);

        esri.basemapLayer('Topographic').addTo(Lmap);


        function onMouseClick(e) {
         let coord = e.latlng
            console.log('e.target >>', e.latlng)
            // console.log('dsfdsfsd >>', Lmap.project(e.latlng))
//             console.log('sdfdsf >>', Lmap.project(e.latlng))
        let body = {
            x:6529871.8200639,
            y:3403557.0097936,
            zoom:9
        }

        let newQuery = `x=${coord.lat}&y=${coord.lng}&z=13`

        let nnnn = `x=${body.x}&y=${body.y}&zoom=${body.zoom}&actLayers%5B%5D=kadastr`

        fetch('http://gisfile.com/layer/cadmap/search?x=31.805934906005856&y=48.334343174592014&z=13')
            .then(checkStatus)
            .then(parseJSON)
            .then(d => {
                console.log('d >>', d)
            })
        }

        function onMouseMove(e) {
            cordinateContainer.innerHTML = e.latlng.lat.toFixed(3) + "° пн. ш, " + e.latlng.lng.toFixed(3) + "° сх. д."
            // console.log(e.latlng.lat + ", " + e.latlng.lng);
        }

        Lmap.on(mapEvents);

        fetch('main', {
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
                ukraine = L.geoJSON(data[1], {
                    style: myStyle
                });
                // Lmap.addLayer(ukraine)
            });


        // L.tileLayer.wms('http://map.land.gov.ua/geowebcache/service/wms?tiled=true').addTo(Lmap);

        fetch('region', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'table=geojson'
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                coordinate.region = data.region.map(item => JSON.parse(item));

                coordinate.district = data.district.map(item => JSON.parse(item));
                set_data_district();
            })
        let kadastr = L.tileLayer.wms("http://212.26.144.110/geowebcache/service/wms", {
            layers: 'kadastr',
            format: 'image/png',
            uppercase: true,
            detectRetina: true,
            attribution: "GISPORTAL 2017"
        }).addTo(Lmap);

    }

    omButtonMapClick() {
        this.props.Actions.resizeMap(this.props.main.mapFull)
    }

    changeBasemap(e) {
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
        const {fetching} = this.props.main;

        return (
            <div className="block block-top block_map">
                <div className="item_header">
                    <SubMenu />
                    <i className="fa fa-expand fa-1x ico_map_full ico_hover" onClick={::this.omButtonMapClick}/>
                </div>
                <div id="map_wrapper" className="map_wrapper">
                    <div id="loader" className={fetching ? "show" : ''}/>
                    <i className="fa fa-plus fa-1x zoom_in_icon" onClick={::this.zoom_in} id="zoom_in"/>
                    <i className="fa fa-minus fa-1x zoom_out_icon" onClick={::this.zoom_out} id="zoom_out"/>
                    <i className="fa fa-dot-circle-o fa-1x geolocate_icon" onClick={::this.geolocate} id="geolocate"/>
                    <p id="coordinate"/>
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

function mapStateToProps(state) {
    return {
        main: state.main,
        map_reducer: state.map_reducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators(Actions, dispatch),
        MapActions: bindActionCreators(MapActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
