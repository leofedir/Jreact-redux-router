import choropleth from './colorRender'
import {Lmap, ukraine} from "./PageElement/Map";
import esri from 'esri-leaflet/dist/esri-leaflet';
import {checkStatus, parseJSON} from './checkJSON';

import {set_Range_items, set_legend_data} from './REDUX/actions/actions'
import {clickOnFeature, set_Hover_Color} from './REDUX/actions/get_map_area'
import {store} from './index';
import {coordinate} from './PageElement/Map'
import {LightenDarkenColor, rgbToHex} from './utils/colors'
import {refsThis} from './PageElement/Legend'

export let choroplethLayer = null;
export let ato = null;
export let propertiesMain = null;
let atoData = null;
let data = null;
let unsubscribe = null;
let unsubscribeCurency = null;
let randColor = {};
let myCurency = '';

export default function getMap(properties, rebuild = true, isRegion) {
    let layer = null;

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
        } else {
            data = Object.values(propertiesMain.__district);
            filds = propertiesMain.__district[0].properties
        }


        // select field width data
        for (let key in filds) {
            if (filds.hasOwnProperty(key) && key.slice(0, 4) === 'year') {
                PropertiesLayer.push(key)
            }
        }
        
        store.dispatch(set_Range_items(PropertiesLayer.sort(), PropertiesLayer.length-1));

        Lmap.eachLayer(function (layer) {
            Lmap.removeLayer(layer)
        });

        Lmap.setView([49, 31], 5);
        esri.basemapLayer('Topographic').addTo(Lmap);
    } else {
        if (isRegion) {
            data = Object.values(propertiesMain.__region);
            filds = propertiesMain.__region[0].properties
        } else {
            data = Object.values(propertiesMain.__district);
            filds = propertiesMain.__district[0].properties
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

        choroplethLayer = L.choropleth(data, layerObject).addTo(Lmap);
        
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
            if (legend_data !== null ) {
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