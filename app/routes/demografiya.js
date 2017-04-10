
const pgdb = require('../libs/pgdb')(),
    GeoJson = require( '../libs/createGeoJson');

module.exports = function (router){

    router.post('/demography', function(req, res) {
        console.log('req.body >>', req.body);
        let category =  `'${req.body.category}%'`;
        pgdb.query(`select table_name from enter.INFORMATION_SCHEMA.TABLES where table_name like $1` , [ req.body.category + '%' ])
            .then((d)=>{
                res.json({data: d});
            })
            .catch((e)=>{
                console.log("Error" , e);
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