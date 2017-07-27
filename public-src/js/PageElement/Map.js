import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../REDUX/actions/actions';
import * as MapActions from '../REDUX/actions/get_map_area';
// import Dexie from 'dexie';

import {checkStatus, parseJSON} from '../checkJSON';
import L from 'leaflet';
import esri from 'esri-leaflet/dist/esri-leaflet';
import SubMenu from "./getSubMenu";
import getMap from './../getMapArea';

export let Lmap = null;
export let ukraine = null;
// export let coordinate = {};

let icon = L.icon({
    iconUrl: '/img/marker-icon.svg',
    iconSize: [25, 36],
    iconAnchor: [12, 33]
});

let cordinateContainer;
let kadastr;
let layer;
let curentMap = null;
let cadastral = null;
let _curentMap = null;
let _submenu_item = null;
let objectStore = null;

//add two finger scroll

L.WheelPanHandler = L.Handler.extend({
    addHooks: function () {
        L.DomEvent.on(map, 'wheel', this._wheelpan, this);
    },

    removeHooks: function () {
        L.DomEvent.off(map, 'wheel', this._wheelpan, this);
    },

    _wheelpan: function (event) {
        var panAmount = L.point(event.deltaX, event.deltaY);

        // Normalize lines
        if (event.deltaMode === 1) {
            panAmount = panAmount.multiplyBy(20);
        }
        // Normalize pages
        if (event.deltaMode === 2) {
            panAmount = panAmount.multiplyBy(60);
        }

        this._map.panBy(panAmount);
    }
});

function tmpl(dataObject) {
    let template = ``;

    let titleLayer = `<div class="cadastral_title_layer"></div>`;
    template += titleLayer;

    let unorderList = `<ul>`;
    for (let i in dataObject) {
        unorderList += `<li class="cadastral_li_item"><p>${i}:</p><span>${dataObject[i]}</span></li>`;
    }
    unorderList += `</ul>`;

    template += unorderList;
    return template
}

//parse html object and return javascript object
function parserHTMLtoObject(obj) {
    let curObject = {}

    //get current place by zoom
    if (obj.hasOwnProperty("obl")) {
        curObject = obj.obl
        if (obj.hasOwnProperty("rajonunion")) {
            curObject = obj.rajonunion

            if (obj.hasOwnProperty("ikk")) {
                curObject = obj.ikk

                if (obj.hasOwnProperty("dilanka")) {
                    curObject = obj.dilanka
                }
            }
        }
    }

    //get html data from chunk of code
    const regex = /(<([^>]+)>)/ig
    let result = curObject.replace(regex, "|");

    //string to array
    let newItem = result.split("|")
    newItem = newItem.filter((word) => word !== '');

    //if Key: null remove this key
    for (let i = 0; i < newItem.length; i++) {

        if ((i + 1 !== newItem.length) && (newItem[i].endsWith(':') && newItem[i + 1].endsWith(':'))) {
            newItem.splice(i, 1)
        }
    }
    //remove ':' symbols from array
    newItem = newItem.map((word) => {
        if (word.endsWith(':'))
            return word.slice(0, word.length - 1);
        else
            return word
    });


    let dataObject = {};
    //check only important data
    const goodKeys = [
        "Район",
        "Зона",
        "Квартал",
        "КОАТУУ",
        "Область",
        "Кадастровий номер",
        "Тип власності",
        "Цільове призначення",
        "Площа"
    ];

    //array to key: value
    for (let j = 0; j < newItem.length; j++) {
        if (goodKeys.includes(newItem[j])) {
            dataObject[newItem[j]] = newItem[j + 1]
        }
        j++;
    }

    return dataObject
}

class Map extends PureComponent {
    componentDidMount() {
        this.createMap();
        cordinateContainer = this.refs.coordinate
    }

    componentDidUpdate() {
        const {submenu_item} = this.props.main;
        const {baseMap, curentMap} = this.props.map_reducer;


        _submenu_item === null ? _submenu_item = submenu_item : '';

        if (submenu_item != _submenu_item && Object.keys(this.refs).length > 1) {
            _submenu_item = submenu_item;
            _curentMap = null;
            this.refs.region ? this.refs.region.classList.remove('active') : '';
            this.refs.district ? this.refs.district.classList.remove('active') : '';
        }

        if (baseMap == 'kadastr' && curentMap !== null) {
            Lmap.listens('click') ? Lmap.off('click', this.onMouseClick) : '';
            this.changeBasemap(null, true)
        }

        setTimeout(() => {
            Lmap.invalidateSize();
        }, 250)
    }

    hendlerChangeOT(e) {
        let target = e.target;
        let id = e.target.id;

        const {maps} = this.props.main;
        const {curentMap} = this.props.map_reducer;

        _curentMap === null ? _curentMap = curentMap : '';

        if (~_curentMap.indexOf(id)) {
            return
        }

        if (id == 'region' && maps.some(a => ~a.indexOf('__region'))) {
            target.classList.add('active')
            this.refs.district.classList.remove('active')
            getMap(null, false, true)

            // toggle BarChart
            this.props.MapActions.toggle_data(this.props.map_reducer.dataChartRegion)

            _curentMap = id

        } else if (id == 'district' && maps.some(a => ~a.indexOf('__district'))) {
            target.classList.add('active')
            this.refs.region.classList.remove('active')

            getMap(null, false, false)

            // toggle BarChart
            this.props.MapActions.toggle_data(this.props.map_reducer.dataChartRegion)

            _curentMap = id
        }
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
        const {baseMap} = this.props.map_reducer;
        Lmap = L.map('map', {
            zoomControl: false,
            minZoom: 3,
            renderer: L.canvas()
        }).setView([49, 31], 6);

        layer = esri.basemapLayer(baseMap);
        Lmap.addLayer(layer);

        function onMouseMove(e) {
            cordinateContainer.innerHTML = e.latlng.lat.toFixed(3) + "° пн. ш, " + e.latlng.lng.toFixed(3) + "° сх. д."
        }

        // add event to map actions
        Lmap.on('mousemove', onMouseMove);

        let ukraineCoordinate = null;
        let myStyle = {
            "color": "#009971",
            "weight": 2,
            "opacity": .9
        };


        let checkDB = indexedDB.open("coordinates")
        checkDB.onsuccess = function(e) {
            let db = e.target.result;
            let transaction = db.transaction(["geometry"]);
            let objectStore = transaction.objectStore("geometry");
            let request = objectStore.get("ukraine");
            request.onerror = function(e) {
                console.log('onerror >>', e)
            };
            request.onsuccess = function() {
                // Do something with the request.result!
                ukraine = L.geoJSON(JSON.parse(request.result.coordinate), {
                    style: myStyle
                });
                Lmap.addLayer(ukraine)
            };

            set_data_district();
        }
        checkDB.onerror = function(e) {
            console.log('onerror  >>', e)
        }
        checkDB.onupgradeneeded = function(e) {
            let db = e.target.result;
            let objectStore = db.createObjectStore("geometry", {keyPath: "name"});
            objectStore.createIndex("coordinate", "coordinate", {unique: false});

            fetch('main', {
                method: 'post',
                body: ''
            })
                .then(checkStatus)
                .then(parseJSON)
                .then(data => {
                    ukraineCoordinate = data[1]
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
                    let coordinate = data;
                    let transaction = db.transaction(["geometry"], "readwrite");
                    // Do something when all the data is added to the database.
                    transaction.oncomplete = function(event) {
                        console.log("All done!");
                        set_data_district();
                    };

                    transaction.onerror = function(event) {
                        console.log("error!");
                        set_data_district();
                    };

                    objectStore = transaction.objectStore("geometry");

                    objectStore.add({name: 'region', coordinate: JSON.stringify(coordinate.region)});
                    objectStore.add({name: 'district', coordinate: JSON.stringify(coordinate.district)});
                    objectStore.add({name: 'otg', coordinate: JSON.stringify(coordinate.otg)});
                    objectStore.add({name: 'settelments', coordinate: JSON.stringify(coordinate.settelments)});
                    objectStore.add({name: 'ukraine', coordinate: JSON.stringify(ukraineCoordinate)});
                });
        };

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
        setTimeout(() => Lmap.invalidateSize(false), 250)
    }

    onMouseClick(e) {
        let coord = e.latlng
        let zoom = Lmap.getZoom();
        let nyCoordinat = kadastr.options.crs.project(coord);

        const query = `x=${  nyCoordinat.y }&y=${ nyCoordinat.x }&zoom=${ zoom }&actLayers%5B%5D=kadastr`;

        fetch(`http://map.land.gov.ua/kadastrova-karta/getobjectinfo?${query}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(d => {
                if (!("pusto" in d)) {
                    cadastral = parserHTMLtoObject(d);
                    if ('Кадастровий номер' in cadastral) {

                        let number = cadastral['Кадастровий номер']

                        fetch('/kadastr', {
                            method: 'post',
                            headers: {
                                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                            },
                            body: `number=${ number }`
                        })
                            .then(checkStatus)
                            .then(parseJSON)
                            .then(d => {
                                let info = d[0]
                                let template = ``;

                                let titleLayer = `<div class="cadastral_title_layer"></div>`;
                                template += titleLayer;

                                let unorderList = `<ul>`;
                                for (let i in cadastral) {
                                    unorderList += `<li class="cadastral_li_item"><p>${i}:</p><span>${cadastral[i]}</span></li>`;
                                }
                                if (info) {
                                    unorderList += `<li class="cadastral_li_item"><p>Інформація:</p><span>${info.info}</span></li>`;
                                    unorderList += `<li class="cadastral_li_item"><p>Код документа:</p><span>${info.kod_document}</span></li>`;
                                }
                                unorderList += `</ul>`;
                                template += unorderList;
                                return template
                            })
                            .then(template => {
                                Lmap.openPopup(template, coord, {
                                    maxWidth: 300,
                                    minWidth: 200,
                                });
                            })
                            .catch(e => console.error('e >>', e))
                    } else {
                        let template = tmpl(cadastral);
                        Lmap.openPopup(template, coord, {
                            maxWidth: 300,
                            minWidth: 200,
                        });
                    }
                }
            })
            .catch(e => console.error('e >>', e))
    }

    changeBasemap(e, mapKadastr = false) {

        Lmap.listens('click') ? Lmap.off('click', this.onMouseClick) : '';
        const {setBaseMap} = this.props.MapActions;

        let map = mapKadastr ? 'Topographic' : e.target.value;
        if (layer) {
            Lmap.removeLayer(layer);
        }

        if (map == 'kadastr' && curentMap === null) {
            Lmap.hasLayer(ukraine) ? Lmap.removeLayer(ukraine) : '';
            setBaseMap('kadastr');

            layer = L.layerGroup()
                .addLayer(esri.basemapLayer('Imagery'));

            setTimeout(() => {
                layer.addLayer(kadastr)
            }, 100);

            Lmap.addLayer(layer);
            Lmap.on('click', this.onMouseClick)
        } else {
            setBaseMap(map);
            layer = esri.basemapLayer(map);
            Lmap.addLayer(layer);
        }
    }

    button() {
        const {submenu_item, title_map, maps} = this.props.main;
        const {claster} = this.props.map_reducer;
        // console.log(submenu_item.indexOf('"area_atu_"'))
        if (title_map == "Адміністративно-територіальний устрій " || submenu_item == "" || claster) {
            return null;
        } else {
            let button = [];
            maps.some(i => ~i.indexOf('__region')) ?
                button.push(<p key="1" onClick={::this.hendlerChangeOT} id='region' ref="region"
                               className="button_change_TO">Області</p>) : ''

            maps.some(i => ~i.indexOf('__district')) ?
                button.push(<p key="2" onClick={::this.hendlerChangeOT} id='district' ref="district"
                               className="button_change_TO">Райони</p>) : ''
            return (
                <div className="buttons_change_TO">
                    {button}
                </div>
            )
        }
    }

    clickOnCompare() {
        const {showCompareFunc} = this.props.Actions;
        const {compareSet} = this.props.map_reducer;
        const {showCompare} = this.props.main;
        if (compareSet.size >= 2) {
            showCompareFunc(!showCompare)
        }
    }

    render() {
        const {fetching} = this.props.main;
        const {curentMap, compareSet} = this.props.map_reducer;
        return (
            <div className="block block-top block_map">
                <div className="item_header icon-container">
                    <SubMenu />
                    {::this.button()}
                    <i className="fa fa-expand fa-1x ico_map_full ico_hover" onClick={::this.omButtonMapClick}/>
                </div>
                <div id="map_wrapper" className="map_wrapper">
                    <div id="loader" className={fetching ? "show" : ''}/>
                    <i className="fa fa-balance-scale icon_grt_compare " aria-hidden="true"
                       onClick={::this.clickOnCompare}>
                        {compareSet.size === 0 ? '' : <span className="compare_count">{compareSet.size}</span>}
                    </i>
                    <i className="fa fa-plus fa-1x zoom_in_icon" onClick={::this.zoom_in} id="zoom_in"/>
                    <i className="fa fa-minus fa-1x zoom_out_icon" onClick={::this.zoom_out} id="zoom_out"/>
                    <i className="fa fa-dot-circle-o fa-1x geolocate_icon" onClick={::this.geolocate} id="geolocate"/>
                    <p ref="coordinate" id="coordinate"/>
                    <div id="map" className="maps__items"/>
                    <div id="basemaps-wrapper">
                        <p className="basemap_title">Базова карта</p>
                        <select name="basemaps" id="basemaps" onChange={::this.changeBasemap}>
                            <option value="Topographic">Топографічна</option>
                            {curentMap === null ? <option value="kadastr">Кадастрова карта</option> : '' }
                            <option value="Streets">Вулиці</option>
                            <option value="Imagery">Супутникова</option>
                            <option value="NationalGeographic">National Geographic</option>
                        </select>
                    </div>
                </div>
            </div>


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
        Actions: bindActionCreators(Actions, dispatch),
        MapActions: bindActionCreators(MapActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
