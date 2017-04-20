const L = require('leaflet');
const chroma = require('chroma-js');
const _ = {
    defaults: require('lodash/defaults'),
    extend: require('lodash.assign')
};

L.choropleth = module.exports = function (geojson, {
        valueProperty = 'value',
        scale = ['white', 'red'],
        steps = 5,
        mode = 'q',
        style,
        colors
    }) {
    // opts = opts || {}

    // Set default options in case any weren't passed
    // _.defaults(opts, {
    //     valueProperty: 'value',
    //     scale: ['white', 'red'],
    //     steps: 5,
    //     mode: 'q'
    // })

    // Save what the user passed as the style property for later use (since we're overriding it)
    let userStyle = style;

    // Calculate limits
    let values = geojson.map(function (item) {
        if (typeof valueProperty === 'function') {
            return valueProperty(item)
        } else {
            return +item.properties[valueProperty]
        }
    });

    let limits = chroma.limits(values, mode, steps - 1);
    limits.push(null);

    // Create color buckets
    colors = colors || chroma.scale(scale).colors(steps);
    colors.push('#ccc');

    const opts =  {
        valueProperty,
        scale,
        steps,
        mode,
        limits,
        colors,
        style: function (feature) {
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
                    return _.extend(userStyle(), style);
                case 'object':
                    return _.extend(userStyle, style);
                default:
                    return style
            }
        }
    }

    console.log("OPTS!!!!!!!!!!!!!!!!!!!!", opts);

    return L.geoJson(geojson, opts);
};
