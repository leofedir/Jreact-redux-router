import { UrlLay, byJson } from './GetMaps';
import { checkStatus, parseJSON} from './checkJSON';
import getDataArea from './getDataArea';
import { Claster } from './renderClaster/claster';
import { AreaFields } from './getDataArea';
import React from 'react';
import ReactDOM from 'react-dom';
import { removeMap } from './App';

let layerStore = {};
let parametr, typeServer;
let title = document.createElement('div');

export default function getLayer(item) {
    parametr = item.value;
    typeServer = item.type;

    if (!layerStore[layerStore]){
        getFetch(item)
    } else {
        renderLayer(item)
    }
}

function getFetch(item) {
    console.log('myitem >>', item)
    fetch(UrlLay + parametr + '/' + typeServer + byJson)
        .then(checkStatus)
        .then(parseJSON)
        .then(function(data) {
            console.log('data >>', data)
            layerStore[parametr] = data;
            renderLayer(item)
        })
}

function renderLayer(item) {
    // create title map data from item.name
    title.className = 'title_map';
    title.innerHTML = `<div class="title_text">${ item.name }</div>`;
    let perent = document.querySelector('.icons-menu');
    perent.appendChild(title)

    if (layerStore[parametr].serviceDescription === "area") {
        removeMap()
        document.getElementById('point').style.display = 'none';
        document.getElementById('area').style.display = 'block';
        // ReactDOM.unmountComponentAtNode(document.getElementById('area'));
        ReactDOM.render(<AreaFields />, document.getElementById('area'));
        getDataArea(item, layerStore[parametr])

    } else if (layerStore[parametr].serviceDescription === "point" || layerStore[parametr].serviceDescription === 'point_school') {
        removeMap()
        document.getElementById('area').style.display = 'none';
        document.getElementById('point').style.display = 'block';
        // ReactDOM.unmountComponentAtNode(document.getElementById('point'));
        ReactDOM.render(<Claster UrlLay={UrlLay + parametr + '/' + typeServer} parametr={parametr}/>, document.getElementById('point'));
    } else {
        alert('no description on the layer')
    }
}