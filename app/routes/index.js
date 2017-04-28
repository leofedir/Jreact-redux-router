const router = require('express').Router(),
      bodyParser = require('body-parser'),
      pgdb = require('../libs/pgdb')(),
      demografiya = require('./demografiya'),
      claster = require('./claster'),
      GeoJson = require( '../libs/createGeoJson');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/main', function(req, res) {
    GeoJson.queryBase(req.originalUrl, 'borders', res);
});

router.post('/ato', function(req, res) {
    GeoJson.queryBase(req.originalUrl, 'ato', res);
});

demografiya(router);
claster(router)

module.exports = router;