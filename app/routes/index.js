const router = require('express').Router(),
      bodyParser = require('body-parser'),
      pgdb = require('../libs/pgdb')(),
      demografiya = require('./demografiya'),
      GeoJson = require( '../libs/createGeoJson');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/main', function(req, res) {
    GeoJson.queryBase(req.originalUrl, 'borders', res);
});

router.post('/gettable', function(req, res) {
    pgdb.query(`select table_name from enter.INFORMATION_SCHEMA.TABLES where table_name like 'ludina%'`)
        .then((d)=>{
            res.json({'state' : true , data: d});
        })
        .catch((e)=>{
            console.log("Error" , e);
        })
});

demografiya(router);

module.exports = router;