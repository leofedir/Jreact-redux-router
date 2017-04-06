
const pgdb = require('../libs/pgdb')(),
    GeoJson = require( '../libs/createGeoJson');

module.exports = function (router){

    router.post('/bezrobitni' , function (req , res) {
        GeoJson.queryBase(req.originalUrl, 'test6', res);
    });

}