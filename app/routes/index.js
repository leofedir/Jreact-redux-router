const router = require('express').Router(),
    bodyParser = require('body-parser'),
    pgdb = require('../libs/pgdb')(),
    demografiya = require('./demografiya'),
    claster = require('./claster'),
    GeoJson = require('../libs/createGeoJson'),
    compression = require('compression');
var fs = require('fs');

let geometry = {};
let data_buble = {};
const geometryQuery = [
    `SELECT * FROM geom_region`,
    `SELECT * FROM geom_district`,
    `SELECT * FROM geom_otg`,
    `SELECT * FROM geom_settelments`
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

// const createBulkQuery = (arr) => {
//     let sqlParts = ``;
//     let i = 0;
//     arr.forEach((e) => {
//
//         if (+e.id > 100000) {
//             return false
//         }
//         i === 0 ? '' : sqlParts += ', ';
//         i++;
//         sqlParts += '(';
//         sqlParts += e.distr + ', ';
//         sqlParts += "'" + JSON.stringify(e.geometry) + "', ";
//         sqlParts += e.geomtype + ', ';
//         sqlParts += e.id + ', ';
//         sqlParts += "'" + e.info + "', ";
//         sqlParts += e.okrug;
//         sqlParts += ')';
//     })
//
//     // arr.forEach((e, i) => {
//     //     i === 0 ? '' : sqlParts += ', ';
//     //     sqlParts += '(';
//     //     sqlParts += e.id + ', ';
//     //     sqlParts += "'" + JSON.stringify(e.geometry) + "', ";
//     //     sqlParts += e.distr + ', ';
//     //     sqlParts += e.geomtype;
//     //     sqlParts += ')';
//     // })
//
//     let sql = `INSERT INTO tmp_vubor_point (distr, geometry, geomtype, id, info, okrug) VALUES ${sqlParts}`;
//
//     // let sql = `INSERT INTO tmp_vubor_area (id, geometry, distr, geomtype) VALUES ${sqlParts}`;
//     pgdb.query(sql)
//         .catch(e => {
//             console.log('e >>', e)
//             console.log('sql >>', sql)
//         })
// }


// router.get('/test', function (req, res) {
//     for (let i = 2; i < 225; i++) {
//         fs.readFile(`./encode/point/point (${i}).json`, 'utf8', function (err, data) {
//             if (err) throw err;
//             let obj = JSON.parse(data);
//             createBulkQuery(obj.features);
//         });
//     }
//     console.log('finish >>')
// });

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
                                obj1[i.id] = JSON.parse(i.geojson)
                            });
                            break;
                        case 1 :
                            item.forEach(i => {
                                obj2[i.id] = JSON.parse(i.geojson)
                            });
                            break;
                        case 2:
                            item.forEach((i) => {
                                obj3[i.id] = JSON.parse(i.geojson)
                            });
                            break;
                        case 3:
                            item.forEach((i) => {
                                obj4[i.id] = JSON.parse(i.geojson)
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