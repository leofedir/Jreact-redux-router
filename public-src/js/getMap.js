import L from 'leaflet/dist/leaflet-src';
import esri from 'esri-leaflet/dist/esri-leaflet';
import { Lmap } from "./PageElement/Map"
import { checkStatus, parseJSON} from './checkJSON';

export default function getMap(item) {
    console.log('item.dataset >>', item.target.dataset.url)
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
            console.log('data >>', data)
            let poligon = []
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
}