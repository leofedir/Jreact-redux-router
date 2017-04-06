import L from 'leaflet/dist/leaflet-src';
import esri from 'esri-leaflet/dist/esri-leaflet';
import { Lmap, ukraine } from "./PageElement/Map"
import { checkStatus, parseJSON} from './checkJSON';

export default function getMap(item) {
    console.log('Lmap.haslayer(ukraine >>', Lmap.hasLayer(ukraine));
    Lmap.removeLayer(ukraine)

    // control that shows state info on hover
    var info = L.control();

    info.onAdd = function (Lmap) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>Населення України</h4>' +  (props ?
                '<b>' + props.name_ua + '</b><br />' + props.population + ' ' +props.parameter
                : 'Hover over a state');
    };

    info.addTo(Lmap);


    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        info.update(layer.feature.properties);
    }

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

            console.log('dara >>', data.data)

            // get color depending on population density value
            function getColor(d) {

                return d > 1000 ? '#800026' :
                    d > 500  ? '#BD0026' :
                    d > 200  ? '#E31A1C' :
                    d > 100  ? '#FC4E2A' :
                    d > 50   ? '#FD8D3C' :
                    d > 20   ? '#FEB24C' :
                    d > 10   ? '#FED976' :
                    '#FFEDA0';
            }

            function style(feature) {
                return {
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7,
                    fillColor: getColor(feature.properties.density)
                };
            }

            var geojson;

            function resetHighlight(e) {
                geojson.resetStyle(e.target);
                info.update();
            }

            function zoomToFeature(e) {
                Lmap.fitBounds(e.target.getBounds());
            }

            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });
            }

            geojson = L.geoJson(data.data, {
                style: style,
                onEachFeature: onEachFeature
            }).addTo(Lmap);

            Lmap.attributionControl.addAttribution('Енциклопедія територій &copy;');


            var legend = L.control({position: 'bottomright'});

            legend.onAdd = function (Lmap) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
                    labels = [],
                    from, to;

                for (var i = 0; i < grades.length; i++) {
                    from = grades[i];
                    to = grades[i + 1];

                    labels.push(
                        '<i style="background:' + getColor(from + 1) + '"></i> ' +
                        from + (to ? '&ndash;' + to : '+'));
                }

                div.innerHTML = labels.join('<br>');
                return div;
            };

            legend.addTo(Lmap);
        });
}