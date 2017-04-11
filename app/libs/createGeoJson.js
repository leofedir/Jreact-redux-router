const pgdb = require('../libs/pgdb')();

let store = {};

module.exports = {
    checkStore(url) {
        return store[url] ? true : false
    },

    getStore(url) {
        return store[url]
    },

    queryBase(url, table, res) {
        if (this.checkStore(url)) {
            res.json({'state' : true , data: store[url]})
        } else {
            console.log('table >>', table)
            let query = `SELECT * FROM ${ table }`;
            pgdb.query(query)
                .then((d)=>{
                console.log('query')
                    let newData = d.map(item => {
                        let obj = {}
                        obj.type = "Feature";
                        obj.properties = {};
                        for (let key in item) {
                            if (item.hasOwnProperty(key) && key !== 'geojson' && key !== 'geom') {
                                obj.properties[key] = item[key];
                            }
                        }
                        obj.geometry = JSON.parse(item.geojson)
                        return obj;
                    })

                    store[url] = newData;
                }).then(() => {
                res.json({'state' : true , data: store[url]})
            })
                .catch((e)=>{
                    console.log("Error" , e);
                })
        }
    },
};
