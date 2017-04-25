import choropleth from './colorRender'
import {Lmap, ukraine} from "./PageElement/Map"

import {set_Range_items} from './REDUX/actions/actions'
import {clickOnFeature} from './REDUX/actions/get_map_area'
import {store} from './index'
import { markers } from './renderClaster/claster'

export let choroplethLayer = null;

export default function getMap(data, rebuild = true) {
    Lmap.removeLayer(ukraine);

    markers ? Lmap.removeLayer(markers) : '';

    rebuild ? Lmap.setView([49, 31], 5) : '';

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

        // Add legend (don't forget to add the CSS from index.html)
        var div = document.getElementById('legend')
        var limits = choroplethLayer.options.limits
        var colors = choroplethLayer.options.colors
        var labels = []
        div.innerHTML = '';
        div.innerHTML = `<h5 class="legend__title">Одиниці виміру: <span>${ filds.parameter }</span></h5>`
        let dani = 'Дані відсутні'

        limits.forEach(function (limit, i) {
            labels.push('<i style="background:' + colors[i] + '"></i> ' +
                ((limits[i] !== null) ? new Intl.NumberFormat().format(limits[i]) : dani) + ((i !== limits.length - 1 && limits[i + 1] !== null) ? ' до ' + new Intl.NumberFormat().format(limits[i + 1]) + '<br>' : (limits[i] !== null) ? '  +<br/>' : '<br/>'))
        })

        div.innerHTML += labels.join('')
        return div
    }

    renderLayer();

}