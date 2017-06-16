const L = require('leaflet');
const chroma = require('chroma-js');
import {set_isAllData} from './REDUX/actions/get_map_area';
import {store} from './index';
let isAllDataCorrect

L.choropleth = function (geojson, opts) {
    opts = opts || {};
    isAllDataCorrect = true
    // Save what the user passed as the style property for later use (since we're overriding it)
    let userStyle = opts.style;

    // Calculate limits
    let values = geojson.map(function (item) {
        if (typeof opts.valueProperty === 'function') {
            return opts.valueProperty(item)
        } else {
            return +item.properties[opts.valueProperty]
        }
    });

    let limits = chroma.limits(values, opts.mode, opts.steps - 1);
    limits.push(null);

    // Create color buckets
    let colors = opts.colors || chroma.scale(opts.scale).colors(opts.steps);
    colors.push('#cccccc');

    opts.limits = limits;
    opts.colors = colors;
    opts.style = function (feature) {
        let style = {};
        let featureValue;

        if (typeof opts.valueProperty === 'function') {
            featureValue = opts.valueProperty(feature)
        } else {
            featureValue = feature.properties[opts.valueProperty]
        }
        // Find the bucket/step/limit that this value is less than and give it that color
        for (let i = 0; i < limits.length; i++) {
            if (featureValue == limits[limits.length-1]) {
                isAllDataCorrect = false
                style.fillColor = '#cccccc';
                break
            } else if (featureValue == limits[limits.length-2]){
                style.fillColor = colors[colors.length-2];
                break
            } else if (featureValue <= limits[i]) {
                style.fillColor = limits[i] === limits[0] ? colors[i] : colors[i-1];
                break
            }
        }
    
        let state = store.getState()
        let {isAllData} = state.map_reducer;
        console.log('isAllData >>>', isAllData)
        console.log('isAllDataCorrect >>>', isAllDataCorrect)
        console.log('isAllDataCorrect === isAllData', isAllDataCorrect === isAllData)
        if (isAllDataCorrect !== isAllData)
            store.dispatch(set_isAllData(!isAllData));
        
        // Return this style, but include the user-defined style if it was passed
        switch (typeof userStyle) {
            case 'function':
                return Object.assign(style, userStyle());
            case 'object':
                return Object.assign(style, userStyle);
            default:
                return style
        }
    };
    
    return L.geoJson(geojson, opts)
};

export default L