import { isLoaded, bootstrap, dojoRequire } from 'esri-loader';
import { fieldName, map } from './getDataArea';
import createLegend from './createLegend';
import { server } from './App'

export default function createRender(curentLayer) {
    if (!isLoaded()) {
        bootstrap((err) => {
            if (err) {
                console.error(err);
            }
            createRenderMain(curentLayer);
        }, {
            url: server
        });
    } else {
        createRenderMain(curentLayer);
    }

    function createRenderMain(curentLayer) {
        dojoRequire(
            ['esri/renderers/smartMapping', "esri/styles/choropleth", "dojo/i18n!esri/nls/jsapi"],
            (smartMapping, esriStylesChoropleth, b) => {
                console.log(fieldName)
                    let schemes = esriStylesChoropleth.getSchemes({
                    theme: "high-to-low",
                    basemap: 'topo',
                    geometryType: "polygon"
                });

                let classedColorRenderParams = {
                    basemap: map.getBasemap(),
                    classificationMethod: "quantile",
                    field: fieldName,
                    layer: curentLayer,
                    scheme: schemes.secondarySchemes[3]

                };

                smartMapping.createClassedColorRenderer(classedColorRenderParams).
                then(function (result) {
                    curentLayer.setRenderer(result.renderer);
                    curentLayer.redraw();
                    createLegend(map, fieldName, curentLayer);
                }).otherwise(function (error) {
                    console.log("An error occurred while performing%s, Error: %o",
                        "Smart Mapping", error);
                });
                b.__proto__.smartMapping.minToMax = '-';
                b.__proto__.smartMapping.other = 'Дані відсутні'

            })
    }
}
