import choropleth from './colorRender'
import {Lmap, ukraine} from "./PageElement/Map";

let choroplethLayer;

export default function getMap(data) {
    Lmap.removeLayer(ukraine);

    if (Lmap.hasLayer(choroplethLayer)) {
        Lmap.removeLayer(choroplethLayer)
    }

    let property;

    let filds = data.data[0].properties;
    let propertys = []

    // select field width data
    for (let key in filds) {
        if (filds.hasOwnProperty(key) && key.slice(0, 4) === 'year') {
            propertys.push(key)
        }
    }

    // create range slider title
    let title_slider_range = []

    propertys.forEach((item) => {
        title_slider_range.push(`<p>20${item.substring(5)}</p>`)
    });

    let slider = document.getElementById('slider')
    slider.innerHTML = `<div class="slider_title">${title_slider_range.join('')}</div>
                                <input id='range' class="slider_range" type="range" min="0" max="${propertys.length - 1}" value="0" id="fader" step="1">`;

    let range = document.getElementById('range');

    range.addEventListener('change', function () {
        property = propertys[this.value];

        renderLayer();

        // if (myItem != 'year_13') {
        //     mylayer3 = new ArcGISDynamicMapServiceLayer(tot, {
        //         className: 'ato',
        //         imageTransparency: false,
        //         id: "ato"
        //     });
        //     map.addLayer(mylayer3)
        // } else {
        //     map.removeLayer(map.getLayer('ato'))
        // }
    })

    property = propertys[0]

    function renderLayer() {
        if (Lmap.hasLayer(choroplethLayer)) {
            Lmap.removeLayer(choroplethLayer)
        }

        choroplethLayer = L.choropleth(data.data, {
            valueProperty: property,
            scale: ['#ffffb2', '#bd0026'],
            steps: 5,
            mode: 'q',
            style: {
                color: '#a12f19',
                weight: 0.2,
                fillOpacity: 1
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.name_ua + "   " + feature.properties.year_13)
            }
        }).addTo(Lmap)
    }

    renderLayer();


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
            ((limits[i] !== null) ? limits[i] : dani) + ((i !== limits.length - 1 && limits[i + 1] !== null) ? ' &ndash; ' + limits[i + 1] + '<br>' : (limits[i] !== null) ? ' +<br/>' : '<br/>'))
    })

    div.innerHTML += labels.join('')
    return div

}