
const pgdb = require('../libs/pgdb')();
let store = {};

module.exports = function (router) {


    router.post('/claster', function (req, res) {
        console.log('sdfjskldjfds >>');
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
            }

                store[table] = [info, obj];
            }).then(() => res.json(store[table]))
            .catch((e) => {
                console.log("Error", e);
            })


    });
}