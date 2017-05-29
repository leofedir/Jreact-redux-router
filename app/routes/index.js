const router = require('express').Router(),
    bodyParser = require('body-parser'),
    pgdb = require('../libs/pgdb')(),
    demografiya = require('./demografiya'),
    claster = require('./claster'),
    GeoJson = require('../libs/createGeoJson'),
    compression = require('compression');

let geometry = {};
let data_buble = {};
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
    const year = req.body.year
    if (data_buble[year] in data_buble) {
        res.json(data_buble[year]);
    } else {
        pgdb.query(`SELECT * FROM bubble_chart`)
            .then((d) => {

                let myData = d.map(item => {
                    let mySet = {};

                    mySet.country = item.name_ua;
                    mySet.name = item.alias;
                    mySet.y = +item.area;
                    mySet.x = +item['population_' + year];
                    mySet.z = +item['budget_' + year];
                    return mySet;
                });

                data_buble[year] = myData.sort((a, b) => b.z - a.z);

                res.json(data_buble[year]);
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

router.post('/kadastr', function (req, res) {
    const number = req.body.number;

    pgdb.query(`select* from kadastr where kod_dil='${ number }'`)
        .then(d => {
            res.json(d)
        })
})

demografiya(router);
claster(router)
module.exports = router;