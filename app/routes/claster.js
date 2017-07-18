const pgdb = require('../libs/pgdb')();
let storeLayers = {};
module.exports = function (router) {

    router.post('/claster_layers', function (req, res) {

        const table = req.body.table;

        if (storeLayers[table]) {
            res.json(storeLayers[table])
        } else {
            pgdb.query(`select table_name from enter.INFORMATION_SCHEMA.TABLES where table_name like $1`, ['%' + table + '%'])
                .then((data) => {
                    storeLayers[table] = {};
                    storeLayers[table].list = data.map(item => item.table_name).sort();
                    storeLayers[table].count = 0;
                    // storeLayers[table].list.forEach(item => getDataLayers(item))

                    Promise.all(storeLayers[table].list.map( item =>
                        pgdb.query(`select * from ${ item } where geojson is not null`)
                    ))
                        .then((resp) => {
                            storeLayers[table].data = [];
                            let info = null;
                            resp.forEach((d, i) => {
                                let obj = {
                                    type: "FeatureCollection",
                                    name: storeLayers[table].list[i],
                                    features: d.map(item => {
                                        let obj = {};
                                        obj.type = "Feature";
                                        obj.properties = {};
                                        for (let key in item) {
                                            if (item.hasOwnProperty(key) && key !== 'geojson' && key !== 'geom' && !~key.indexOf('chart')) { //del chart
                                                obj.properties[key] = item[key];
                                                if (key == 'info' && item[key] != null) {
                                                    info = item[key]
                                                }
                                            }
                                        }
                                        obj.geometry = JSON.parse(item.geojson);

                                        return obj;
                                    })
                                };
                                obj.count = obj.features.length;
                                storeLayers[table].count += obj.features.length;
                                storeLayers[table].data.push([info, obj])
                            })
                        })
                        .then(() => res.json(storeLayers[table]))
                        .catch((err) => {
                            console.log('err >>', err);
                        })
                })
        }
    });
}