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
                var div = document.getElementById('legend')
                var limits = choroplethLayer.options.limits
                var colors = choroplethLayer.options.colors
                var labels = []

                limits.forEach(function (limit, i) {
                    labels.push('<i style="background:' + colors[i] + '"></i> ' +
                        limits[i] + (limits[i + 1] ? ' &ndash; ' + limits[i + 1] + '<br>' : '+<br>'))
                })

                div.innerHTML += labels.join('')
                return div

        });
}