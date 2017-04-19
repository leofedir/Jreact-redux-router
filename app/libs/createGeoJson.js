const pgdb = require('../libs/pgdb')();

let store = {};
let info = null;

module.exports = {
    checkStore(table) {
        return store[table] ? true : false
    },

    getStore(table) {
        return store[table]
    },

    queryBase(url, table, res) {
        if (this.checkStore(table)) {
            res.json({'state' : true , data: store[table]})
        } else {
            let query = `SELECT * FROM ${ table }`;
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
                    })
                    store[table] = newData;
                }).then(() => {
                res.json({'info' : info , data: store[table]})
            })
                .catch((e)=>{
                    console.log("Error" , e);
                })
        }
    },
};
