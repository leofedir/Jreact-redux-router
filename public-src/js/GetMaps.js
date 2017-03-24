import { checkStatus, parseJSON} from './checkJSON';
import getLayers from './getLayers';

export const  byJson = '?f=pjson',
    UrlLay = 'https://gisserver.maping.so.org.ua/arcgis/rest/services/';
let parametrs = [];
let mapStore = {};

function GetMaps (folder, item) {
    fetch(UrlLay + folder + byJson)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            if (data.error) {
                return 0;
            }
            mapStore[folder] = data.services;
        }).then(() => {

        parametrs = [];
        if (mapStore[folder]) {
            mapStore[folder].forEach(function(item) {
                let obj = {};
                obj.value = item.name;
                obj.name = item.name.substring(item.name.indexOf("/")+1).replace(/_/g, " ");
                obj.type = item.type;
                parametrs.push(obj)
            })
        }

        let curentMenuItem = item
        let submenu = document.createElement('ul')
        submenu.className += " submenu";
        curentMenuItem.appendChild(submenu)
        let items = [];

        //create list of fields
        parametrs.forEach(function(item, i) {
            items.push(`<li class="submenu_item"><a 
                                                    href="#" 
                                                    class='submenu_link' 
                                                    data-value="${item.value}" 
                                                    data-name="${item.name}"
                                                    data-type="${item.type}">${item.name}</a></li>`);
        })

        submenu.innerHTML = items.join('')
        let subMenuLink = document.querySelectorAll('.submenu_link')
        subMenuLink.forEach(item => {
            item.onclick = function() {
                document.getElementById('slider').innerHTML="";
                getLayers(this.dataset)
            }
        })
    })
}

export default GetMaps;
