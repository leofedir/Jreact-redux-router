const pgdb = require('../libs/pgdb')(),
    GeoJson = require('../libs/createGeoJson');

let dataObj = {};
let info = null;

module.exports = function (router) {

    router.post('/getmapdata', function (req, res) {
        let { table, arr} = req.body;

        table = table.split(',');
        arr = arr.split(',');
        if (req.body.table in dataObj) {
            res.json(dataObj[table[0]])
        } else {
            Promise.all(table.map( item =>pgdb.query(`select * from ` + item)))
                .then(data => {
                    let obj = {};
                    data.forEach((item, i) => {
                        let newData = item.map(item => {
                            let obj = {};
                            obj.id = item.id;
                            obj.type = "Feature";
                            obj.properties = {};
                            for (let key in item) {
                                if (item.hasOwnProperty(key) && item[key] != 'geojson') {
                                    obj.properties[key] = item[key];
                                    if (key == 'info' && item[key] != null) {
                                        info = item[key]
                                    }
                                }
                            }
                            return obj;
                        });
                        obj[arr[i]] = newData
                    });
                    dataObj[table[0]] = [obj, info];
                })
                .then(()=> res.json(dataObj[table[0]]))
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