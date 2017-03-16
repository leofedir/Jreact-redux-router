const router = require('express').Router(),
    bodyParser = require('body-parser');

router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


router.post('/test', function(req, res) {
    var name = req.body.name,
        color = req.body.color;
    console.log('updating-', req.body);
    res.json({'state' : true , data: req.body});
    // res.sendStatus(200);
    // ...
});

module.exports = router;