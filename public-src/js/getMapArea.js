import choropleth from './colorRender'
import {Lmap, ukraine} from "./PageElement/Map";
import esri from 'esri-leaflet/dist/esri-leaflet';
import {checkStatus, parseJSON} from './checkJSON';

import {set_Range_items, set_legend_data} from './REDUX/actions/actions'
import {clickOnFeature} from './REDUX/actions/get_map_area'
import {store} from './index';
import { coordinate } from './PageElement/Map'

export let choroplethLayer = null;
export let ato = null;
let atoData = null;
let unsubscribe = null;

export default function getMap(data, rebuild = true, isRegion) {

if(unsubscribe !== null) {
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
    let {range_item, range_items, } = state.main;

    function fetchAto () {
        fetch('/ato', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: ''
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
            console.log('sdf >>', 2222)
            range_item = nexItem;
            getAto(range_item);
            renderLayer()
        }
        return
    }

    unsubscribe = store.subscribe(handleChange);
    // handleChange();


    function renderLayer() {
        // store.dispatch(startLoad());
        if (Lmap.hasLayer(choroplethLayer)) {
            Lmap.removeLayer(choroplethLayer)
        }

        // join geometry
        isRegion ?
            data.forEach((item, i) => item.geometry = coordinate.region[i]) :
            data.forEach((item, i) => item.geometry = coordinate.district[i]);


        choroplethLayer = L.choropleth(data, {
            valueProperty: range_items[range_item],
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
        }).addTo(Lmap);

        function whenClicked(e) {
            const latlng = e.target._bounds._northEast;
            
            if(isRegion) {
                setTimeout(() => Lmap.flyTo(latlng, 6), 1500);
            } else {
                Lmap.flyTo(latlng);
            }
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