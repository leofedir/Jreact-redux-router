import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../REDUX/actions/actions';
import * as MapActions from '../REDUX/actions/get_map_area';

import {checkStatus, parseJSON} from '../checkJSON';
import L from 'leaflet';
import esri from 'esri-leaflet/dist/esri-leaflet';
import SubMenu from "./getSubMenu";
import getMap from './../getMapArea';

export let Lmap = null;
export let ukraine = null;
export let coordinate = {};

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
            this.refs.region.classList.remove('active')
            this.refs.district.classList.remove('active')
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

        const {fields, submenu_item} = this.props.main;
        const mapSet = fields[submenu_item];
        const {curentMap} = this.props.map_reducer;

        _curentMap === null ? _curentMap = curentMap : '';

        if (~_curentMap.indexOf(id)) {
            return
        }

        if (id == 'region' && mapSet.some(a => ~a.indexOf('__region'))) {
            target.classList.add('active')
            this.refs.district.classList.remove('active')
            getMap(null, false, true)

            // toggle BarChart
            this.props.MapActions.toggle_data(this.props.map_reducer.dataChartRegion)

            _curentMap = id

        } else if (id == 'district' && mapSet.some(a => ~a.indexOf('__district'))) {
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
        Lmap = L.map('map', {zoomControl: false, minZoom: 3}).setView([49, 31], 6);

        layer = esri.basemapLayer(baseMap);
        Lmap.addLayer(layer);

        function onMouseMove(e) {
            cordinateContainer.innerHTML = e.latlng.lat.toFixed(3) + "° пн. ш, " + e.latlng.lng.toFixed(3) + "° сх. д."
        }

        // add event to map actions
        Lmap.on('mousemove', onMouseMove);

        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Accept", "application/json, text/javascript, */*; q=0.01");
        //
        //
        // for (let i = 2; i < 3; i++) {
        //
        //     fetch(`https://www.drv.gov.ua/portal/gis$core.Gis_DistrPoly?p_f5271=${i}&ts=0.0325268442642479`, {
        //         method: 'GET',
        //         // headers: myHeaders,
        //         mode: 'no-cors'
        //     })
        //         // .then(checkStatus)
        //         // .then(parseJSON)
        //         .then(data => {
        //             console.log('data >>', data)
        //             // fetch('grab', {
        //             //     method: 'post',
        //             //     body: `table=${data}`
        //             // })
        //
        //             // INSERT INTO table_name (id , bbox ... ) VALUES (1,2,3,4) , (5,6,7,8) , (9,10,11) ...
        //         })
        // }
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
                coordinate.region = {};
                coordinate.district = {};
                coordinate.otg = {};
                coordinate.settelments = {};
                for (let key in data.region) {
                    if (data.region.hasOwnProperty(key)) {
                        // console.log('region >>')
                        coordinate.region[key] = JSON.parse(data.region[key])
                    }
                }
                for (let key in data.district) {
                    if (data.district.hasOwnProperty(key)) {
                        // console.log('district >>')
                        coordinate.district[key] = JSON.parse(data.district[key])
                    }
                }
                //
                // for (let key in data.otg) {
                //     if (data.otg.hasOwnProperty(key)) {
                //         // console.log('otg >>')
                //         coordinate.otg[key] = JSON.parse(data.otg[key])
                //     }
                // }
                // for (let key in data.settelments) {
                //     if (data.settelments.hasOwnProperty(key)) {
                //         // console.log('settelments >>')
                //         coordinate.settelments[key] = JSON.parse(data.settelments[key])
                //     }
                // }

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
        const {submenu_item} = this.props.main;
        if (submenu_item.indexOf('area_') < 0) {
            return null;
        } else {
            return (
                <div className="buttons_change_TO">
                    <p onClick={::this.hendlerChangeOT} id='region' ref="region" className="button_change_TO">
                        Області</p>
                    <p onClick={::this.hendlerChangeOT} id='district' ref="district" className="button_change_TO">
                        Райони</p>
                    {/*<p onClick={::this.hendlerChangeOT} ref="area" className="button_change_TO">ОТГ</p>*/}
                    {/*<p onClick={::this.hendlerChangeOT} ref="area" className="button_change_TO">Міста</p>*/}
                </div>
            )
        }
    }

    render() {
        const {fetching} = this.props.main;
        const {curentMap} = this.props.map_reducer;
        return (
            <div className="block block-top block_map">
                <div className="item_header icon-container">
                    <SubMenu />
                    {::this.button()}

                    <i className="fa fa-expand fa-1x ico_map_full ico_hover" onClick={::this.omButtonMapClick}/>
                </div>
                <div id="map_wrapper" className="map_wrapper">
                    <div id="loader" className={fetching ? "show" : ''}/>
                    {/*<i className="fa fa-balance-scale icon_grt_compare " aria-hidden="true">*/}
                        {/*{compareSet.size === 0 ? '' : <span className="compare_count">{compareSet.size}</span>}*/}
                    {/*</i>*/}
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
