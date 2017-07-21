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
    // `SELECT * FROM geom_otg`,
    // `SELECT * FROM geom_settelments`
];

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
                let obj1 = {};
                let obj2 = {};
                let obj3 = {};
                let obj4 = {};
                d.forEach((item, i) => {
                    switch (i) {
                        case 0 :
                            item.forEach(i => {
                                obj1[i.id] = i.geojson
                            });
                            break;
                        case 1 :
                            item.forEach(i => {
                                obj2[i.id] = i.geojson
                            });
                            break;
                        case 2:
                            item.forEach((i) => {
                                obj3[i.gid] = i.geojson
                            });
                            break;
                        case 3:
                            item.forEach((i) => {
                                obj4[i.geo_id] = i.geojson
                            });
                            break;

                        default:
                            return
                    }
                });

                geometry.region = obj1;
                geometry.district = obj2;
                geometry.otg = obj3;
                geometry.settelments = obj4;
            })
            .then(() => {
                res.json(geometry);
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
});

demografiya(router);
claster(router)
module.exports = router;