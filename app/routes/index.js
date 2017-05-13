const router = require('express').Router(),
      bodyParser = require('body-parser'),
      pgdb = require('../libs/pgdb')(),
      demografiya = require('./demografiya'),
      claster = require('./claster'),
      GeoJson = require( '../libs/createGeoJson');

let geometry = null;
let query3 = [
    `SELECT geojson,id FROM area_demography_chastkavikomst617__region`,
    `SELECT geojson,id FROM area_demography_chastkavikomst617__district`,
    `SELECT * FROM bubble_chart`];

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/main', function(req, res) {
    GeoJson.queryBase(req.originalUrl, 'borders', res);
});

router.post('/ato', function(req, res) {
    GeoJson.queryBase(req.originalUrl, 'ato', res);
});

router.post('/geojson', function(req, res) {
    if(geometry === null) {
        geometry = [];
        Promise.all(query3.map(item => pgdb.query(item)))
            .then(d => d.forEach(item => geometry.push(item)))
            .then(() => res.json(geometry))
    } else {
        res.json(geometry)
    }

});

demografiya(router);
claster(router)
module.exports = router;