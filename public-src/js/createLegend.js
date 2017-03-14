import { isLoaded, bootstrap, dojoRequire } from 'esri-loader';
import { server } from './App'
let legend;

export default function createLegend(map, fieldName, curentLayer) {
    if (!isLoaded()) {
        bootstrap((err) => {
            if (err) {
                console.error(err);
            }
            createLegendMain(map, fieldName, curentLayer);
        }, {
            url: server
        });
    } else {
        createLegendMain(map, fieldName, curentLayer);
    }

    function createLegendMain(map, fieldName, curentLayer) {
        dojoRequire(
            ['esri/dijit/Legend', 'dojo/dom', 'dojo/dom-construct'],
            (Legend, dom, domConstruct) => {
                //If applicable, destroy previous legend
                if (legend) {
                    legend.destroy();
                    domConstruct.destroy(dom.byId("legendDiv"));
                }

                // create a new div for the legend
                let legendDiv = domConstruct.create("div", {
                    id: "legendDiv"
                }, dom.byId("legendWrapper"));

                legend = new Legend({
                    map: map,
                    layerInfos: [{
                        layer: curentLayer,
                        title: ""
                    }]
                }, legendDiv);

                legend.startup();


            })
    }
}
