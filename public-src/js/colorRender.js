const L = require('leaflet')
const chroma = require('chroma-js')
const _ = {
    defaults: require('lodash.defaults'),
    extend: require('lodash.assign')
}

L.choropleth = module.exports = function (geojson, opts) {
    opts = opts || {}

    // Set default options in case any weren't passed
    _.defaults(opts, {
        valueProperty: 'value',
        scale: ['white', 'red'],
        steps: 5,
        mode: 'q'
    })

    // Save what the user passed as the style property for later use (since we're overriding it)
    var userStyle = opts.style

    // Calculate limits
    var values = geojson.map(function (item) {
        if (typeof opts.valueProperty === 'function') {
            return opts.valueProperty(item)
        } else {
            return +item.properties[opts.valueProperty]
        }
    })

    var limits = chroma.limits(values, opts.mode, opts.steps - 1)
    limits.push(null)

    // Create color buckets
    var colors = opts.colors || chroma.scale(opts.scale).colors(opts.steps);
    colors.push('#ccc')

    return L.geoJson(geojson, _.extend(opts, {
        limits: limits,
        colors: colors,
        style: function (feature) {
            var style = {}
            var featureValue

            if (typeof opts.valueProperty === 'function') {
                featureValue = opts.valueProperty(feature)
            } else {
                featureValue = feature.properties[opts.valueProperty]
            }

            // Find the bucket/step/limit that this value is less than and give it that color
            for (var i = 0; i < limits.length; i++) {
                if (featureValue == limits[limits.length -1]) {
                    style.fillColor = '#ccc'
                    break
                } else if (featureValue <= limits[i]) {
                    style.fillColor = colors[i]
                    break
                }
            }


            // Return this style, but include the user-defined style if it was passed
            switch (typeof userStyle) {
                case 'function':
                    return _.extend(userStyle(), style)
                case 'object':
                    return _.extend(userStyle, style)
                default:
                    return style
            }
        }
    }))
}
