import choropleth from './colorRender'
import {Lmap, ukraine} from "./PageElement/Map";
import esri from 'esri-leaflet/dist/esri-leaflet';
import {checkStatus, parseJSON} from './checkJSON';

import {set_Range_items, set_legend_data} from './REDUX/actions/actions'
import {clickOnFeature, set_Hover_Color, set_isAllData, isAtoLayer, toggle_data} from './REDUX/actions/get_map_area'
import {store} from './index';
import {coordinate} from './PageElement/Map'
import {LightenDarkenColor, rgbToHex} from './utils/colors'
import {refsThisLegend} from './PageElement/Legend'
import {searchControlPoint} from './renderClaster/claster'
import '../lib/search';
import "leaflet-search/src/leaflet-search.css"

export let choroplethLayer = null;
// export let ato = null;
export let propertiesMain = null;
// let atoData = null;

let unsubscribe = null;
let unsubscribeCurency = null;
let randColor = {};
let myCurency = '';
export let searchControlArea = null;
let layerObject;

export default function getMap(properties, rebuild = true, isRegion) {

    let data = null;
    let layer = null;
    let searchItem = null;

    if (unsubscribe !== null) {
        unsubscribe();
        unsubscribe = null
    }

    if (unsubscribeCurency !== null) {
        unsubscribeCurency();
        unsubscribeCurency = null
    }

    let myStyle = {
        "color": "#A9A9A9",
        "weight": 2,
        "fillOpacity": 1,
        'className': 'ato'
    };


    let filds;
    let PropertiesLayer = [];
    if (rebuild) {
        propertiesMain = properties;

        if (isRegion) {
            data = propertiesMain.__region;
            filds = propertiesMain.__region[0].properties
        }
        else if ('__district' in propertiesMain){
            data = propertiesMain.__district;
            filds = propertiesMain.__district[0].properties
        }
        else if ('__otg' in propertiesMain){
            data = propertiesMain.__otg;
            filds = propertiesMain.__otg[0].properties
        }
        else if ('__settelments' in propertiesMain){
            data = propertiesMain.__settelments;
            filds = propertiesMain.__settelments[0].properties
        }


        // select field width data
        for (let key in filds) {
            if (filds.hasOwnProperty(key) && key.slice(0, 4) === 'year') {
                PropertiesLayer.push(key)
            }
        }

        store.dispatch(set_Range_items(PropertiesLayer.sort((a, b) => {
            a.length == 7 ? a = 'year_20' + a.substring(5) : '';
            b.length == 7 ? b = 'year_20' + b.substring(5) : '';

            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;

        }), PropertiesLayer.length - 1));

        Lmap.eachLayer(function (layer) {
            Lmap.removeLayer(layer)
        });

        if (searchControlPoint !== null) {
            Lmap.removeControl(searchControlPoint)
        }
        Lmap.setView([49, 31], 5);
        const {baseMap} = store.getState().map_reducer;
        esri.basemapLayer(baseMap).addTo(Lmap);
    } else {
        if (isRegion) {
            data = propertiesMain.__region;
            filds = propertiesMain.__region[0].properties
        }
        else if ('__district' in propertiesMain){
            data = propertiesMain.__district;
            filds = propertiesMain.__district[0].properties
        }
        else if ('__otg' in propertiesMain){
            data = propertiesMain.__otg;
            filds = propertiesMain.__otg[0].properties
        }
        else if ('__settelments' in propertiesMain){
            data = propertiesMain.__settelments;
            filds = propertiesMain.__settelments[0].properties
        }
    }

    if (Lmap.hasLayer(choroplethLayer)) {
        Lmap.removeLayer(choroplethLayer)
        choroplethLayer.clearLayers()
    }

    let state = store.getState();
    let {range_item, range_items,} = state.main;

    // function fetchAto() {
    //     fetch('/ato', {
    //         method: 'post'
    //     })
    //         .then(checkStatus)
    //         .then(parseJSON)
    //         .then(data => {
    //             atoData = data[1];
    //             ato = L.geoJSON(atoData, {
    //                 style: myStyle
    //             });
    //             Lmap.addLayer(ato)
    //         });
    // }

    // function getAto(item) {
    //     Lmap.hasLayer(ato) ? Lmap.removeLayer(ato) : "";
    //     let {range_items,} = state.main;
    //     if (range_items[item] > 'year_13' && atoData !== null) {
    //         ato ? ato.clearLayers() && Lmap.removeLayer(ato) : ''
    //         ato = L.geoJSON(atoData, {
    //             style: myStyle
    //         });
    //         setTimeout(() => {
    //             Lmap.addLayer(ato)
    //         }, 500);
    //
    //         store.dispatch(isAtoLayer(true))
    //     } else if (range_items[item] > 'year_13' && atoData === null) {
    //         fetchAto()
    //
    //         store.dispatch(isAtoLayer(true))
    //     } else if (range_items[item] <= 'year_13' && ato !== null) {
    //
    //         store.dispatch(isAtoLayer(false))
    //         ato.clearLayers();
    //         setTimeout(() => {
    //             Lmap.removeLayer(ato);
    //             ato = null;
    //         }, 500);
    //
    //     }
    // }

    function handleChange() {
        let nexItem = store.getState().main.range_item;

        if (nexItem != range_item) {
            range_item = nexItem;
            // getAto(range_item);
            renderLayer()
        }
        return
    }

    myCurency = store.getState().map_reducer.curency.toLowerCase();

    function handleChangeCurency() {
        let nextCurency = store.getState().map_reducer.curency.toLowerCase();
        if (nextCurency != myCurency) {
            myCurency = nextCurency;
            // getAto(range_item);
            renderLayer()
        }
        return
    }

    unsubscribe = store.subscribe(handleChange);
    unsubscribeCurency = store.subscribe(handleChangeCurency);

    function getRandomColorLayer() {
        const arrWithColor = [
            {
                scale: ['#bdc9e1', '#045a8c'],
                color: '#033a59'
            },
            {
                scale: ['#edf8e9', '#006d2c'],
                color: '#003b16',
            },
            {
                scale: ['#ffffb2', '#bd0026'],
                color: '#a12f19',
            }
        ];

        return arrWithColor[Math.floor(Math.random() * 3)]
    }

    function initArea() {
        const state = store.getState();
        const {curentMap} = state.map_reducer;

        if (curentMap !== null && curentMap.search('district') > 0) {
            store.dispatch(toggle_data(true));
        }
    }

    function renderSelectedArea() {
        let state = store.getState();
        const {selectedArea, compareSet} = state.map_reducer;

        choroplethLayer.eachLayer(layer => {

            if (layer.feature.id === selectedArea || compareSet.has(layer.feature.id)) {
                let newColor = LightenDarkenColor(layer.options.fillColor, +50);
                layer.setStyle({
                    fillColor: newColor,
                    weight: 3
                });
            }
        });
    }

    function joinGeometry(cordinate) {
        let i;
        let len = data.length;

        for (i = 0; i < len; i++) {
            data[i].geometry = cordinate[data[i].id];
        }
    }

    randColor = rebuild ? getRandomColorLayer() : randColor;
    // join geometry
    if (isRegion) {
        joinGeometry(coordinate.region)
    }
    else if ('__district' in propertiesMain){
        joinGeometry(coordinate.district)
    }
    else if ('__otg' in propertiesMain){
        joinGeometry(coordinate.otg)
    }
    else if ('__settelments' in propertiesMain){
        joinGeometry(coordinate.settelments)
    }

    function renderLayer() {

        if (Lmap.hasLayer(choroplethLayer)) {
            Lmap.removeLayer(choroplethLayer)
            choroplethLayer.clearLayers()
            choroplethLayer = null;
        }

        const eventsMap = {
            click: whenClicked,
            mouseover: onMouseOver,
            mouseout: onMouseout
        };
// hightligth color
        layerObject = {
            valueProperty: myCurency + range_items[range_item],
            scale: randColor.scale,
            steps: 5,
            mode: 'q',
            smoothFactor: 0,
            attribution: 'OpenData.ua',
            style: {
                color: randColor.color,
                weight: 0.2,
                fillOpacity: 0.85
            },
            onEachFeature: function (feature, layer) {
                layer.on(eventsMap)
            }
        };

        if (~state.main.submenu_item.indexOf('area_atu')) {
            let myStyle = {
                "color": "#bdc9e1",
                "fillColor": "#bdc9e1",
                "weight": 2,
                "opacity": .9
            };

            choroplethLayer = L.geoJSON(data, {
                attribution: 'OpenData.ua',
                style: myStyle,
                onEachFeature: function (feature, layer) {
                    layer.on(eventsMap)
                }
            });
        }
        else {
            choroplethLayer = L.choropleth(data, layerObject);
        }



        if (searchControlArea !== null) {
            Lmap.removeControl(searchControlArea)
        }

        searchControlArea = new L.Control.Search({
            propertyName: 'name_ua',
            marker: false,
            position: 'topright',
            textPlaceholder: 'Пошук',
            layer: choroplethLayer
        });

        searchControlArea.on('search:locationfound', function (e) {
            const bounds = e.layer._bounds;
            if (searchItem !== null) {
                choroplethLayer.resetStyle(searchItem);
            }
            store.dispatch(clickOnFeature(e.layer.feature.properties, e.layer.feature.properties.id)) // call click action
            searchItem = e.layer;
            let color = searchItem.options.fillColor;
            let newColor = LightenDarkenColor(color, +50);
            if (layer !== null) {
                choroplethLayer.resetStyle(layer);
            }

            searchItem.setStyle({
                fillColor: newColor,
                weight: 3
            });
            searchItem.bindTooltip(searchItem.feature.properties.name_ua, {
                direction: 'top',
                sticky: true
            }).openTooltip();
            isRegion ? Lmap.fitBounds(bounds, {maxZoom: 6, padding: [10, 10]}) : Lmap.fitBounds(bounds, {
                maxZoom: 8,
                padding: [10, 10]
            });
            setTimeout(() => {
                searchItem.closeTooltip()
            }, 2000)
        });
        Lmap.addControl(searchControlArea);  //inizialize search control

        function onMouseout(e) {
            console.log(e);
            
            let state = store.getState();
            const {selectedArea, compareSet} = state.map_reducer;
            let item = e.target;
            
            handleUnhoverLegendItem()

            if (item !== layer && item.feature.id !== selectedArea && !compareSet.has(item.feature.id)) {
                choroplethLayer.resetStyle(item);
            }
        }

        function onMouseOver(e) {
            let state = store.getState();
            const {selectedArea, compareSet} = state.map_reducer;
            let item = e.target;
    
            if(compareSet.has(item.feature.id)) { // double area hover fix
                return
            }
    
    
            handleHoverLegendItem(item);

            if (item == layer || item.feature.id == selectedArea) return;

            let color = item.options.fillColor;
            let newColor = LightenDarkenColor(color, +50);
            item.setStyle({fillColor: newColor});
            item.bindTooltip(item.feature.properties.name_ua, {
                direction: 'top',
                sticky: true
            }).openTooltip()
        }

        function handleUnhoverLegendItem() {
            let state = store.getState();
            const {legend_data} = state.main;
            if (legend_data !== null) {
                legend_data.refs.map((el, i) => {
                    if (Object.values(refsThisLegend.refs)[i]) {
                        Object.values(refsThisLegend.refs)[i].children[0].style.width = '36px';
                        Object.values(refsThisLegend.refs)[i].children[0].style.height = '26px';
                        Object.values(refsThisLegend.refs)[i].children[0].style.marginLeft = '0px';
                        Object.values(refsThisLegend.refs)[i].style.fontFamily = 'inherit';
                        Object.values(refsThisLegend.refs)[i].style.fontSize = '100%';
                    }
                });
            }
        }

        function handleHoverLegendItem(curColor) {
            let state = store.getState();
            const c = curColor.options.fillColor;
            const {legend_data} = state.main;
            if (legend_data !== null) {
                legend_data.refs.map((el, i) => {
                    if (Object.values(refsThisLegend.refs)[i]) {
                        const elI = Object.values(refsThisLegend.refs)[i].children[0];
                        const hexRef = rgbToHex(elI.style.backgroundColor);
                        const lighterRef = LightenDarkenColor(hexRef, +50);


                        if (c === hexRef || c === lighterRef) {
                            elI.style.marginLeft = '-3px';
                            elI.style.width = '42px';
                            elI.style.height = '32px';
                            Object.values(refsThisLegend.refs)[i].style.fontFamily = 'arial';
                            Object.values(refsThisLegend.refs)[i].style.fontSize = '15px';
                        }
                    }

                });
            }
        }

        function whenClicked(e) {
            let state = store.getState();
            const {selectedArea, compareSet} = state.map_reducer;
            const item = e.target;

            if (item.feature.id === selectedArea) {
                return
            }

            // choroplethLayer.eachLayer(layer => {
            //     console.log('eachLayer')
            //     if (layer.feature.id === selectedArea) {
            //         choroplethLayer.resetStyle(layer)
            //     }
            // });

            const bounds = item.getBounds();
            if (searchItem !== null) {
                choroplethLayer.resetStyle(searchItem);
            }

            if (layer === null) {
                layer = e.target;
            }
            else if (compareSet.has(layer.feature.id)) {
                handleUnhoverLegendItem();
                layer = e.target;
            }
            else if (layer !== null && layer.feature.properties.name_ua != e.target.feature.properties.name_ua ) {
                choroplethLayer.resetStyle(layer);
                handleUnhoverLegendItem();
                layer = e.target;
            }

            layer.setStyle({
                weight: 3
            });

            isRegion ? Lmap.fitBounds(bounds, {maxZoom: 6, padding: [10, 10]}) : Lmap.fitBounds(bounds, {
                maxZoom: 8,
                padding: [10, 10]
            });

            store.dispatch(clickOnFeature(e.target.feature.properties, e.target.feature.properties.id))
        }


        Lmap.addLayer(choroplethLayer);


        if (~state.main.submenu_item.indexOf('area_atu')) {

        }
        else {
            let legend_refs = [];
            for (let i = 0; i < choroplethLayer.options.limits.length; i++)
                legend_refs.push(`legend${i}`)

            let legend_data = {
                limits: choroplethLayer.options.limits,
                colors: choroplethLayer.options.colors,
                parametr: filds.parameter,
                refs: legend_refs
            };
            store.dispatch(set_legend_data(legend_data));
        }


        initArea();
        renderSelectedArea();
    }

    renderLayer();
    // getAto(range_item);
}