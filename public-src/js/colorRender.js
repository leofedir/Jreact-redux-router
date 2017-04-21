const L = require('leaflet');
const chroma = require('chroma-js');

L.choropleth = module.exports = function (geojson, opts) {
    opts = opts || {};

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
    colors.push('#ccc');

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
            if (featureValue == limits[limits.length -1]) {
                style.fillColor = '#ccc';
                break
            } else if (featureValue <= limits[i]) {
                style.fillColor = colors[i];
                break
            }
        }
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
