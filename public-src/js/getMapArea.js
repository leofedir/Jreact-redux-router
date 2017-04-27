import choropleth from './colorRender'
import {Lmap, ukraine} from "./PageElement/Map";
import esri from 'esri-leaflet/dist/esri-leaflet';

import {set_Range_items, set_legend_data} from './REDUX/actions/actions'
import {clickOnFeature} from './REDUX/actions/get_map_area'
import {store} from './index'

export let choroplethLayer = null;

export default function getMap(data, rebuild = true) {

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

    let item = state.main.range_item;
    let items = state.main.range_items;

    function handleChange() {
        let nexItem = store.getState().main.range_item;
        if (nexItem !== item) {
            item = nexItem;
            renderLayer();
        }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();

    function renderLayer() {
        if (Lmap.hasLayer(choroplethLayer)) {
            Lmap.removeLayer(choroplethLayer)
        }

        choroplethLayer = L.choropleth(data, {
            valueProperty: items[item],
            scale: ['#ffffb2', '#bd0026'],
            steps: 5,
            mode: 'q',
            style: {
                color: '#a12f19',
                weight: 0.2,
                fillOpacity: 0.85

            },
            onEachFeature: function (feature, layer) {
                layer.on('click', whenClicked)
            }
        }).addTo(Lmap)

        function whenClicked(e) {
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

}