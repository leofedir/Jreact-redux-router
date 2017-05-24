import choropleth from './colorRender'
import {Lmap, ukraine} from "./PageElement/Map";
import esri from 'esri-leaflet/dist/esri-leaflet';
import {checkStatus, parseJSON} from './checkJSON';

import {set_Range_items, set_legend_data} from './REDUX/actions/actions'
import {clickOnFeature} from './REDUX/actions/get_map_area'
import {store} from './index';
import {coordinate} from './PageElement/Map'

export let choroplethLayer = null;
export let ato = null;
let atoData = null;
let unsubscribe = null;
let randColor = {};

export default function getMap(data, rebuild = true, isRegion) {
    let layer = null;

    if (unsubscribe !== null) {
        unsubscribe();
        unsubscribe = null
    }
    let myStyle = {
        "color": "#A9A9A9",
        "weight": 2,
        "fillOpacity": 1,
        'className': 'ato'

    };

    if (rebuild) {
        Lmap.eachLayer(function (layer) {
            Lmap.removeLayer(layer)
        });

        Lmap.setView([49, 31], 5);
        esri.basemapLayer('Topographic').addTo(Lmap);
    }

    if (Lmap.hasLayer(choroplethLayer)) {
        Lmap.removeLayer(choroplethLayer)
    }

    let filds = data[0].properties;
    let propertys = []

    // select field width data
    for (let key in filds) {
        if (filds.hasOwnProperty(key) && key.slice(0, 4) === 'year') {
            propertys.push(key)
        }
    }
    store.dispatch(set_Range_items(propertys));

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
        if (item > 0 && atoData !== null) {
            ato ? ato.clearLayers() && Lmap.removeLayer(ato) : ''
            ato = L.geoJSON(atoData, {
                style: myStyle
            });
            setTimeout(() => {
                Lmap.addLayer(ato)
            }, 500)

        } else if (range_item > 0 && atoData === null) {
            fetchAto()
        } else if (range_item == 0 && ato !== null) {
            ato.clearLayers();
            Lmap.removeLayer(ato);
            ato = null;
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

    unsubscribe = store.subscribe(handleChange);
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
                data[i].geometry = cordinate[i]
            }

        }

        // join geometry
        isRegion ? joinGeometry(coordinate.region) : joinGeometry(coordinate.district)

        const eventsMap = {
            click: whenClicked,
            mouseover: onMouseOver
        };
        
        const layerObject = {
            valueProperty: range_items[range_item],
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
        
        
        function onMouseOver(e) {
            let item = e.target;
            item.bindTooltip(item.feature.properties.name_ua, {
                direction: 'top',
                sticky: true
            }).openTooltip()
        }

        function whenClicked(e) {
            const bounds = e.target.getBounds();

            if (layer === null) {
                layer = e.target;
            } else if (layer !== null && layer.feature.properties.name_ua != e.target.feature.properties.name_ua) {
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

        let legend_data = {
            limits: choroplethLayer.options.limits,
            colors: choroplethLayer.options.colors,
            parametr: filds.parameter
        };

        store.dispatch(set_legend_data(legend_data));
    }

    renderLayer();
    getAto(range_item);

}