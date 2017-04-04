const router = require('express').Router(),
      bodyParser = require('body-parser'),
      pgdb = require('../libs/pgdb')(),
      demografiya = require('./demografiya');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/main', function(req, res) {
    pgdb.query(`SELECT geojson FROM borders`)
        .then((d)=>{
            res.json({'state' : true , data: d});
        })
        .catch((e)=>{
            console.log("Error" , e);
        })
});

demografiya(router);

module.exports = router;