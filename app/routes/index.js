const router = require('express').Router();


router.put('/api/update', update);

function update(req, res) {
    console.log('updating-', req.body);
    res.sendStatus(200);
}


module.exports = router;