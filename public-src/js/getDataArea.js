
import { isLoaded, bootstrap, dojoRequire } from 'esri-loader';
import { UrlLay } from './GetMaps';
import { checkStatus, parseJSON} from './checkJSON';
import updateAttribute from './updateAttribute';
import Diagrama from './diagrama/diagrama';
import { server } from './App'

import createRender from './createRender';
import React, { Component } from 'react';
import { saveData } from './diagrama/diagrama'


export let fieldName, popupTemplate, outFields, curentLayer, map;
export let fields = {};
export let response = {};

let layersDataStore = {};
let layerDataHistogram = {};
let layerStore = {};
let myParametr, myItem;
let mylayer,mylayer2,
// mylayer3,
    clicked;

export default function getDataArea(item, layerData) {
    document.getElementById('basemaps-wrapper').style.display = "none";

    if (!isLoaded()) {
        bootstrap((err) => {
            if (err) {
                console.error(err);
            }
            getFetch(item, layerData);
        }, {
            url: server
        });
    } else {
        getFetch(item, layerData);
    }
}

function getFetch(item, layerData) {
    let myQuery = '/query?where=1%3D1&outFields=*&returnGeometry=false&f=pjson',
        parametr = item.value,
        typeServer = item.type;

    if (!layersDataStore[parametr]) {
        fetch(UrlLay + parametr + '/' + typeServer + '/0' + myQuery)
            .then(checkStatus)
            .then(parseJSON)
            .then(function(data) {
                layersDataStore[parametr] = data;
                layerDataHistogram[parametr] = {'0': data};
            }).then(() => {
            getDataAreaMain(item, parametr, layerData, typeServer)
        })
    } else {
        getDataAreaMain(item, parametr, layerData, typeServer)
    }

    fetch(UrlLay + parametr + '/' + typeServer + '?f=pjson')
        .then(checkStatus)
        .then(parseJSON)
        .then(function(data) {
            if (data.layers.length > 1) {
                for (let i = 1; i < data.layers.length; i++ ) {
                    fetch(UrlLay + parametr + '/' + typeServer + '/' + i + myQuery)
                        .then(checkStatus)
                        .then(parseJSON)
                        .then(function(data) {
                            layerDataHistogram[parametr][i] = data;
                        })
                }

            }
        })

}

function getDataAreaMain(item, parametr, layerData, typeServer) {
    dojoRequire(
        ["dojox/charting/themes/Minty", "dojox/charting/Chart", "dojox/charting/axis2d/Default", "dojox/charting/plot2d/Lines", "esri/dijit/InfoWindowLite", "esri/InfoTemplate", "esri/basemaps", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ArcGISTiledMapServiceLayer",
            'esri/map', 'dojo/_base/array', 'dojo/data/ItemFileReadStore', 'dijit/form/FilteringSelect', 'dojo/dom-construct', 'dojo/dom', 'esri/layers/FeatureLayer'],
        (Minty, Chart, Default, Lines, InfoWindowLite, InfoTemplate, esriBasemaps,  ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, Map, array, ItemFileReadStore, FilteringSelect, domConstruct, dom, FeatureLayer) => {
            if (!map) {
                let tiled = "https://gisserver.maping.so.org.ua/arcgis/rest/services/Базова_карта/Base_World_13_01/MapServer";
                let anot = "https://gisserver.maping.so.org.ua/arcgis/rest/services/Базова_карта/Аннотации_для_тематической/MapServer";
                let megi = "https://gisserver.maping.so.org.ua/arcgis/rest/services/Базова_карта/межі_областей/MapServer";
                // let tot = 'https://gisserver.maping.so.org.ua/arcgis/rest/services/ТОТ/тот/MapServer';
                esriBasemaps.delorme = {
                    baseMapLayers: [{url: tiled}
                    ],
                    thumbnailUrl: "https://www.example.com/images/thumbnail_2014-11-25_61051.png",
                    title: "Delorme"
                };
                let mapOptions = {
                    basemap: "delorme",
                    center: [31, 49],
                    // zoom: 6,
                    maxScale : 3000000,
                    minScale : 10000000,
                    slider: false
                };
                map = new Map("area", mapOptions);
                mylayer = new ArcGISDynamicMapServiceLayer(anot);
                map.addLayer(mylayer);

                mylayer2 = new ArcGISDynamicMapServiceLayer(megi);
                map.addLayer(mylayer2);

                // mylayer3 = new ArcGISDynamicMapServiceLayer(tot);
                // map.addLayer(mylayer3);


            }
            map.infoWindow.destroy();

            map.getLayersVisibleAtScale().forEach( item => {
                if (item.id === 'layer0' || item.id === 'layer1') {
                } else {
                    map.removeLayer(item)
                }
            });

            let outFieldsFilter = layersDataStore[parametr].fields.filter(function(obj) {
                return obj.type === "esriFieldTypeDouble" && obj.name.slice(0, 4) == 'year';
            });

            outFields = outFieldsFilter.map(function(item) {
                return item.name
            });

            myParametr = parametr;
            myItem = outFields[0];

            saveData(layerDataHistogram[parametr], myItem)

            function createAliasFilds() {
                outFields.forEach((item) => {
                    fields[item] = `Станом на 20${item.substring(5)} рік`
                });
            }

            createAliasFilds();

            // create a store and a filtering select for the county layer's fields
            let fieldNames, fieldStore, fieldSelect;
            fieldNames = {
                "identifier": "value",
                "label": "name",
                "items": []
            };


            array.forEach(outFields, function (f) {
                fieldNames.items.push({
                    "name": fields[f],
                    "value": f
                });
            });

            fieldStore = new ItemFileReadStore({
                data: fieldNames
            });

            fieldSelect = new FilteringSelect({
                displayedValue: fieldNames.items[0].name,
                value: fieldNames.items[0].value,
                name: "fieldsFS",
                required: false,
                store: fieldStore,
                searchAttr: "name",
                style: {
                    "width": "210px",
                    "fontSize": "12pt",
                    "color": "#444"
                }
            }, domConstruct.create("div.my", null, dom.byId("fieldWrapper"), "replace"));

            fieldName = outFields[0]

            let popupInfo = []

            fieldNames.items.forEach(item => {
                    popupInfo.push("<p>"+item.name[0]+"<span>${"+ item.value[0] +"} ${parameter}</span></p>")
            })

            let infoWindow = new InfoWindowLite(null, domConstruct.create("div", null, null, map.root));
            infoWindow.startup();
            map.setInfoWindow(infoWindow);

            let infoTemplate = new InfoTemplate();
            infoTemplate.setTitle("${name_ua}");
            infoTemplate.setContent(
                "<div class='popup_top'><p>Код КОАТУУ <span>${koatuu}</span></p><p>Населення <span>${population} осіб</span></p></div>"+
                "<div class='popup_bottom'><h4>"+ item.name +"</h4>" + popupInfo.join('') + "</div>"+
                '<div id="simplechart"></div>'
            );

            fieldSelect.on("change", function(e) {

                myItem = e;
                fieldName = e;
                saveData(layerDataHistogram[parametr], myItem)
                updateAttribute(e, infoTemplate)
            });

            if(layerStore[parametr]) {
                map.addLayers(layerStore[parametr]);
                map.reorderLayer(mylayer, 4)
            } else {

                layerStore[parametr] = [];

                for (let i = 0; i < layerData.layers.length; i++) {
                    layerStore[parametr][i] = new FeatureLayer(UrlLay + parametr + '/' + typeServer + '/' + i, {
                        "infoTemplate": infoTemplate,
                        "mode": FeatureLayer.MODE_ONDEMAND,
                        "outFields": '*',
                        "opacity": 0.8
                    });
                }
                map.addLayers(layerStore[parametr]);
            }

            function createChart() {
                setTimeout(() => {
                    document.getElementById('simplechart').innerHTML = ''; //delete dubl chart
                    let data = []
                    document.querySelectorAll('.popup_bottom span').forEach(item => {
                        data.push(parseInt(item.innerHTML))
                    })

                    let chart1 = new Chart("simplechart");
                    chart1.setTheme(Minty);
                    chart1.addPlot("default", {type: "Lines","stroke": {color: "#ff6202", width: 2},fill: "lightblue", markers: true});
                    chart1.addAxis("y", { majorLabels: true,
                        minorTicks: false,
                        minorLabels: true,
                        microTicks: false,
                        vertical: true,
                        fixLower: "major",
                        fixUpper: "major",
                        font: "normal normal 10pt Arial",
                        fontColor: "#666", });
                    chart1.addAxis("x",
                        {fixLower: "major",
                            fixUpper: "major",
                            minorTicks: false,
                            font: "normal normal 10pt Arial",
                            fontColor: "#666",
                            labels: [{value: 1, text: "2013р"},
                                {value: 2, text: "2014р"},
                                {value: 3, text: "2015р"}]
                        });
                    chart1.addSeries("Series 1", data);
                    chart1.render();
                }, 500)
            }

            layerStore[parametr].forEach(function(item) {
                item.on('resume', () => {
                    curentLayer = item;
                    createRender(curentLayer);
                })

                //hightlight selected
                item.on('click', function(e) {
                    if (clicked !== e.target && clicked !== undefined ) {
                        clicked.setAttribute('stroke-width', '0.5')
                        clicked.setAttribute('stroke', 'rgb(153, 153, 153)')
                        clicked = e.target
                        clicked.setAttribute('stroke-width', '2')
                        clicked.setAttribute('stroke', 'rgb(95, 28, 15)')
                    } else {
                        clicked = e.target
                        clicked.setAttribute('stroke-width', '2')
                        clicked.setAttribute('stroke', 'rgb(95, 28, 15)')
                    }
                    createChart()
                })
            });
        })
}

export class AreaFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diagramVisible: false
        };
        this.openDiagram = this.openDiagram.bind(this);
    }

    openDiagram() {
        let icon = document.getElementById('diagrama_icon');
        let diagrama = document.getElementById('diagrama');
        console.log('diagrama >>', diagrama.childNodes.length)
        if (diagrama.childNodes.length === 0) {
            icon.setAttribute('src', '/img/diagram_white.svg')
        } else {
            icon.setAttribute('src', '/img/diagram.svg')
        }
        this.setState({
            diagramVisible: !this.state.diagramVisible
        })

        setTimeout(() => {
            if (document.getElementById('clase_diagram')) {
                document.getElementById('clase_diagram').addEventListener('click', this.openDiagram)
            }
        }, 300)
    }

    componentDidMount() {
        document.getElementsByClassName('legent_title')[0].addEventListener('click', function() {
            document.getElementById('legend').classList.toggle("legend_show")
        })

    }

    render() {
        return (
            <div className="area_page">
                <a href="#" id="barChart" onClick={this.openDiagram}>
                    <img id="diagrama_icon" src="/img/diagram.svg" alt=""/>
                </a>
                <div id="infoWindow"></div>
                <div id="legend" className="legend">
                    <div className="legent_title">Легенда</div>
                    <div id="legendWrapper"></div>
                    <div id="fieldWrapper"></div>
                </div>
                <Diagrama visible={this.state.diagramVisible} myParametr={ myParametr } myItem={ myItem } />
            </div>
        );
    }
}