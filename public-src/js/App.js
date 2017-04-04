import React, { Component } from 'react';
import L from 'leaflet/dist/leaflet-src';
import esri from 'esri-leaflet/dist/esri-leaflet';
import MainMenu from './PageElement/MainMenu';
import { map } from './getDataArea';
import BaseMap from './PageElement/basemap';
import { checkStatus, parseJSON} from './checkJSON';

export let Lmap = null;

export function removeMap() {
    if(Lmap !== null) {
        Lmap.off();
        Lmap.remove();
        Lmap = null
    } else if (map !== null) {
        map.destroy()
    } else if (Lmap !== null) {
        Lmap.off()
        Lmap.remove()
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
        Lmap = L.map('mapid_root', {zoomControl: false}).setView([49, 31], 6);
        L.Icon.Default.imagePath = '/img/';

        esri.basemapLayer('Topographic').addTo(Lmap);

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
                    obj.properties = {};
                    for(let key in item) {
                        if (item.hasOwnProperty(key) && key !== 'geojson' && key !== 'geom'){
                            obj.properties[key] = item[key];
                        }
                    }
                    obj.geometry = poligon.push(JSON.parse(item.geojson))
                })

                let myStyle = {
                    "color": "#009971",
                    "weight": 2,
                    "opacity": 0.79
                };

                L.geoJSON(poligon, {
                    style: myStyle
                }).addTo(Lmap);
            });

        let arrow = document.getElementById('hide_menu');
        arrow.addEventListener('click', () => {
            document.querySelector('.menu_item').classList.toggle("hide")
            document.querySelector('.title_map').classList.toggle("hide_menu_title")
            document.getElementById('slider').classList.toggle("slider_move")
        });

        let zoomIn = document.getElementById('zoom_in');
        zoomIn.addEventListener('click', function () {
            if (Lmap) {
                Lmap.zoomIn(1)
            } else if (Lmap) {
                Lmap.zoomIn(1)
            } else if (map) {
                map.setLevel(map.getLevel() + 1)
            }
        })

        let zoomOut = document.getElementById('zoom_out');

        zoomOut.addEventListener('click', function () {
            if (Lmap) {
                Lmap.zoomOut(1)
            } else if (Lmap) {
                Lmap.zoomOut(1)
            } else if (map) {
                map.setLevel(map.getLevel() - 1)
            }
        });

        let marker = null, circle = null;

        let locate = document.getElementById('geolocate');

        locate.addEventListener('click', () => {
            if (Lmap) {
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
            if (marker !== null || circle !== null) {
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
                <div id="area" />
                <div id="point" />
            </div>
        );
    }
}

export default App;
