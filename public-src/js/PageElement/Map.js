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
let kadastr;
let layer;


class Map extends Component {

    componentDidMount() {
        this.createMap();
        cordinateContainer = document.getElementById('coordinate')
    }

    zoomFunction() {

        const {curentMap} = this.props.map_reducer;

        if (Lmap.hasLayer(ukraine) || curentMap === null ) {
            return
        }

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

        setTimeout(() => Lmap.invalidateSize(), 100);
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

        const {set_data_district} = this.props.MapActions;
        Lmap = L.map('map', {zoomControl: false}).setView([49, 31], 6);
        esri.basemapLayer('Topographic').addTo(Lmap);

        function onMouseMove(e) {
            cordinateContainer.innerHTML = e.latlng.lat.toFixed(3) + "° пн. ш, " + e.latlng.lng.toFixed(3) + "° сх. д."
        }

        // add event to map actions
        Lmap.on('mousemove', onMouseMove);

        fetch('main', {
            method: 'post',
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
                Lmap.addLayer(ukraine)
            });

        fetch('region', {
            method: 'post',
            body: 'table=geojson'
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                coordinate.region = data.region.map(item => JSON.parse(item));

                coordinate.district = data.district.map(item => JSON.parse(item));
                set_data_district();
            });

        kadastr = L.tileLayer.wms("http://212.26.144.110/geowebcache/service/wms", {
            layers: 'kadastr',
            format: 'image/png',
            crs: L.CRS.EPSG900913,
            uppercase: true,
            detectRetina: true,
            maxZoom: 21,
            attribution: '<a href="http://dzk.gov.ua" target="_blank">ЦДЗК</a>'
        });
    }

    omButtonMapClick() {
        this.props.Actions.resizeMap(this.props.main.mapFull)
    }

    onMouseClick(e) {
        let coord = e.latlng
        let zoom = Lmap.getZoom();
        let nyCoordinat = kadastr.options.crs.project(coord)

        let query = `x=${  nyCoordinat.y }&y=${ nyCoordinat.x }&zoom=${ zoom }&actLayers%5B%5D=kadastr`

        fetch(`http://map.land.gov.ua/kadastrova-karta/getobjectinfo?${query}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(d => {
                if(!d.hasOwnProperty("pusto")) {
                    console.log(d);
                    cadastral = parserHTMLtoObject(d);
                    let cadastral_template = tmpl(cadastral);
            
                    Lmap.openPopup(cadastral_template, coord, {
                        maxWidth: 500
                    });
                }
            })
            .catch(e => console.error('e >>', e))
    }

    changeBasemap(e) {

        Lmap.listens('click') ? Lmap.off('click', this.onMouseClick) : '';

        let map = e.target.value;

        if (layer) {
            Lmap.removeLayer(layer);
        }

        if (map == 'kadastr' && this.props.map_reducer.curentMap === null ) {
            Lmap.hasLayer(ukraine) ? Lmap.removeLayer(ukraine) : '';
            layer = L.layerGroup()
                .addLayer(esri.basemapLayer('Imagery'));

            setTimeout(() => {layer.addLayer(kadastr)}, 100)

            Lmap.addLayer(layer);
            Lmap.on('click', this.onMouseClick)
        } else {
            layer = esri.basemapLayer(map);
            Lmap.addLayer(layer);
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
                        <select name="basemaps" id="basemaps" onChange={::this.changeBasemap}>
                            <option value="Topographic">Топографічна</option>
                            <option value="kadastr">Кадастрова карта</option>
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
