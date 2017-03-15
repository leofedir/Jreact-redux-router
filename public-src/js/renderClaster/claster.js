import { checkStatus, parseJSON} from '../checkJSON';
import L from 'leaflet/dist/leaflet-src';
import esri from 'esri-leaflet/dist/esri-leaflet';
import getFields from './setFields';
import Cluster from 'esri-leaflet-cluster';
import Geocoding from 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
import 'leaflet.markercluster/dist/leaflet.markercluster-src';

import React from 'react';
export let Lmap;
let currentSearcherControl = null;
let layers = {};

export class Claster extends React.Component {

    claster(aaa) {
        document.getElementById('basemaps-wrapper').style.display = "block";

        let provider = [];
        let objProvider = {};
        let UrlLay;
        if (aaa) {
            UrlLay = aaa.UrlLay
        } else {
            UrlLay = this.props.UrlLay;
        }

        if (!Lmap) {
            createMap()
        } else {
            Lmap.remove()
            createMap()
        }

        function createMap() {
            Lmap = L.map('map', {zoomControl: false}).setView([49, 31], 6);
           esri.basemapLayer('Topographic').addTo(Lmap);

        }

        L.Icon.Default.imagePath = '/img/';

        var greenIcon = L.icon({
            iconUrl: 'leaf-green.png',
            shadowUrl: 'leaf-shadow.png',

            iconSize:     [38, 95], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        fetch(UrlLay + '?f=pjson')
            .then(checkStatus)
            .then(parseJSON)
            .then(process);

        function process(list){
            let popup = document.getElementById('props');
            let fields = getFields();
            let layersBox = document.getElementsByClassName('layers')[0];
            let info = '<svg class="box info" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 53 54"><defs><style>.cls-2_1{opacity:0.3;mix-blend-mode:multiply;}.cls-3_1{fill:#747474;}.cls-4_1{fill:#fff;}</style></defs><g id="интерфейс"><image class="cls-2_1" width="53" height="54" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA2CAYAAABnctHeAAAACXBIWXMAAAsSAAALEgHS3X78AAACuElEQVRoQ+2azYuNURzHv3PHmOsliryMUiMlsUAR2bCwYWHjJaUho2z8BRZqdsrCCkk2yk5ZzkZKCmsrG2USZaOUt8K4vp85z51753bdB3Wf0z2dxWd3e875nO/v93vqPkeNRkOpUf4DaaigFpm5fZTtt6eUWiKLzGIzaupmScXUi7XZA3sZVolgmQwPXG5WmTVmvRkzGypirFhzrVltVpilCoJzcqVSagmNmGXFgzaarWaH2W32mn0VwVp7zC6zzWxSkFypcOAcfK1MqilEOuvMluLhh80JM2HOmUlzvs9MFmudMafMUXPA7DTjCgdOeSI21FVKISV+QEIIbTeHzFlzyVw1N8xtc6ciWOumuWamzEVzzOw3mxXESGxBKXamVC9+SEIIXTBXzD0zbR6bp+Z5RTwzT8xD88DcMpfNaQWxcYVSpMcWSqmVEmVHD1FyJITQ/WKBl2bGvDXvKoK13phX5oV5ZO4qiB1XKEV6jOEx3E0KW6YcQ+GIQsmREEKvzQfzyXwxXyuCtT6bj+a9wsEiRmKU4kGF4cFUnO+t9tLjXcDoZMqdVOih6eJBCH0zP8xsxfw03xUEESMxSnFKYXgwFWmZ+RLs7CeiZGxPmOsKPTSjkBBCv0wjAqyLGIlRivQYw4OpyLgnDEKpdUoxHnnZ8W5glDJ5GArUNac0+xeL9xMSoxTpMYYHU5Fxz3uMMAilqxRvcYYE7wlGKv1Ew1LfsaVYn8PlkDlsDp3DJwTCYP8DKcU+2A/7Yn/sk/2y7yyVpfpIlpKyVDSylJSlopGlpCwVjSwlZaloZCkpS0UjS0lZKhpZSspS0chS0uBI/dffzsl9IEjyU86oEvvoluTn0fQ+ZHf0VRpXDjrSSudySFtaI0rlGk9bWk2xNC5cdYilcTWuh9xgX2L8g1xTMCY9Rf5JahD5DZFpHm1Tc/OuAAAAAElFTkSuQmCC"/><rect class="cls-3_1" x="6.18" y="4.83" width="40" height="40.33" rx="5" ry="5"/><path class="cls-4_1" d="M24.58,29.45a7.91,7.91,0,0,1,.34-2.72,6.88,6.88,0,0,1,1.71-2,29.76,29.76,0,0,0,1.91-2.44,3.62,3.62,0,0,0,.57-2.06A3,3,0,0,0,28.34,18a2.94,2.94,0,0,0-2.19-.77,3.33,3.33,0,0,0-2.1.67,2.34,2.34,0,0,0-.87,2H20.64l0-.08a4.21,4.21,0,0,1,1.54-3.49,6.07,6.07,0,0,1,4-1.31,5.88,5.88,0,0,1,4.14,1.36,4.91,4.91,0,0,1,1.48,3.8,5.69,5.69,0,0,1-1,3.2,17.82,17.82,0,0,1-2.53,3,3.17,3.17,0,0,0-.89,1.31,7.65,7.65,0,0,0-.16,1.81ZM27.34,35H24.55V32.18h2.79Z"/></g></svg>'
            let box = '<svg id="object" class="box" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 53 54"><defs><style>.cls-1{opacity:0.3;isolation:isolate;}.cls-2{fill:#747474;}.cls-3{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><g id="интерфейс"><image class="cls-1" width="53" height="54" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA2CAYAAABnctHeAAAACXBIWXMAAAsSAAALEgHS3X78AAACuElEQVRoQ+2azYuNURzHv3PHmOsliryMUiMlsUAR2bCwYWHjJaUho2z8BRZqdsrCCkk2yk5ZzkZKCmsrG2USZaOUt8K4vp85z51753bdB3Wf0z2dxWd3e875nO/v93vqPkeNRkOpUf4DaaigFpm5fZTtt6eUWiKLzGIzaupmScXUi7XZA3sZVolgmQwPXG5WmTVmvRkzGypirFhzrVltVpilCoJzcqVSagmNmGXFgzaarWaH2W32mn0VwVp7zC6zzWxSkFypcOAcfK1MqilEOuvMluLhh80JM2HOmUlzvs9MFmudMafMUXPA7DTjCgdOeSI21FVKISV+QEIIbTeHzFlzyVw1N8xtc6ciWOumuWamzEVzzOw3mxXESGxBKXamVC9+SEIIXTBXzD0zbR6bp+Z5RTwzT8xD88DcMpfNaQWxcYVSpMcWSqmVEmVHD1FyJITQ/WKBl2bGvDXvKoK13phX5oV5ZO4qiB1XKEV6jOEx3E0KW6YcQ+GIQsmREEKvzQfzyXwxXyuCtT6bj+a9wsEiRmKU4kGF4cFUnO+t9tLjXcDoZMqdVOih6eJBCH0zP8xsxfw03xUEESMxSnFKYXgwFWmZ+RLs7CeiZGxPmOsKPTSjkBBCv0wjAqyLGIlRivQYw4OpyLgnDEKpdUoxHnnZ8W5glDJ5GArUNac0+xeL9xMSoxTpMYYHU5Fxz3uMMAilqxRvcYYE7wlGKv1Ew1LfsaVYn8PlkDlsDp3DJwTCYP8DKcU+2A/7Yn/sk/2y7yyVpfpIlpKyVDSylJSlopGlpCwVjSwlZaloZCkpS0UjS0lZKhpZSspS0chS0uBI/dffzsl9IEjyU86oEvvoluTn0fQ+ZHf0VRpXDjrSSudySFtaI0rlGk9bWk2xNC5cdYilcTWuh9xgX2L8g1xTMCY9Rf5JahD5DZFpHm1Tc/OuAAAAAElFTkSuQmCC"/><rect class="cls-2" x="6.18" y="4.83" width="40" height="40.33" rx="5" ry="5"/><polygon class="cls-3" points="26.18 36.83 16.18 31.83 16.18 19.83 26.18 24.83 26.18 36.83"/><polygon class="cls-3" points="26.18 36.83 36.18 31.83 36.18 19.83 26.18 24.83 26.18 36.83"/><polygon class="cls-3" points="16.18 19.83 26.18 24.83 36.18 19.83 26.18 14.83 16.18 19.83"/></g></svg>'
            let setLayers = ['<span class="title_leayers"><b>Об’єкти</b><img id="object_hide" src="/img/-.svg" alt=""> </span>'];
            layers = {};

            function createPopup(e) {
                let popapItems = [`<div class="popup_header"><button class="closeButton" onclick="document.getElementById('props').style.display = 'none'"></button></div>`];
                popup.style.display = 'block';

                fields.forEach(item => {
                    if (item.title === 'Назва') {
                        popapItems.push(`<h5 className="name">${ e.layer.feature.properties[item.key] }</h5>`)
                    } else if (e.layer.feature.properties[item.key]) {
                        popapItems.push(`<div class="popup_item"><img src="${ item.img }"><p>${ e.layer.feature.properties[item.key] }</p></div> `)
                    }
                })
                popup.innerHTML = popapItems.join('')
            }

            list.layers.forEach(function(layer){
                setLayers.push('<p><label><input type="checkbox" value="'+ layer.id +'" class="checkbox"><span class="icon"></span><span class="text">'+ layer.name +'</span></label></p>')
                let m = Cluster.featureLayer({url: UrlLay + '/' + layer.id});
                m.on('click', createPopup)
                layers[layer.id] = m;
            });


            let layerWrapp = document.createElement('div')
            layerWrapp.className = 'layerWrapp ';
            layerWrapp.id = 'layerWrapp';
            layersBox.innerHTML = info + box
            layersBox.appendChild(layerWrapp)


            layerWrapp.innerHTML = setLayers.join('');

            let object_hide = document.getElementById('object_hide');
            object_hide.addEventListener('click', () => {
                document.getElementById('layerWrapp').classList.add("hide_layers")
                document.getElementById('object').classList.add("active")
            });

            let object_show = document.getElementById('object');
            object_show.addEventListener('click', () => {
                document.getElementById('layerWrapp').classList.remove("hide_layers")
                document.getElementById('object').classList.remove("active")
            });

            // turn-on first layer
            if (Object.keys(layers).length > 0) {
                document.querySelector('input[value="0"]').checked = true;
                showLayer(Object.keys(layers)[0]);
            }

            function layersTriger(e) {
                if(e.target.checked) {
                    showLayer(e.target.value)
                }else{
                    hideLayer(e.target.value);
                }
            }

            layersBox.addEventListener('change', layersTriger)

            function addProvider(url, id) {
                objProvider[id] = (Geocoding.featureLayerProvider({
                        url: url,
                        searchFields: ['nameua', 'adress'], // Search these fields for text matches
                        label: list.layers[id].name, // Group suggestions under this header
                    }));
                createArreyProvider()
            }

            function createArreyProvider() {
                provider = [];
                for (let key in objProvider) {
                    if (objProvider.hasOwnProperty(key)) {
                        provider.push(objProvider[key])
                    }
                }
            }

            function removeProvider(id) {
                if (objProvider[id]) {
                    delete objProvider[id]
                    createArreyProvider()
                }
            }

            function updateSearchControl(){
                if(currentSearcherControl !== null){
                    Lmap.removeControl(currentSearcherControl);
                }

                currentSearcherControl = Geocoding.geosearch({
                    providers: provider,
                    title: 'Пошук',
                    placeholder: ''
                })

                currentSearcherControl.addTo(Lmap);
                // // add search icon & placeholder
                // let search = document.querySelector('.geocoder-control');
                // search.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.37 13.26"><defs><style>.cls-1,.cls-3{fill:#fff;}.cls-2{fill:#009971;}.cls-3{stroke:#009971;stroke-linecap:round;stroke-miterlimit:10;stroke-width:2px;}</style></defs><g id="Layer_2" data-name="Layer 2"><circle class="cls-1" cx="8.38" cy="5" r="4.5"/><path class="cls-2" d="M8.37,1a4,4,0,1,1-4,4,4,4,0,0,1,4-4m0-1a5,5,0,1,0,5,5,5,5,0,0,0-5-5Z"/><line class="cls-3" x1="1" y1="12.26" x2="4.82" y2="8.45"/></g></svg>';
                document.querySelector('.geocoder-control-input').setAttribute("placeholder", "Введіть назву");
            }

            function showLayer(id){
                Lmap.addLayer(layers[id]);
                addProvider(layers[id].options.url, id)
                updateSearchControl();
            }

            function hideLayer(id){
                Lmap.removeLayer(layers[id]);
                removeProvider(id)
                updateSearchControl();
            }

        }
    }

    componentDidMount() {
        this.claster()
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.UrlLay) !== JSON.stringify(nextProps.UrlLay))
        {
            this.claster(nextProps);
        }
    }

    render () {
        return (
            <div>
                <div id="props"></div>
                <div id="selector"></div>
                <div id="map"></div>
                <div id="basemaps-wrapper2" className="leaflet-bar layers"></div>
            </div>
        );
    }

}