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

demografiya(router);

module.exports = router;