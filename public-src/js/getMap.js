import choropleth from './colorRender'

import { Lmap, ukraine } from "./PageElement/Map";
import { checkStatus, parseJSON} from './checkJSON';

export default function getMap(item) {
    console.log('Lmap.haslayer(ukraine >>', Lmap.hasLayer(ukraine));
    Lmap.removeLayer(ukraine)

    fetch(item.target.dataset.url, {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'foo=bar&lorem=ipsum'
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            var choroplethLayer = L.choropleth(data.data, {
                valueProperty: 'year_13',
                scale: ['#fbe9bd', '#a12f19'],
                steps: 5,
                mode: 'q',
                style: {
                    color: '#a12f19',
                    weight: 1,
                    fillOpacity: 0.8
                },
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(feature.properties.name_ua + "   " + feature.properties.year_13 )
                }
            }).addTo(Lmap)

            // Add legend (don't forget to add the CSS from index.html)
            var legend = L.control({ position: 'bottomright' })
            legend.onAdd = function (Lmap) {
                var div = L.DomUtil.create('div', 'info legend')
                var limits = choroplethLayer.options.limits
                var colors = choroplethLayer.options.colors
                var labels = []

                // Add min & max
                div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

                limits.forEach(function (limit, index) {
                    labels.push('<li style="background-color: ' + colors[index] + '">' +  limits[index] + '</li>')
                })

                div.innerHTML += '<ul>' + labels.join('') + '</ul>'
                return div
            }
            legend.addTo(Lmap)
        });
}