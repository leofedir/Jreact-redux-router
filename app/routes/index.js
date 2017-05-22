const router = require('express').Router(),
    bodyParser = require('body-parser'),
    pgdb = require('../libs/pgdb')(),
    demografiya = require('./demografiya'),
    claster = require('./claster'),
    GeoJson = require('../libs/createGeoJson'),
    compression = require('compression');

let geometry = {};
let data_buble = null;
const geometryQuery = [
    `SELECT * FROM geom_region`,
    `SELECT * FROM geom_district`
]

router.use(compression({
    level: 4
}))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/main', function (req, res) {
    GeoJson.queryBase(req.originalUrl, 'borders', res);
});

router.post('/data_bubble', function (req, res) {
    if (data_buble !== null) {
        res.json(data_buble);
    } else {
        pgdb.query(`SELECT * FROM bubble_chart`)
            .then((d) => {

                let myData = d.map(item => {
                    let mySet = {};

                    mySet.country = item.name_ua;
                    mySet.name = item.alias;
                    mySet.y = +item.area;
                    mySet.x = +item.population_year_16;
                    mySet.z = +item.budget_year_16;
                    return mySet;
                });

                data_buble = myData.sort((a, b) => b.z - a.z);

                res.json(data_buble);
            })
    }

});

router.post('/ato', function (req, res) {
    GeoJson.queryBase(req.originalUrl, 'ato', res);
});

router.post('/region', function (req, res) {
    if ('region' in geometry) {
        res.json(geometry)
    } else {
        Promise.all(geometryQuery.map(item =>
            pgdb.query(item)
        ))
            .then(d => {
                let _d = d.map(item => {
                    item.sort((a, b) => b.id - a.id);
                    return item.map(i => i.geojson)
                });
                geometry.region = _d[0];
                geometry.district = _d[1]
            })
            .then(() => {
                res.json(geometry)
                res.flush()
            })
    }
});

demografiya(router);
claster(router)
module.exports = router;