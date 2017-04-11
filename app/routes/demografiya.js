
const pgdb = require('../libs/pgdb')(),
    GeoJson = require( '../libs/createGeoJson');

module.exports = function (router){

    router.post('/demography', function(req, res) {
        pgdb.query(`select table_name from enter.INFORMATION_SCHEMA.TABLES where table_name like $1` , ['%' + req.body.category + '%' ])
            .then((d)=>{
                let obj = {};
                d.forEach(item => {
                    let name = item.table_name.slice(0, item.table_name.indexOf("__"));
                    obj[name] ? obj[name].push(item.table_name.slice(item.table_name.indexOf("__"))) : obj[name] = [item.table_name.slice(item.table_name.indexOf("__"))];
                })
                res.json(obj);
            })
            .catch((e)=>{
                console.log("Error" , e);
            })
    });
    router.post('/render', function(req, res) {
        pgdb.query(`select table_name from enter.INFORMATION_SCHEMA.TABLES where table_name like $1` , ['%' + req.body.table + '%' ])
            .then((d)=>{
                console.log('d >>', d)
                console.log('req.body >>', req.body.table)
                GeoJson.queryBase(req.originalUrl, d[0].table_name, res);
            })

    });

    // router.post('/bezrobitni' , function (req , res) {
    //     GeoJson.queryBase(req.originalUrl, 'demography_population_region', res);
    // });
    //
    // router.post('/vik_naselenya' , function (req , res) {
    //     GeoJson.queryBase(req.originalUrl, 'demography_population_distrikt', res);
    // });

}