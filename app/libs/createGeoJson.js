const pgdb = require('../libs/pgdb')();

let store = {};


module.exports = {
    checkStore(table) {
        return store[table] ? true : false
    },

    getStore(table) {
        return store[table]
    },

    queryBase(url, table, res) {
        if (this.checkStore(table)) {
            res.json(store[table])
        } else {
            let query = `SELECT * FROM ${ table }`;
            let query2 = `SELECT * FROM bubble_chart`;
            let info = null;
            pgdb.query(query)
                .then((d)=>{
                    let newData = d.map(item => {
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
                    });
                    store[table] = [info, newData];
                })
                .then(() => {
                    pgdb.query(query2)
                        .then(d => store[table].push(d) )
                })
                .then(() => {
                res.json(store[table])
            })
                .catch((e)=>{
                    console.log("Error" , e);
                })
        }
    },
};
