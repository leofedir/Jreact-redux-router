import {Lmap, ukraine} from "../PageElement/Map";
import {choroplethLayer} from "../getMapArea";
import {store} from '../index'
import L from 'leaflet';
import esri from 'esri-leaflet/dist/esri-leaflet';
import {clickOnFeatureClaster, set_chart_data} from '../REDUX/actions/get_map_area'
var Highcharts = require('highcharts');
import {checkStatus, parseJSON} from '../checkJSON';

import 'leaflet.markercluster/dist/leaflet.markercluster-src';

// import getFields from './setFields';
// import Cluster from 'esri-leaflet-cluster';
// import Geocoding from 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
// import * as d3 from 'd3';
// import React from 'react';
// let currentSearcherControl = null;
let layers = {};

export function removeClaster() {

}

export function layersTriger(id, status) {
    switch (status) {
        case 'show':
            return showLayer(id);
        case 'hide':
            return hideLayer(id);
    }
}

function showLayer(id) {
    Lmap.addLayer(layers[id]);
    // addProvider(layers[id].options.url, id)
    // updateSearchControl();
}

function hideLayer(id) {
    Lmap.removeLayer(layers[id]);
    // removeProvider(id)
    // updateSearchControl();
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

    Lmap.eachLayer(function (layer) {
        Lmap.removeLayer(layer)
    });

    Lmap.setView([49, 31], 5);
    esri.basemapLayer('Topographic').addTo(Lmap);

    // choroplethLayer ? Lmap.removeLayer(choroplethLayer) : '';

    let icon = L.icon({
        iconUrl: '/img/marker-icon.svg',
        iconSize: [25, 36],
        iconAnchor: [12, 33]
    });

    data.forEach(function (layer, i) {
        let grup = L.markerClusterGroup({chunkedLoading: true})
        let m = L.geoJson(layer[1], {
            // Cluster Options
            polygonOptions: {
                color: "#2d84c8"
            },
            // Feature Layer Options
            pointToLayer: function (geojson, latlng) {
                return L.marker(latlng, {icon: icon});
            },
        });
        grup.addLayer(m);
        grup.on('click', whenClicked);
        layers[i] = grup;
    });

    function whenClicked(e) {
        console.log('e.target >>', e.layer)
        let feature = e.layer.feature.properties;
        store.dispatch(clickOnFeatureClaster(feature))

        if (Object.keys(feature).some(item =>item.indexOf('chart'))) {
            console.log('ok >>')
            chartData(feature)
        }
    }

    function chartData(feature_claster) {
        let chart1 = {};
        let chart2 = {};

        if (feature_claster != null) {
            for (let key in feature_claster) {
                if (feature_claster.hasOwnProperty(key)) {
                    let name = key.slice(0, key.indexOf('_'));
                    let serias = key.slice(7, key.length - 5);
                    let year = +key.slice(key.length - 4);
                    let value = +feature_claster[key];

                    if (name === 'chart1') {
                        chart1[serias] ? chart1[serias].push({year, value}) : chart1[serias] = [{year, value}];
                        // addChart();
                    } else if (name === 'chart2') {
                        chart2[serias] ? chart2[serias].push({year, value}) : chart2[serias] = [{year, value}];
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
            if (Object.keys(chart1).length > 0 || Object.keys(chart2).length > 0) {
                sort_data(chart1);
                sort_data(chart2);
                store.dispatch(set_chart_data(chart1, chart2))
            }
        }
    }

    showLayer(0)
    //
    // Lmap.fitBounds(markers.getBounds());


    //     // Lmap = null;
    //     let chart;
    //     let alias = {
    //         teplo: 'Теплопостачання',
    //         elektroenergy: 'Електропостачання',
    //         water: 'Водопостачання',
    //         inshivydatky: 'Інші видатки'
    //     }
    //     document.getElementById('basemaps-wrapper').style.display = "block";
    //
    //     let provider = [];
    //     let objProvider = {};
    //     let UrlLay;
    //     if (aaa) {
    //         UrlLay = aaa.UrlLay
    //     } else {
    //         UrlLay = this.props.UrlLay;
    //     }
    //
    //     // if (!Lmap) {
    //     //     document.getElementById('lmap').remove();
    //     //     createMap()
    //     // }
    //
    //     // function createMap() {
    //
    //        // let root = document.getElementById('piint_root');
    //        // let lmap = document.createElement('div');
    //        // lmap.setAttribute('id', 'lmap');
    //        // root.appendChild(lmap);
    //
    //        // Lmap = L.map('lmap', {
    //        //     zoomControl: false
    //        // }).setView([49, 31], 6);
    //        // esri.basemapLayer('Topographic').addTo(Lmap);
    //
    //     // }
    //
    //     let icon = L.icon({
    //         iconUrl: '/img/marker-icon.svg',
    //         iconSize:     [25, 36],
    //         iconAnchor:   [12, 33]
    //     });
    //
    //     function Chart(data) {
    //         let dataNest = d3.nest()
    //             .key(function(d) {return d.name;})
    //             .rollup(function(v) { return {
    //                 count: v.length,
    //                 data: v.map(function(d) { return d.data; })
    //             }; })
    //             .entries(data);
    //
    //         let newData = dataNest.map(item => {
    //             console.log(item)
    //             return {
    //                 name: alias[item.key],
    //                 data: item.values.data
    //             }
    //         });
    //
    //         chart = Highcharts.chart('chart_point', {
    //             colors: ['#ffc20e', '#8dc63f', '#00aeef', '#bd1a8d'],
    //
    //             title: {
    //                 text: 'Витрати'
    //             },
    //
    //             exporting: {
    //                 buttons: {
    //                     exportButton: {
    //                         symbol: 'url(http://highcharts.com/demo/gfx/sun.png)',
    //                         symbolX:5,
    //                         symbolY:0
    //                     }
    //                 }
    //             },
    //
    //             chart: {
    //                 type: 'line',
    //                 marginRight: 20
    //             },
    //
    //             credits: {
    //                 // enabled: false,
    //                 text: 'Енциклопедія територій',
    //                 href: 'http://enter.co.ua'
    //             },
    //             yAxis: {
    //                 title: {
    //                     text: 'грн.'
    //                 }
    //             },
    //             legend: {
    //                 layout: 'horizontal',
    //                 align: 'center',
    //                 verticalAlign: 'bottom'
    //             },
    //
    //             xAxis: {
    //                 crosshair: true
    //             },
    //
    //             tooltip: {
    //                 shared: true,
    //             },
    //
    //             plotOptions: {
    //                 series: {
    //                     pointStart: 2014
    //                 }
    //             },
    //
    //             series: newData
    //
    //         });
    //
    //     }
    //     //
    //     //
    //     // fetch(UrlLay + '?f=pjson')
    //     //     .then(checkStatus)
    //     //     .then(parseJSON)
    //     //     .then(process);
    //
    //     // function process(list){
    //         let popup = document.getElementById('props');
    //         let fields = getFields();
    //         let layersBox = document.querySelector('#layer_list');
    //         let setLayers = ['<span class="title_leayers"><b>Об’єкти</b><img id="object_hide" src="/img/-.svg" alt=""> </span>'];
    //         layers = {};
    //
    //         function createPopup(e) {
    //             let popapItems = [`<div class="popup_header"><button class="closeButton" onclick="document.getElementById('props').style.display = 'none'"></button></div>`];
    //             popup.style.display = 'block';
    //
    //             fields.forEach(item => {
    //
    //                 if (item.title === 'Назва') {
    //                     popapItems.push(`<h5 className="name">${ e.layer.feature.properties[item.key] }</h5>`)
    //                 } else if (e.layer.feature.properties[item.key]) {
    //                     popapItems.push(`<div class="popup_item"><img src="${ item.img }"><p>${ e.layer.feature.properties[item.key] }</p></div> `)
    //                 }
    //             })
    //
    //             let data = e.layer.feature.properties;
    //
    //             for (let key in data) {
    //                 if (data.hasOwnProperty(key) && ~key.indexOf('_') && key.slice(0, key.indexOf('_')) == 'chart') {
    //                     addChart();
    //                     return
    //                 }
    //
    //             };
    //
    //             popup.innerHTML = popapItems.join('')
    //
    //             addEventClose()
    //
    //             function addChart () {
    //
    //                 popapItems.push(`<div class="wrapp_chart"><div id="chart_point" className="chart"></div></div>`)
    //                 let dataChart = [];
    //
    //                 for (let key in data) {
    //                     if (data.hasOwnProperty(key)) {
    //                         let str = key.slice(0, key.indexOf('_'))
    //                         if (str == 'chart') {
    //                             str = (key.slice(key.indexOf('_') + 1, key.indexOf('_', key.indexOf('_') + 1)))
    //                             let obj = {};
    //                             obj.name = str;
    //                             // obj.date = `${new Date(key.slice(key.lastIndexOf('_') + 1)).getTime()}`;
    //                             // obj.date = `${key.slice(key.lastIndexOf('_') + 1)}`;
    //                             obj.data = data[key];
    //                             dataChart.push(obj)
    //                         }
    //                     }
    //                 }
    //                 popup.innerHTML = popapItems.join('')
    //                 Chart(dataChart)
    //                 addEventClose()
    //             }
    //         }
    //
    //         function addEventClose() {
    //             let popups = document.querySelectorAll('#props');
    //
    //             function removePopups(e) {
    //                 if(!e.target.matches('.popups *') && !e.target.matches('.leaflet-marker-icon')) {
    //                     popups[0].style.display = 'none';
    //                     this.removeEventListener('click', removePopups);
    //                 }
    //             }
    //             window.addEventListener('click', removePopups);
    //         }
    //
    //         // list.layers.forEach(function(layer){
    //         //     setLayers.push('<p><label><input type="checkbox" value="'+ layer.id +'" class="checkbox"><span class="icon"></span><span class="text">'+ layer.name +'</span></label></p>')
    //         //     let m = Cluster.featureLayer({
    //         //         url: UrlLay + '/' + layer.id,
    //         //         // Cluster Options
    //         //         polygonOptions: {
    //         //             color: "#2d84c8"
    //         //         },
    //         //         // Feature Layer Options
    //         //         pointToLayer: function (geojson, latlng) {
    //         //             return L.marker(latlng, {icon: icon});
    //         //         }
    //         //     });
    //         //     m.on('click', createPopup)
    //         //     layers[layer.id] = m;
    //         // });
    //
    //
    //         layersBox.innerHTML = `<div class="layerWrapp" id="layerWrapp"></div>`;
    //
    //         let layerWrapp = document.querySelector('.layerWrapp')
    //         let titleButton = document.querySelector('.title_button')
    //         let layer_icon = document.createElement('i');
    //         layer_icon.className = 'fa fa-database fa-2x square';
    //         layer_icon.id = 'object';
    //         let info_icon = document.createElement('i');
    //         info_icon.className = 'fa fa-info fa-2x square';
    //
    //         titleButton.appendChild(layer_icon)
    //         titleButton.appendChild(info_icon)
    //
    //
    //         layerWrapp.innerHTML = setLayers.join('');
    //
    //         let object_hide = document.getElementById('object_hide');
    //         object_hide.addEventListener('click', () => {
    //             document.getElementById('layerWrapp').classList.add("hide_layers")
    //             document.getElementById('object').classList.add("active")
    //         });
    //
    //         let object_show = document.getElementById('object');
    //         object_show.addEventListener('click', () => {
    //             document.getElementById('layerWrapp').classList.remove("hide_layers")
    //             document.getElementById('object').classList.remove("active")
    //         });
    //
    //         // turn-on first layer
    //         if (Object.keys(layers).length > 0) {
    //             document.querySelector('input[value="0"]').checked = true;
    //             showLayer(Object.keys(layers)[0]);
    //         }
    //
    //         function layersTriger(e) {
    //             if(e.target.checked) {
    //                 showLayer(e.target.value)
    //             }else{
    //                 hideLayer(e.target.value);
    //             }
    //         }
    //
    //         layersBox.addEventListener('change', layersTriger)
    //
    //         function addProvider(url, id) {
    //             objProvider[id] = (Geocoding.featureLayerProvider({
    //                     url: url,
    //                     searchFields: ['nameua', 'adress'], // Search these fields for text matches
    //                     label: list.layers[id].name, // Group suggestions under this header
    //                 }));
    //             createArreyProvider()
    //         }
    //
    //         function createArreyProvider() {
    //             provider = [];
    //             for (let key in objProvider) {
    //                 if (objProvider.hasOwnProperty(key)) {
    //                     provider.push(objProvider[key])
    //                 }
    //             }
    //         }
    //
    //         function removeProvider(id) {
    //             if (objProvider[id]) {
    //                 delete objProvider[id]
    //                 createArreyProvider()
    //             }
    //         }
    //
    //         function updateSearchControl(){
    //             if(currentSearcherControl !== null){
    //                 Lmap.removeControl(currentSearcherControl);
    //             }
    //
    //             currentSearcherControl = Geocoding.geosearch({
    //                 providers: provider,
    //                 position: 'topright',
    //                 title: 'Пошук',
    //                 placeholder: ''
    //             })
    //
    //             currentSearcherControl.addTo(Lmap);
    //             document.querySelector('.geocoder-control-input').setAttribute("placeholder", "Введіть назву");
    //         }
    //
    //         function showLayer(id){
    //             Lmap.addLayer(layers[id]);
    //             addProvider(layers[id].options.url, id)
    //             updateSearchControl();
    //         }
    //
    //         function hideLayer(id){
    //             Lmap.removeLayer(layers[id]);
    //             removeProvider(id)
    //             updateSearchControl();
    //         }

    // }
    // }
    //
    // componentDidMount() {
    //     this.claster()
    // }
    //
    // render () {
    //     return (
    //         <div id="map" className="maps__items"/>
    //     );
    // }

}

