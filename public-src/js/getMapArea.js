import choropleth from './colorRender'
import {Lmap, ukraine} from "./PageElement/Map";
import esri from 'esri-leaflet/dist/esri-leaflet';
import {checkStatus, parseJSON} from './checkJSON';

import {set_Range_items, set_legend_data} from './REDUX/actions/actions'
import {clickOnFeature, set_Hover_Color, set_isAllData} from './REDUX/actions/get_map_area'
import {store} from './index';
import {coordinate} from './PageElement/Map'
import {LightenDarkenColor, rgbToHex} from './utils/colors'
import {refsThis} from './PageElement/Legend'
import {searchControlPoint} from './renderClaster/claster'

export let choroplethLayer = null;
export let ato = null;
export let propertiesMain = null;
let atoData = null;
let data = null;
let unsubscribe = null;
let unsubscribeCurency = null;
let randColor = {};
let myCurency = '';
export let searchControlArea = null;

export default function getMap(properties, rebuild = true, isRegion) {
    let layer = null;
    let searchItem = null;
    let districtContainer = []

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
            data = Object.values(propertiesMain.__region);
            filds = propertiesMain.__region[0].properties
    
            districtContainer = propertiesMain.__district;
        } else {
            data = Object.values(propertiesMain.__district);
            filds = propertiesMain.__district[0].properties
    
            districtContainer = propertiesMain.__district;
        }


        // select field width data
        for (let key in filds) {
            if (filds.hasOwnProperty(key) && key.slice(0, 4) === 'year') {
                PropertiesLayer.push(key)
            }
        }

        store.dispatch(set_Range_items(PropertiesLayer.sort(), PropertiesLayer.length - 1));

        Lmap.eachLayer(function (layer) {
            Lmap.removeLayer(layer)
        });

        if (searchControlPoint !== null) {
            Lmap.removeControl(searchControlPoint)
        }

        Lmap.setView([49, 31], 5);
        esri.basemapLayer('Topographic').addTo(Lmap);
    } else {
        if (isRegion) {
            data = Object.values(propertiesMain.__region);
            filds = propertiesMain.__region[0].properties;

            districtContainer = propertiesMain.__district;
        } else {
            data = Object.values(propertiesMain.__district);
            filds = propertiesMain.__district[0].properties;

            districtContainer = propertiesMain.__district;
        }
    }


    if (Lmap.hasLayer(choroplethLayer)) {
        Lmap.removeLayer(choroplethLayer)
    }

    let state = store.getState();
    let {range_item, range_items,} = state.main;

    function fetchAto() {
        fetch('/ato', {
            method: 'post'
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                atoData = data[1];
                ato = L.geoJSON(data[1], {
                    style: myStyle
                });
                Lmap.addLayer(ato)
            });
    }

    function getAto(item) {
        Lmap.hasLayer(ato) ? Lmap.removeLayer(ato) : "";
        let {range_items,} = state.main;
        if (range_items[item] > 'year_13' && atoData !== null) {
            ato ? ato.clearLayers() && Lmap.removeLayer(ato) : ''
            ato = L.geoJSON(atoData, {
                style: myStyle
            });
            setTimeout(() => {
                Lmap.addLayer(ato)
            }, 500)

        } else if (range_items[item] > 'year_13' && atoData === null) {
            fetchAto()
        } else if (range_items[item] < 'year_13' && ato !== null) {
            ato.clearLayers();
            setTimeout(() => {
                Lmap.removeLayer(ato);
                ato = null;
            }, 500);
        }
    }


    function handleChange() {
        let nexItem = store.getState().main.range_item;

        if (nexItem != range_item) {
            range_item = nexItem;
            getAto(range_item);
            renderLayer()
        }
        return
    }

    myCurency = store.getState().map_reducer.curency.toLowerCase();

    function handleChangeCurency() {
        let nextCurency = store.getState().map_reducer.curency.toLowerCase();
        if (nextCurency != myCurency) {
            myCurency = nextCurency;
            getAto(range_item);
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

        let randIndex = Math.floor(Math.random() * 3);

        return arrWithColor[randIndex]
    }


    randColor = rebuild ? getRandomColorLayer() : randColor;

    function renderLayer() {
        // store.dispatch(startLoad());
        if (Lmap.hasLayer(choroplethLayer)) {
            Lmap.removeLayer(choroplethLayer)
        }

        function joinGeometry(cordinate) {
            let i;
            let len = data.length;
            for (i = 0; i < len; i++) {
                let coord = cordinate.filter(item => {
                    if (item.id == data[i].id) {
                        return item.geometry
                    }
                });
                data[i].geometry = coord[0].geometry
            }

        }

        // join geometry
        isRegion ? joinGeometry(coordinate.region) : joinGeometry(coordinate.district)

        const eventsMap = {
            click: whenClicked,
            mouseover: onMouseOver,
            mouseout: onMouseout
        };
// hightligth color
        const layerObject = {
            valueProperty: myCurency + range_items[range_item],
            scale: randColor.scale,
            steps: 5,
            mode: 'q',
            smoothFactor: 0,
            style: {
                color: randColor.color,
                weight: 0.2,
                fillOpacity: 0.85
            },
            onEachFeature: function (feature, layer) {
                layer.on(eventsMap)
            }
        };

        //check all data is correct
        function isAllData() {
            let state = store.getState();
            let {curentMap} = state.map_reducer;
            const dontSearchKoatuu = ['44', '14', '01', '85'];
            const dontSearchAlias = [
                'area_zemres_avgareapai',
                'area_zemres_chastkaderjavnyh',
                'area_zemres_chastkajytlova',
                'area_zemres_chastkakomunalnyh',
                'area_zemres_chastka',
                'area_zemres_chastkapromyslovyh',
                'area_zemres_chastkapryvatnyh',
                'area_zemres_chastkspai',
                'area_zemres_chastkasgzemel',
                'area_zemres_komunalnizemli',
                'area_zemres_derjavnizemli',
                'area_zemres_chastkalisovi',
                'area_zemres_rekreaciyazemli',
                'area_zemres_lisovizemli'
            ];
            
            // cat of string __district or __region
            let regExp = /(__)\w+/g;
            curentMap = curentMap.replace(regExp, '');
            
            for (let i of districtContainer) {
                for (let j in i.properties) {
                    if (range_items !== undefined &&
                        j === range_items[range_item] &&
                        !dontSearchAlias.includes(curentMap) &&
                        !dontSearchKoatuu.includes(i.properties.koatuu.substring(0,2))) {
                            if(i.properties[j] === null) return false
                    }
                }
            }

            return true
        }
        store.dispatch(set_isAllData(isAllData()));
        
        choroplethLayer = L.choropleth(data, layerObject).addTo(Lmap);

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
        searchControlPoint.__proto__._handleAutoresize = () => {}; //need to fix resize bug

        searchControlArea.on('search:locationfound', function (e) {
            const bounds = e.layer._bounds;
            if (searchItem !== null) {
                choroplethLayer.resetStyle(searchItem);
            }
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
            })
            setTimeout(() => {
                searchItem.closeTooltip()
            }, 2000)
        });
        Lmap.addControl(searchControlArea);  //inizialize search control

        function onMouseout(e) {
            let item = e.target;
            handleUnhoverLegendItem()
            if (item !== layer) {
                choroplethLayer.resetStyle(item);

            }
        }

        function onMouseOver(e) {
            let item = e.target;
            handleHoverLegendItem(item)
            if (item == layer) return;

            let color = item.options.fillColor
            let newColor = LightenDarkenColor(color, +50)
            item.setStyle({fillColor: newColor})
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
                    if (Object.values(refsThis.refs)[i]) {
                        Object.values(refsThis.refs)[i].children[0].style.width = '36px';
                        Object.values(refsThis.refs)[i].children[0].style.height = '26px';
                        Object.values(refsThis.refs)[i].children[0].style.marginLeft = '0px';
                        Object.values(refsThis.refs)[i].style.fontFamily = 'inherit';
                        Object.values(refsThis.refs)[i].style.fontSize = '100%';
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
                    if (Object.values(refsThis.refs)[i]) {
                        const elI = Object.values(refsThis.refs)[i].children[0]
                        const hexRef = rgbToHex(elI.style.backgroundColor)
                        const lighterRef = LightenDarkenColor(hexRef, +50)


                        if (c === hexRef || c === lighterRef) {
                            elI.style.marginLeft = '-3px';
                            elI.style.width = '42px';
                            elI.style.height = '32px';
                            Object.values(refsThis.refs)[i].style.fontFamily = 'arial';
                            Object.values(refsThis.refs)[i].style.fontSize = '15px';
                        }
                    }

                });
            }
        }

        function whenClicked(e) {
            const bounds = e.target.getBounds();

            if (searchItem !== null) {
                choroplethLayer.resetStyle(searchItem);
            }

            if (layer === null) {
                layer = e.target;
            } else if (layer !== null && layer.feature.properties.name_ua != e.target.feature.properties.name_ua) {
                handleUnhoverLegendItem()
                choroplethLayer.resetStyle(layer);
                layer = e.target;
            }

            layer.setStyle({
                weight: 3
            });

            isRegion ? Lmap.fitBounds(bounds, {maxZoom: 6, padding: [10, 10]}) : Lmap.fitBounds(bounds, {
                maxZoom: 8,
                padding: [10, 10]
            });

            store.dispatch(clickOnFeature(e.target.feature.properties))
        }

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

    renderLayer();
    getAto(range_item);

}