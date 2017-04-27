const pgdb = require('../libs/pgdb')();
let store = {};
let storeLayers = {};
let storeLayersData = {};
module.exports = function (router) {

    router.post('/claster_layers', function (req, res) {

        const table = req.body.table;

        if (storeLayers[table]) {
            res.json(storeLayers[table])
        } else {
            pgdb.query(`select table_name from enter.INFORMATION_SCHEMA.TABLES where table_name like $1`, ['%' + table + '%'])
                .then((data) => {
                    res.json(storeLayers[table] = data.map(item => item.table_name))
                })
                .catch((e) => {
                    console.log("Error", e);
                });
        }
    });

    router.post('/layer', function (req, res) {
        const table = req.body.table;
        let info = null;

        pgdb.query(`select * from ${ table } where geojson is not null`)
            .then((d) => {
                let obj = {
                    "type": "FeatureCollection",
                    "features": d.map(item => {
                        let obj = {}

                        obj.type = "Feature";
                        obj.properties = {};
                        for (let key in item) {
                            if (item.hasOwnProperty(key) && key !== 'geojson' && key !== 'geom') {
                                obj.properties[key] = item[key];
                                if (key == 'info' && item[key] != null) {
                                    info = item[key]
                                }
                            }
                        }
                        obj.geometry = JSON.parse(item.geojson)

                        return obj;
                    })
                };

                storeLayersData[table] = [info, obj];
            }).then(() => res.json(storeLayersData[table]))
            .catch((e) => {
                console.log("Error", e);
                res.json(e)
            })
    });
}