const pgdb = require('../libs/pgdb')(),
    GeoJson = require('../libs/createGeoJson');

let dataChart = {};

module.exports = function (router) {


    router.post('/getmapdata', function (req, res) {

        if (req.body.table in dataChart) {
            res.json(dataChart[req.body.table])
        } else {
            pgdb.query(`select koatuu,name_ua,year_13,year_14,year_15,year_16,parameter from ` + req.body.table)
                .then((d) => {
                    dataChart[req.body.table] = d;
                    res.json(d)
                })
                .catch((e) => {
                    console.log("Error", e);
                })
        }

    });

    router.post('/getsubmenu', function (req, res) {
        let table = req.body.category;

        pgdb.query(`select table_name from enter.INFORMATION_SCHEMA.TABLES where table_name like $1`, ['%' + table + '%'])
            .then((d) => {
                let obj = {};
                d.forEach(item => {
                    if (item.table_name.startsWith('point')) {
                        let name = item.table_name;
                        let crop_name = name.slice(name.indexOf(table) + table.length + 1);
                        let grup = crop_name.slice(0, crop_name.indexOf('_'));
                        obj[grup] ? obj[grup].push(crop_name.slice(crop_name.indexOf('_') + 1)) : obj[grup] = [crop_name.slice(crop_name.indexOf('_') + 1)]

                    } else if (item.table_name.startsWith('area')) {
                        let name = item.table_name.slice(0, item.table_name.indexOf("__"));
                        obj[name] ? obj[name].push(item.table_name.slice(item.table_name.indexOf("__"))) : obj[name] = [item.table_name.slice(item.table_name.indexOf("__"))];
                    }
                });
                res.json(obj);
            })
            .catch((e) => {
                console.log("Error", e);
            })
    });

    router.post('/render', function (req, res) {
        GeoJson.queryBase(req.originalUrl, req.body.table, res);
    });
};