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

              //   console.log( document.querySelectorAll('tbody svg path'))
              //
              // let path = document.querySelectorAll('tbody svg path')
              //   path = [].slice.call(path);
              //   path.map(item => {
              //     console.log('item >>', item)
              //       item.setAttribute('stroke', '');
              //       item.setAttribute('d', 'M-20-10L 10 -10L 10 10L-20 10L-20-10L');
              // })
            })
    }
}
