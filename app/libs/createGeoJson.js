const pgdb = require('../libs/pgdb')();

let store = {};


module.exports = {
    checkStore(table) {
        return !!store[table]
    },

    getStore(table) {
        return store[table]
    },

    queryBase(url, table, res) {
        if (this.checkStore(table)) {
            res.json(store[table])
        } else {
            let query = `SELECT * FROM ${ table }`;
            let fields = null
            let aaa = `SELECT ARRAY_TO_STRING(ARRAY(SELECT COLUMN_NAME::VARCHAR(50)
	                        FROM INFORMATION_SCHEMA.COLUMNS
	                        WHERE TABLE_NAME='${ table }' AND
    	                    COLUMN_NAME NOT IN ('geom', 'geojson')
	                        ORDER BY ORDINAL_POSITION
                            ), ', ') FROM ${ table } limit 1`;
            pgdb.query(aaa)
                .then(d => {
                    fields = d[0].array_to_string
                })
                .then(() => {
                    let fullQuery = `SELECT ${fields} FROM ${ table }`;
                    let query3 = [
                        `SELECT geojson,id FROM area_demography_chastkavikomst617__region`,
                        `SELECT geojson,id FROM area_demography_chastkavikomst617__district`,
                        `SELECT * FROM bubble_chart`];
                    let info = null;
                    pgdb.query(table == 'borders' || table == 'ato' ? query : fullQuery)
                        .then((d) => {
                            let newData = d.map(item => {
                                let obj = {}

                                obj.id = item.id;
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
                                if (table == 'borders' || table == 'ato') {
                                    obj.geometry = JSON.parse(item.geojson)
                                }

                                return obj;
                            });

                            store[table] = [info, newData];
                        })
                        .then(() => {
                            if (table == 'borders') {
                                Promise.all(query3.map(item => pgdb.query(item)))
                                    .then(d => d.forEach(item => store[table].push(item)))
                            }

                        })
                        .then(() => {
                            res.json(store[table])
                        })
                        .catch((e) => {
                            console.log("Error", e);
                        })
                })


        }
    },
};
