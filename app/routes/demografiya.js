
const pgdb = require('../libs/pgdb')(),
    GeoJson = require( '../libs/createGeoJson');

module.exports = function (router){

    router.post('/demography_data', function(req, res) {
        let table = req.body.table.split(',');
        let ident = req.body.ident.split(',');

        let obj = {};
        console.log('table >>', table)
        table.forEach((item, i) => {
            pgdb.query(`select koatuu,name_ua,year_13,year_14,year_15,parameter from ` +  item)
                .then((d)=>{
                    obj[ident[i]] = d

                })
                .catch((e)=>{
                    console.log("Error" , e);
                })
        });

        setTimeout(() => res.json(obj), 500)



    });

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
                GeoJson.queryBase(req.originalUrl, req.body.table, res);
    });

    // router.post('/bezrobitni' , function (req , res) {
    //     GeoJson.queryBase(req.originalUrl, 'demography_population_region', res);
    // });
    //
    // router.post('/vik_naselenya' , function (req , res) {
    //     GeoJson.queryBase(req.originalUrl, 'demography_population_distrikt', res);
    // });

}