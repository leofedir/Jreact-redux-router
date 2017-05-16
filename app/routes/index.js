const router = require('express').Router(),
    bodyParser = require('body-parser'),
    pgdb = require('../libs/pgdb')(),
    demografiya = require('./demografiya'),
    claster = require('./claster'),
    GeoJson = require('../libs/createGeoJson');

let geometry = {};
let query3 = [
    `SELECT * FROM bubble_chart`];

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/main', function (req, res) {
    GeoJson.queryBase(req.originalUrl, 'borders', res);
});

router.post('/ato', function (req, res) {
    GeoJson.queryBase(req.originalUrl, 'ato', res);
});

router.post('/region', function (req, res) {
    if ('region' in geometry) {
        res.json(geometry.region)
    } else {
        pgdb.query(`SELECT * FROM geom_region`)
            .then(d => geometry.region = d)
            .then(() => res.json(geometry.region))
    }
});

router.post('/district', function (req, res) {
    if ('district' in geometry) {
        res.json(geometry.district)
    } else {
        pgdb.query(`SELECT * FROM geom_district`)
            .then(d => geometry.district = d)
            .then(() => res.json(geometry.district))
    }
});

demografiya(router);
claster(router)
module.exports = router;