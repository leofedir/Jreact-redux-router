import React, { Component } from 'react';
import L from 'leaflet/dist/leaflet-src';
import esri from 'esri-leaflet/dist/esri-leaflet';
import GetMaps from './GetMaps';
import MainMenu from './PageElement/MainMenu';
import { Lmap } from './renderClaster/claster';
import { map } from './getDataArea';
import BaseMap from './PageElement/basemap';
import { checkStatus, parseJSON} from './checkJSON';
import getDataArea from './getDataArea';
import ReactDOM from 'react-dom';
import { AreaFields } from './getDataArea';

export let mapDefault = null;
export let  server = 'https://js.arcgis.com/3.20/';

export function removeMap() {
    if(mapDefault !== null) {
        mapDefault.off();
        mapDefault.remove();
        mapDefault = null
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
        mapDefault = L.map('mapid_root', {zoomControl: false}).setView([49, 31], 6);
        L.Icon.Default.imagePath = '/img/';

        esri.basemapLayer('Topographic').addTo(mapDefault);

        document.querySelectorAll('.icons-menu__link').forEach((item) => {
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
            document.getElementById('slider').classList.toggle("slider_move")
        });

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
