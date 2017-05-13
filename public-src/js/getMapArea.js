import choropleth from './colorRender'
import {Lmap, ukraine} from "./PageElement/Map";
import esri from 'esri-leaflet/dist/esri-leaflet';
import {checkStatus, parseJSON} from './checkJSON';

import {set_Range_items, set_legend_data} from './REDUX/actions/actions'
import {clickOnFeature} from './REDUX/actions/get_map_area'
import {store} from './index'

export let choroplethLayer = null;
export let ato = null;
let atoData = null;
let unsubscribe = null;

export default function getMap(data, rebuild = true, isRegion) {

if(unsubscribe !== null) {
    console.log('4444 >>', 4444)
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
    let {geometry_district, geometry_region, } = state.map_reducer;

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
            }, 400)

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
    console.log('sdf >>', 3333)

    unsubscribe = store.subscribe(handleChange);
    // handleChange();


    function renderLayer() {
        // store.dispatch(startLoad());
        if (Lmap.hasLayer(choroplethLayer)) {
            Lmap.removeLayer(choroplethLayer)
        }
        isRegion ?
            data.forEach((item, i) => item.geometry = JSON.parse(geometry_region.filter(a => a.id == item.id)[0].geojson)) :
            data.forEach((item, i) => item.geometry = JSON.parse(geometry_district.filter(a => a.id == item.id)[0].geojson));

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
            store.dispatch(clickOnFeature(e.target.feature.properties))
        }

        let legend_data = {
            limits: choroplethLayer.options.limits,
            colors: choroplethLayer.options.colors,
            parametr: filds.parameter
        };

        store.dispatch(set_legend_data(legend_data));
        // setTimeout(()=>{
        //     store.dispatch(finishLoad());
        // },100)
    }

    renderLayer();
    getAto(range_item);

}