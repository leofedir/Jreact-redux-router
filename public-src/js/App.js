import React, { Component } from 'react';
import L from 'leaflet/dist/leaflet-src';
import esri from 'esri-leaflet/dist/esri-leaflet';
import GetMaps from './GetMaps';
import MainMenu from './PageElement/MainMenu';
import { Lmap } from './renderClaster/claster';
import { map } from './getDataArea';
import BaseMap from './PageElement/basemap';
import { checkStatus, parseJSON} from './checkJSON';

export let mapDefault;
export let  server = 'https://js.arcgis.com/3.20/';

export function removeMap() {
    if(mapDefault !== null) {
        mapDefault.remove();
        mapDefault = null
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: null,
            item: null
        };
    }

    getMenu() {
        mapDefault = L.map('mapid', {zoomControl: false}).setView([49, 31], 6);
        L.Icon.Default.imagePath = '/img/';

        esri.basemapLayer('Topographic').addTo(mapDefault);

        let menu = document.getElementsByClassName('icons-menu__link')
        menu = [].slice.call(menu);
        menu.forEach((item) => {
            this.setState({
                folder: item.dataset.folder,
                item: item
            });
            GetMaps(item.dataset.folder, item)
        });

        let arrow = document.getElementById('hide_menu');
        arrow.addEventListener('click', () => {
            document.querySelector('.menu_item').classList.toggle("hide")
            document.querySelector('.title_map').classList.toggle("hide_menu_title")
        });

        document.querySelector('a.test').addEventListener('click', e => {

            fetch('/test', {
                method: 'post',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'foo=bar&lorem=ipsum'
            })
                .then(checkStatus)
                .then(parseJSON)
                .then(data => {
                    let poligon = []
                    // console.log(data.data)
                    data.data.map(item => {
                        let obj = {}
                        obj.type = "Feature";
                        obj.popupContent = "This is where the Rockies play!";
                        obj.properties = {};
                        for(let key in item) {
                            if (item.hasOwnProperty(key) && key !== 'geojson' && key != 'geom'){
                                obj.properties[key] = item[key];
                            }
                        }
                        obj.geometry = poligon.push(JSON.parse(item.geojson))
                    })

                    var myStyle = {
                        "color": "#ff7800",
                        "weight": 5,
                        "opacity": 0.65
                    };
                    console.log(11);

                    function onEachFeature(feature, layer) {
                        // does this feature have a property named popupContent?
                        if (feature.properties && feature.properties.popupContent) {
                            console.log(22)
                            layer.bindPopup(feature.properties.popupContent);
                        }
                    }

                    L.geoJSON(poligon, {
                        style: myStyle
                    }).bindPopup('Hello world!')
                        .addTo(mapDefault);

                    // L.geoJSON(geojsonFeature).addTo(mapDefault);

                    // console.log(data.data["0"].geojson);
                })
        })

        let zoomIn = document.getElementById('zoom_in');
        zoomIn.addEventListener('click', function () {
            if (mapDefault) {
                mapDefault.zoomIn(1)
            } else if (Lmap) {
                Lmap.zoomIn(1)
            } else if (map) {
                map.setLevel(map.getLevel() + 1)
            }
        })

        let zoomOut = document.getElementById('zoom_out');

        zoomOut.addEventListener('click', function () {
            if (mapDefault) {
                mapDefault.zoomOut(1)
            } else if (Lmap) {
                Lmap.zoomOut(1)
            } else if (map) {
                map.setLevel(map.getLevel() - 1)
            }
        })

        let marker = null, circle = null;

        let locate = document.getElementById('geolocate');

        locate.addEventListener('click', () => {
            if (mapDefault) {
                mapDefault.locate({setView: true})
                mapDefault.once('locationfound', function(e) {
                    onLocationFound (e, this)
                });
            } else if (Lmap) {
                Lmap.locate({setView: true})
                Lmap.once('locationfound', function(e) {
                    onLocationFound (e, this)
                });
            } else if (map) {
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
                }
                function locationError(error) {
                    console.log(error)
                }

                function zoomToLocation(location) {
                    var pt = [location.coords.longitude, location.coords.latitude];
                    map.centerAndZoom(pt, 15);
                }
            }
        });

        function onLocationFound(e, map) {
            if (marker != null || circle != null) {
                map.removeLayer(marker)
                map.removeLayer(circle)
                marker = null;
                circle = null;
            } else {
                let radius = e.accuracy / 2;
                marker = L.marker(e.latlng).addTo(map)
                    .bindPopup("Ви знаходитесь в межах " + radius + " метрів від цієї точки").openPopup();
                circle = L.circle(e.latlng, radius).addTo(map);
            }
        }
    }

    componentDidMount() {
        this.getMenu();
    }

    render() {
        return (
            <div>
                <MainMenu />
                <BaseMap />
                <div id="mapid" />
                <div id="area"></div>
                <div id="point"></div>
            </div>
        );
    }
}

export default App;
